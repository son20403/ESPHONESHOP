import "regenerator-runtime/runtime";

import FirebaseConstants from "../../../../constants/FirebaseConstants";
import UrlHelper from "../../../../helpers/UrlHelper";
import OrderServive from "../../../../services/OrderService";
import Order from "../../../../models/Order";

$(document).ready(function () {
  const orderService = new OrderServive(FirebaseConstants.RealTimeDb, "Token");

  const url = location.href;
  const urlHelper = new UrlHelper();
  const id = urlHelper.readParam(url, "id");

  const idOrderCrt = $(".idOrder");
  const nameUserCrt = $(".nameUser");
  const addressCrt = $(".address");
  const emailCrt = $(".email");
  const phoneCrt = $(".phone");
  const createDateCtr = $(".createDate");
  const quantityCrt = $(".quantity");
  const priceCrt = $(".price");
  const statusCrt = $(".status");

  orderService.findAllOrder(id).then((data) => {
    const element = data[id];
    const {
      address,
      createDate,
      email,
      name,
      phone,
      status,
      totalPrice,
      totalQuantity,
    } = element;
    idOrderCrt.val(id);
    nameUserCrt.val(name);
    addressCrt.val(address);
    emailCrt.val(email);
    phoneCrt.val(phone);
    createDateCtr.val(createDate);
    quantityCrt.val(totalQuantity);
    priceCrt.val(totalPrice);
    statusCrt.val(status);
  });

  Validator({
    form: "#form-editOrder",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [
      Validator.isRequired(".nameUser"),
      Validator.isRequired(".address"),
      Validator.isRequired(".email"),

      Validator.isRequired(".phone"),
      Validator.isPrice(".phone"),
      Validator.minLength(".phone", 10),
    ],
    onSubmit: (data) => {
      const { nameUser, address, email, phone } = data;
      editOrder(nameUser, address, email, phone);
    },
  });

  function editOrder(nameUser, address, email, phone) {
    const order = new Order(
      nameUser,
      email,
      phone,
      address,
      createDateCtr.val(),
      quantityCrt.val(),
      priceCrt.val(),
      statusCrt.val()
    );

    try {
      orderService.updateOrder(idOrderCrt.val(), order).then((data) => {
        showSuccessToast();
        setTimeout(() => {
          location.href = "../../../admin/function/Order/listOrder.html";
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  }
});
