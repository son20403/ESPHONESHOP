import "regenerator-runtime/runtime";
import FirebaseConstants from "../../../../constants/FirebaseConstants";
import UrlHelper from "../../../../helpers/UrlHelper";
import OrderServive from "../../../../services/OrderService";
import OrderDetailServive from "../../../../services/OrderDetailService";
import VND from "../../../../models/VND";

$(document).ready(function () {
  const vnd = VND;
  const orderService = new OrderServive(FirebaseConstants.RealTimeDb, "Token");
  const orderServiceDetail = new OrderDetailServive(
    FirebaseConstants.RealTimeDb,
    "Token"
  );
  const url = location.href;
  const urlHelper = new UrlHelper();
  const id = urlHelper.readParam(url, "id");

  const orderDetail = document.querySelector("#orderDetail");
  const showDetail = document.querySelector("#showDetail");
  orderServiceDetail
    .findAllOrderDetail()
    .then((data) => {
      const arr = [];
      for (const key in data) {
        const obj = data[key];
        obj["id"] = key;
        arr.push(obj);
      }
      const listOrderDetail = arr.filter((item) => item["id_order"] === id);
      return listOrderDetail;
    })
    .then((listOrderDetail) => {
      listOrderDetail.forEach((item) => {
        const { id, id_order, id_product, name, image, price, quantity } = item;
        if (showDetail) {
          createDetail(
            id,
            id_order,
            id_product,
            name,
            image,
            price,
            quantity,
            showDetail
          );
        }
      });
    });

  orderService.findByIdOrder(id).then((data) => {
    const {
      name,
      email,
      phone,
      address,
      createDate,
      status,
      totalPrice,
      totalQuantity,
    } = data;
    if (orderDetail) {
      createOrder(
        id,
        name,
        email,
        phone,
        address,
        createDate,
        status,
        totalPrice,
        totalQuantity,
        orderDetail
      );
    }
  });

  function createOrder(
    id,
    name,
    email,
    phone,
    address,
    createDate,
    status,
    totalPrice,
    totalQuantity,
    element
  ) {
    const template = `
    <tr>
        <td>
            <i class="fab fa-angular fa-lg text-danger me-3"></i>
            <strong style=" text-transform: capitalize;" >Id Order</strong>
        </td>
        <td>${id}</td>
    </tr>
    <tr>
        <td>
            <i class="fab fa-angular fa-lg text-danger me-3"></i>
            <strong style=" text-transform: capitalize;" >Name User</strong>
        </td>
        <td>${name}</td>
    </tr>
    <tr>
        <td>
            <i class="fab fa-angular fa-lg text-danger me-3"></i>
            <strong style=" text-transform: capitalize;" >Email</strong>
        </td>
        <td>${email}</td>
    </tr>
    <tr>
        <td>
            <i class="fab fa-angular fa-lg text-danger me-3"></i>
            <strong style=" text-transform: capitalize;" >Address</strong>
        </td>
        <td>${address}</td>
    </tr>
    <tr>
        <td>
            <i class="fab fa-angular fa-lg text-danger me-3"></i>
            <strong style=" text-transform: capitalize;" >Phone</strong>
        </td>
        <td>${phone}</td>
    </tr>
    <tr>
        <td>
            <i class="fab fa-angular fa-lg text-danger me-3"></i>
            <strong style=" text-transform: capitalize;" >Create Date</strong>
        </td>
        <td>${createDate}</td>
    </tr>
    <tr>
        <td>
            <i class="fab fa-angular fa-lg text-danger me-3"></i>
            <strong style=" text-transform: capitalize;" >Total Item</strong>
        </td>
        <td>${totalQuantity}</td>
    </tr>
    <tr>
        <td>
            <i class="fab fa-angular fa-lg text-danger me-3"></i>
            <strong style=" text-transform: capitalize;" >Total Price</strong>
        </td>
        <td><span class="badge bg-label-primary me-1">${vnd.format(
          totalPrice
        )}</span></td>
    </tr>
    <tr>
        <td>
            <i class="fab fa-angular fa-lg text-danger me-3"></i>
            <strong style=" text-transform: capitalize;" >Status</strong>
        </td>
        <td>${status}</td>
    </tr>
    `;
    element.insertAdjacentHTML("beforeend", template);
  }

  function createDetail(
    id,
    id_order,
    id_product,
    name,
    image,
    price,
    quantity,
    element
  ) {
    const template = `
    <tr>
        <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${id}</strong></td>
        <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${id_product}</strong></td>
        <td>${name}</td>
        <td>
            <ul
                class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                <li data-bs-toggle="tooltip" data-popup="tooltip-custom"
                    data-bs-placement="top" class="avatar avatar-xs pull-up"
                    title="" data-bs-original-title="Christina Parker">
                    <img src="${image}" alt="Avatar"
                        class="rounded-circle">
                </li>
            </ul>
        </td>
        <td><span class="badge bg-label-primary me-1">${vnd.format(
          price
        )}</span></td>
        <td>${quantity}</td>
    </tr>
    `;
    element.insertAdjacentHTML("beforeend", template);
  }
});
