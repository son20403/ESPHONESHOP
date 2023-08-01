function addOrder(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    cart = [];
    cart.push({
      id,
      name,
      price,
      image,
      quantity: 1,
    });
  } else {
    let item = cart.find((item) => item.id === id);
    item
      ? item.quantity++
      : cart.push({
          id,
          name,
          price,
          image,
          quantity: 1,
        });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
