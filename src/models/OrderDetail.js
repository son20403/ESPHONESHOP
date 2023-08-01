class OrderDetail {
  constructor(id_order, id_product, name, image, price, quantity) {
    this.id_order = id_order;
    this.id_product = id_product;
    this.name = name;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
  }
}

export default OrderDetail;
