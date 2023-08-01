function addToCart(id, name, price, image, quantity = 1) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) {
    cart = [];
    cart.push({
      id,
      name,
      price,
      image,
      quantity,
    });
  } else {
    let item = cart.find((item) => item.id === id);
    item
      ? (item.quantity += quantity)
      : cart.push({
          id,
          name,
          price,
          image,
          quantity,
        });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  return true;
}
