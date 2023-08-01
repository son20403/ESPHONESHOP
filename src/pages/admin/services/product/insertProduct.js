import "regenerator-runtime/runtime";
import Category from "../../../../models/Category";
import CategoryServive from "../../../../services/CategoryService";
import FirebaseConstants from "../../../../constants/FirebaseConstants";
import Product from "../../../../models/Product";
import ProductService from "../../../../services/ProductService";

$(document).ready(function () {
  const categoryService = new CategoryServive(
    FirebaseConstants.RealTimeDb,
    "Token"
  );

  function createElementCategory(id, name, element) {
    let template = `
    <option value="${id}">${name}</option>`;
    element.insertAdjacentHTML("beforeend", template);
  }
  try {
    const select = document.querySelector(".idCategory");
    categoryService.findAllCategorys().then((data) => {
      for (const item in data) {
        const element = data[item];
        const { name } = element;
        createElementCategory(item, name, select);
      }
    });
  } catch (error) {
    console.log(error);
  }

  Validator({
    form: "#form-product",
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
      addProduct(
        nameProduct,
        imageProduct,
        detailProduct,
        priceProduct,
        idCategory
      );
    },
  });

  function addProduct(
    nameProduct,
    imageProduct,
    detailProduct,
    priceProduct,
    idCategory
  ) {
    const productIdCtrl = $(".idProduct");

    const prod = new Product(
      null,
      nameProduct,
      imageProduct,
      detailProduct,
      priceProduct,
      idCategory
    );
    const productService = new ProductService(
      FirebaseConstants.RealTimeDb,
      "Token"
    );
    try {
      productService.insertProduct(prod).then((data) => {
        productIdCtrl.val(data);
        showSuccessToast();
      });
    } catch (error) {
      console.log(error);
    }
  }
});

// $(".submitAddProduct").on("click", (e) => {
//   const productIdCtrl = $(".idProduct");
//   const name = $(".nameProduct").val();
//   const image = $(".imageProduct").val();
//   const categoryId = $(".idCategory").val();
//   const price = $(".priceProduct").val();
//   const detail = $(".detailProduct").val();

//   const prod = new Product(null, name, image, detail, price, categoryId);
//   const productService = new ProductService(
//     FirebaseConstants.RealTimeDb,
//     "Token"
//   );
//   try {
//     productService.insertProduct(prod).then((data) => {
//       productIdCtrl.val(data);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });
