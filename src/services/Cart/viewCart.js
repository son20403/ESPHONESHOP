const viewCart = document.querySelector("#showCart");
const totalEl = document.querySelector("#showTotal");
const totalQuantity = document.querySelector("#showQuantity");
const Total = document.querySelector("#Total");
// const checkOut = document.querySelector("#checkout");

let cart = JSON.parse(localStorage.getItem("cart"));

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

function createElementCart(item, element) {
  let count = item.price * item.quantity;
  const template = ` <tr>
    <td class="align-middle" style="display:flex;align-items: end;"><img src="${
      item.image
    }" alt="" style="width: 50px;">
    <p style="flex:1; text-align:center">${item.name}</p></td>
    <td class="align-middle">${VND.format(item.price)}</td>
    <td class="align-middle">
        <div class="input-group quantity mx-auto" style="width: 100px;">
            <div class="input-group-btn">
                <button onclick="minusCart(id='${
                  item.id
                }')" class="btn btn-sm btn-primary btn-minus">
                    <i class="fa fa-minus"></i>
                </button>
            </div>
            <input type="text" class="form-control form-control-sm bg-secondary text-center" id="quantity"
                value="${item.quantity}" disabled>
            <div class="input-group-btn">
                <button onclick="plusCart(id='${
                  item.id
                }')" class="btn btn-sm btn-primary btn-plus">
                    <i class="fa fa-plus"></i>
                </button>
            </div>
        </div>
    </td>
    <td class="align-middle"><p id="totalPrice" >${VND.format(count)}</p></td>
    <td class="align-middle"><button onclick="removeCart(id='${
      item.id
    }')" class="btn btn-sm btn-primary"><i
                class="fa fa-times"></i></button></td>
    </tr>
    `;
  element.insertAdjacentHTML("beforeend", template);
}
showCart(cart, viewCart);

function showCart(cart, element) {
  if (cart) {
    element.innerHTML = "";
    cart.forEach((item) => {
      createElementCart(item, element);
    });
    const TotalPrice = totalPrice(cart);
    totalEl.innerHTML = VND.format(TotalPrice);
    Total.innerHTML = VND.format(TotalPrice);
    const TotalItem = totalItem(cart);
    totalQuantity.innerHTML = TotalItem;
  }
}

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

function updateStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateStorage();
  showCart(cart, viewCart);
}

function minusCart(id) {
  let item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      removeCart(id);
    }
  }
  updateStorage();
  showCart(cart, viewCart);
}

function plusCart(id) {
  let item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity++;
  }
  updateStorage();
  showCart(cart, viewCart);
}
