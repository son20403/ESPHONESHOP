import "regenerator-runtime/runtime";
import Category from "../../../../models/Category";
import CategoryServive from "../../../../services/CategoryService";
import FirebaseConstants from "../../../../constants/FirebaseConstants";
import UrlHelper from "../../../../helpers/UrlHelper";
import ProductService from "../../../../services/ProductService";
import Product from "../../../../models/Product";

$(document).ready(function () {
  const categoryService = new CategoryServive(
    FirebaseConstants.RealTimeDb,
    "Token"
  );
  try {
    const select = document.querySelector(".idCategory");
    let template = `<option value="" > --Vui lòng chọn-- </option>`;
    categoryService.findAllCategorys().then((data) => {
      for (const item in data) {
        const element = data[item];
        const { name } = element;
        template += `
        <option value="${item}">${name}</option>`;
      }
      select.innerHTML = template;
    });
  } catch (error) {
    console.log(error);
  }

  const productService = new ProductService(
    FirebaseConstants.RealTimeDb,
    "Token"
  );

  const url = location.href;
  const urlHelper = new UrlHelper();

  const id = urlHelper.readParam(url, "id");
  const productIdCtrl = $(".idProduct");
  const nameCrt = $(".nameProduct");
  const imageCrt = $(".imageProduct");
  const categoryIdCrt = $(".idCategory");
  const priceCrt = $(".priceProduct");
  const detailCrt = $(".detailProduct");

  productService.findByIdProducts(id).then((data) => {
    const { name, image, price, category, detail } = data;
    productIdCtrl.val(id);
    nameCrt.val(name);
    imageCrt.val(image);
    categoryIdCrt.val(category);
    priceCrt.val(price);
    detailCrt.val(detail);
  });

  Validator({
    form: "#form-editProduct",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired(".nameProduct"),
      Validator.isRequired(".imageProduct"),
      Validator.isRequired(".idCategory"),

      Validator.isRequired(".priceProduct"),
      Validator.isPrice(".priceProduct"),

      Validator.isRequired(".detailProduct"),
    ],
    onSubmit: (data) => {
      const {
        nameProduct,
        imageProduct,
        idCategory,
        priceProduct,
        detailProduct,
      } = data;
      editProduct(
        nameProduct,
        imageProduct,
        detailProduct,
        priceProduct,
        idCategory
      );
    },
  });

  function editProduct(
    nameProduct,
    imageProduct,
    detailProduct,
    priceProduct,
    idCategory
  ) {
    const prod = new Product(
      null,
      nameProduct,
      imageProduct,
      detailProduct,
      priceProduct,
      idCategory
    );

    try {
      productService.updateProduct(productIdCtrl.val(), prod).then((data) => {
        showSuccessToast();
        setTimeout(() => {
          location.href = "../../../admin/function/Product/listProduct.html";
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  }
});
