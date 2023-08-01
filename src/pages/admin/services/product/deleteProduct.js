import "regenerator-runtime/runtime";
import Category from "../../../../models/Category";
import CategoryServive from "../../../../services/CategoryService";
import FirebaseConstants from "../../../../constants/FirebaseConstants";
import UrlHelper from "../../../../helpers/UrlHelper";
import ProductService from "../../../../services/ProductService";
import OrderDetailServive from "../../../../services/OrderDetailService";

$(document).ready(function () {
  const productService = new ProductService(
    FirebaseConstants.RealTimeDb,
    "Token"
  );
  const orderDetailService = new OrderDetailServive(
    FirebaseConstants.RealTimeDb,
    "Token"
  );

  const url = location.href;
  const urlHelper = new UrlHelper();

  const id = urlHelper.readParam(url, "id");
  orderDetailService
    .findAllOrderDetail()
    .then((orderDetail) => {
      let listProd = false;
      for (const item in orderDetail) {
        const idProduct = orderDetail[item]["id_product"];
        if (idProduct == id) {
          return (listProd = true);
        }
      }
      return listProd;
    })
    .then((listProd) => {
      if (listProd) {
        alert("Sản phẩm đã có trong đơn hàng");
      } else {
        productService.deleteProduct(id);
        alert("Xóa thành công");
      }
      location.href = "../../../admin/function/Product/listProduct.html";
    });

  // });
});
