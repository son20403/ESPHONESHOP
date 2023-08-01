import "regenerator-runtime/runtime";
import Category from "../../../../models/Category";
import CategoryServive from "../../../../services/CategoryService";
import FirebaseConstants from "../../../../constants/FirebaseConstants";
import UrlHelper from "../../../../helpers/UrlHelper";
import ProductService from "../../../../services/ProductService";

$(document).ready(function () {
  const categoryService = new CategoryServive(
    FirebaseConstants.RealTimeDb,
    "Token"
  );
  const productService = new ProductService(
    FirebaseConstants.RealTimeDb,
    "Token"
  );

  const url = location.href;
  const urlHelper = new UrlHelper();

  const id = urlHelper.readParam(url, "id");
  productService
    .findAllProducts()
    .then((product) => {
      let listCate = false;
      for (const item in product) {
        const idCategory = product[item]["category"];
        if (idCategory == id) {
          return (listCate = true);
        }
      }
      return listCate;
    })
    .then((idCategory) => {
      if (idCategory) {
        alert("Loại hàng đã tồn tại sản phẩm");
      } else {
        categoryService.deleteCategory(id);
        alert("Xóa thành công");
      }
      location.href = "../../../admin/function/Category/listCategory.html";
    });
});
