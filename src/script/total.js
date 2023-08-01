import FirebaseConstants from "../constants/FirebaseConstants";
import VND from "../models/VND";
import CategoryServive from "../services/CategoryService";
import OrderServive from "../services/OrderService";

let cart = JSON.parse(localStorage.getItem("cart"));
const categoryNavService = new CategoryServive(
  FirebaseConstants.RealTimeDb,
  "Token"
);
const orderService = new OrderServive(FirebaseConstants.RealTimeDb, "Token");
const vnd = VND;
window.addEventListener("load", () => {
  const totalItemProduct = document.querySelector("#totalItemProduct");
  const navbarCategory = document.querySelector("#navCategory");
  const totalProductsSold = document.querySelector("#totalProductsSold");
  const revenue = document.querySelector("#revenue");

  if (totalItemProduct) {
    const total = totalProd(cart);
    if (totalItemProduct) {
      totalItemProduct.textContent = total;
    }
  }

  if (navbarCategory) {
    try {
      categoryNavService.findAllCategorys().then((data) => {
        for (const item in data) {
          const element = data[item];
          const { name } = element;
          navCategory(item, name, navbarCategory);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (totalProductsSold && revenue) {
    let totalItem = 0;
    let totalPrice = 0;
    orderService.findAllOrder().then((data) => {
      for (const key in data) {
        totalItem += parseInt(data[key]["totalQuantity"]);
        totalPrice += parseInt(data[key]["totalPrice"]);
      }
      totalProductsSold.innerHTML = totalItem + " products";
      revenue.innerHTML = vnd.format(totalPrice);
    });
  }

  function totalProd(cart) {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  }

  function navCategory(id, name, element) {
    let template = `
    <a href="shopCategory.html?id=${id}" class="nav-item nav-link">${name}</a>`;
    element.insertAdjacentHTML("beforeend", template);
  }
});
