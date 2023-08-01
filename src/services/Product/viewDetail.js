import "regenerator-runtime/runtime";
import FirebaseConstants from "../../constants/FirebaseConstants";
import UrlHelper from "../../helpers/UrlHelper";
import ProductService from "../../services/ProductService";
import Product from "../../models/Product";

window.addEventListener("load", () => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const productService = new ProductService(
    FirebaseConstants.RealTimeDb,
    "Token"
  );

  const url = location.href;
  const urlHelper = new UrlHelper();

  const id = urlHelper.readParam(url, "id");

  const nameProduct = document.querySelector("#nameProduct");

  const imageProduct = document.querySelector("#imageProduct");

  const priceProduct = document.querySelector("#priceProduct");

  const detailProduct = document.querySelector("#detailProduct");

  const btnAddToCart = document.querySelector("#btnAddToCart");

  const viewProduct = document.querySelector("#showProduct");

  try {
    productService.findByIdProducts(id).then((data) => {
      const { name, image, price, category, detail } = data;

      nameProduct.innerHTML = name;
      imageProduct.setAttribute("src", image);
      priceProduct.innerHTML = VND.format(price);
      detailProduct.innerHTML = detail;

      btnAddToCart.addEventListener("click", () => {
        const quantityProduct =
          +document.querySelector("#quantityProduct").value;
        if (addToCart(id, name, price, image, quantityProduct))
          showSuccessToast();
      });

      productService
        .findAllProducts()
        .then((data) => {
          const arr = [];
          for (const key in data) {
            const obj = data[key];
            obj["id"] = key;
            arr.push(obj);
          }
          let productCategory = arr.filter(
            (item) => item["category"] === category
          );
          productCategory = productCategory.slice(0, 4);
          return productCategory;
        })
        .then((productCategory) => {
          productCategory.forEach((item) => {
            const { id, name, image, price } = item;
            createElementProduct(id, name, image, price, viewProduct);
          });
        })
        .then(() => {
          if (viewProduct) {
            viewProduct.addEventListener("click", (e) => {
              if (e.target.matches("[name='addToCart']")) {
                showSuccessToast();
              }
            });
          }
        });
    });
  } catch (error) {
    showWarningToast();
    console.log(error);
  }

  function createElementProduct(id, name, image, price, element) {
    const template = `
    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
    <div class="card product-item border-0 mb-4">
        <div
            class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <img class="img-fluid w-100" src="${image}" alt="">
        </div>
        <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 class="text-truncate mb-3">${name}</h6>
            <div class="d-flex justify-content-center">
                <h6>${VND.format(price)}</h6>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-between bg-light border">
            <a href="detail.html?id=${id}" class="btn btn-sm text-dark p-0"><i
                    class="fas fa-eye text-primary mr-1"></i>View Detail</a>
            <button onclick="addToCart('${id}','${name}', ${price}, '${image}');" name="addToCart" class="btn btn-sm text-dark p-0"><i
                    class="fas fa-shopping-cart text-primary mr-1" name="addToCart"  ></i>Add To Cart</button>
        </div>
    </div>
</div>
   `;
    element.insertAdjacentHTML("beforeend", template);
  }
});
