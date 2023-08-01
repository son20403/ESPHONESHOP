import FirebaseConstants from "../../constants/FirebaseConstants";
import Order from "../../models/Order";
import OrderDetail from "../../models/OrderDetail";
import OrderDetailServive from "../OrderDetailService";
import OrderServive from "../OrderService";

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
let cart = JSON.parse(localStorage.getItem("cart"));

const cartDetail = document.querySelector("#cartDetail");
const quantity = document.querySelector("#quantity");
const subtotal = document.querySelector("#subtotal");
const total = document.querySelector("#total");

function createElementCartDetail(item, element) {
  const template = `
    <div class="d-flex justify-content-between">
    <p>${item.name}</p>
    <p>${VND.format(item.price)} <span style="font-size:12px">x ${
    item.quantity
  }</span></p>
    </div>
`;
  element.insertAdjacentHTML("beforeend", template);
}

function showCartDetail(cart, element) {
  if (cart) {
    element.innerHTML = "";
    cart.forEach((item) => {
      createElementCartDetail(item, element);
    });
  }
  const TotalItem = totalItem(cart);
  quantity.innerHTML = TotalItem;
  const TotalPrice = totalPrice(cart);
  subtotal.innerHTML = VND.format(TotalPrice);
  total.innerHTML = VND.format(TotalPrice);
}
showCartDetail(cart, cartDetail);

function totalPrice(cart) {
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
}

function totalItem(cart) {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return total;
}

Validator({
  form: "#form-checkout",
  formGroupSelector: ".form-group",
  errorSelector: ".form-message",
  rules: [
    Validator.isRequired(".name"),
    Validator.isRequired(".email"),
    Validator.isEmail(".email", "Vui lòng nhập đúng định dạng email!"),
    Validator.isRequired(".phone"),
    Validator.isPrice(".phone"),
    Validator.isRequired(".address"),
  ],
  onSubmit: (order) => {
    let { name, email, phone, address } = order;
    let createDate = getDate();
    let TotalQuantity = totalItem(cart);
    let TotalPrice = totalPrice(cart);
    let status = "pendding";
    addOrder(
      name,
      email,
      phone,
      address,
      createDate,
      TotalQuantity,
      TotalPrice,
      status,
      cart
    );
  },
});

function getDate() {
  const today = new Date();
  const date = `${
    today.getDate() < 10 ? "0" + today.getDate() : today.getDate()
  }/${
    today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1
  }/${today.getFullYear()}`;

  const time = `${
    today.getHours() < 10 ? "0" + today.getHours() : today.getHours()
  }:${
    today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()
  }:${today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds()}`;
  const dateTime = `${date} ${time}`;
  return dateTime;
}

function addOrder(
  name,
  email,
  phone,
  address,
  createDate,
  TotalQuantity,
  TotalPrice,
  status = "pendding",
  cart
) {
  const order = new Order(
    name,
    email,
    phone,
    address,
    createDate,
    TotalQuantity,
    TotalPrice,
    status
  );
  const orderService = new OrderServive(FirebaseConstants.RealTimeDb, "Token");
  try {
    orderService
      .insertOrder(order)
      .then((id_order) => {
        let order_details = [];
        cart.forEach((item) => {
          let order_detail = {
            id_order: id_order,
            id_product: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          };
          order_details.push(order_detail);
        });
        return order_details;
      })
      .then((order_details) => {
        let promises = order_details.map((item) => {
          const { id_order, id_product, name, image, price, quantity } = item;
          return addOrderDetail(
            id_order,
            id_product,
            name,
            image,
            price,
            quantity
          );
        });
        return promises;
      })
      .then((promises) => {
        Promise.all(promises);
      })
      .then(() => {
        showSuccessToast();
        localStorage.removeItem("cart");
        setTimeout(() => {
          location.href = "index.html";
        }, 1000);
      });
  } catch (error) {
    console.log(error);
  }
}

function addOrderDetail(id_order, id_product, name, image, price, quantity) {
  const orderDetail = new OrderDetail(
    id_order,
    id_product,
    name,
    image,
    price,
    quantity
  );
  const orderDetailService = new OrderDetailServive(
    FirebaseConstants.RealTimeDb,
    "Token"
  );
  try {
    orderDetailService.insertOrderDetail(orderDetail).then((data) => {
      console.log(data);
    });
  } catch (error) {
    console.log(error);
  }
}
