import "regenerator-runtime/runtime";
import OrderServive from "../../../../services/OrderService";
import OrderDetailServive from "../../../../services/OrderDetailService";
import FirebaseConstants from "../../../../constants/FirebaseConstants";
import UrlHelper from "../../../../helpers/UrlHelper";

$(document).ready(function () {
  const orderService = new OrderServive(FirebaseConstants.RealTimeDb, "Token");
  const orderServiceDetail = new OrderDetailServive(
    FirebaseConstants.RealTimeDb,
    "Token"
  );

  const url = location.href;
  const urlHelper = new UrlHelper();
  const id = urlHelper.readParam(url, "id");

  orderService.deleteOrder(id).then(() => {
    orderServiceDetail
      .findAllOrderDetail()
      .then((orderDetail) => {
        const arr = [];
        for (const key in orderDetail) {
          const obj = orderDetail[key];
          obj["id_order_detail"] = key;
          arr.push(obj);
        }
        const listOrderDetail = arr.filter((item) => item["id_order"] === id);
        listOrderDetail.forEach((item) => {
          const { id_order_detail } = item;
          orderServiceDetail.deleteOrderDetail(id_order_detail);
        });
      })
      .then(() => {
        alert("xoa thanh cong");
        location.href = "../../../admin/function/Order/listOrder.html";
      });
  });
});
