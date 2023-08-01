class Order {
  constructor(
    name,
    email,
    phone,
    address,
    createDate,
    totalQuantity,
    totalPrice,
    status
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.createDate = createDate;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
    this.status = status;
  }
}

export default Order;
