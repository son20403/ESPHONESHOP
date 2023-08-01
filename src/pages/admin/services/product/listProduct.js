import "regenerator-runtime/runtime";
import Category from "../../../../models/Category";
import CategoryServive from "../../../../services/CategoryService";
import FirebaseConstants from "../../../../constants/FirebaseConstants";
import ProductService from "../../../../services/ProductService";
import VND from "../../../../models/VND";
$(document).ready(function () {
  const vnd = VND;

  const productService = new ProductService(
    FirebaseConstants.RealTimeDb,
    "Token"
  );
  const categoryService = new CategoryServive(
    FirebaseConstants.RealTimeDb,
    "Token"
  );

  try {
    const tbody = document.querySelector(".listProducts");
    productService
      .findAllProducts()
      .then((product) => {
        return product;
      })
      .then((product) => {
        categoryService.findAllCategorys().then((cate) => {
          for (const item in product) {
            const element = product[item];
            let { name, image, price, detail, category } = element;
            for (const key in cate) {
              if (category == key) {
                category = cate[key]["name"];
                createElementProduct(
                  item,
                  name,
                  image,
                  price,
                  detail,
                  category,
                  tbody
                );
              }
            }
          }
        });
      });
  } catch (error) {
    console.log(error);
  }

  function createElementProduct(
    id,
    name,
    image,
    price,
    detail,
    category,
    element
  ) {
    const template = `
    <tr>
    <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${id}</strong></td>
    <td>${name.length > 20 ? name.substr(0, 15) + "..." : name}</td>
    <td>
        <ul
            class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
            <li data-bs-toggle="tooltip" data-popup="tooltip-custom"
                data-bs-placement="top" class="avatar avatar-xs pull-up"
                title="" data-bs-original-title="Lilian Fuller">
                <img src="${image}" alt="Avatar"
                    class="rounded-circle">
            </li>
        </ul>
    </td>
    <td><span class="badge bg-label-primary me-1">${vnd.format(
      price
    )}</span></td>
    <td>${category.length > 10 ? category.substr(0, 10) + "..." : category}</td>
    <td>${detail.length > 20 ? detail.substr(0, 20) + "..." : detail}</td>
    <td>
        <div class="dropdown">
            <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                data-bs-toggle="dropdown">
                <i class="bx bx-dots-vertical-rounded"></i>
            </button>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="editProduct.html?id=${id}"><i
                        class="bx bx-edit-alt me-1"></i> Edit</a>
                <a onclick="confirm('Bạn có chắc là muốn xóa ${name} không?') ? true : event.preventDefault()" class="dropdown-item" href="deleteProduct.html?id=${id}"><i
                        class="bx bx-trash me-1"></i> Delete</a>
            </div>
        </div>
    </td>
</tr>`;
    element.insertAdjacentHTML("beforeend", template);
  }
});
