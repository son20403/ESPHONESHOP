import "regenerator-runtime/runtime";
import Category from "../../../../models/Category";
import CategoryServive from "../../../../services/CategoryService";
import FirebaseConstants from "../../../../constants/FirebaseConstants";
import ProductService from "../../../../services/ProductService";
import OrderServive from "../../../../services/OrderService";
import VND from "../../../../models/VND";
$(document).ready(function () {
  const vnd = VND;

  const orderService = new OrderServive(FirebaseConstants.RealTimeDb, "Token");

  try {
    const tbody = document.querySelector(".listOrder");
    orderService.findAllOrder().then((orders) => {
      for (const item in orders) {
        const element = orders[item];
        let {
          name,
          address,
          email,
          phone,
          status,
          createDate,
          totalQuantity,
          totalPrice,
        } = element;
        if (tbody) {
          createElementOrder(
            item,
            name,
            address,
            email,
            phone,
            status,
            createDate,
            totalQuantity,
            totalPrice,
            tbody
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }

  function createElementOrder(
    id,
    name,
    address,
    email,
    phone,
    status,
    createDate,
    quantity,
    price,
    element
  ) {
    const template = `
    <tr>
    <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${
      id.length > 10 ? id.substr(0, 10) + "..." : id
    }</strong></td>
    <td>${name.length > 10 ? name.substr(0, 10) + "..." : name}</td>
    <td>${address.length > 10 ? address.substr(0, 10) + "..." : address}</td>
    <td>${email.length > 10 ? email.substr(0, 10) + "..." : email}</td>
    <td>${phone.length > 10 ? phone.substr(0, 10) + "..." : phone}</td>
    <td>${createDate.length > 10 ? createDate.substr(0, 10) : createDate}</td>
    <td>${quantity.length > 20 ? quantity.substr(0, 20) + "..." : quantity}</td>
    <td><span class="badge bg-label-primary me-1">${vnd.format(
      price
    )}</span></td>
    <td>
        <div class="dropdown">
            <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                data-bs-toggle="dropdown">
                <i class="bx bx-dots-vertical-rounded"></i>
            </button>
            <div class="dropdown-menu">
            <a class="dropdown-item" href="orderDetail.html?id=${id}"><i
                    class="bx bx-info-circle me-1"></i> Info</a>
            <a class="dropdown-item" href="editOrder.html?id=${id}"><i
                    class="bx bx-edit-alt me-1"></i> Edit</a>
            <a onclick="confirm('Bạn có chắc là muốn xóa ${name} không?') ? true : event.preventDefault()" class="dropdown-item" href="deleteOrder.html?id=${id}"><i
                    class="bx bx-trash me-1"></i> Delete</a>
            </div>
        </div>
    </td>
</tr>`;
    element.insertAdjacentHTML("beforeend", template);
  }
});
