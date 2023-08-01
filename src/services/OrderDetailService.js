import axios from "axios";

class OrderDetailServive {
  constructor(realtimeDB, accessToken) {
    this.collectionName = "order_details.json";
    this.realtimeDB = realtimeDB;
    this.accessToken = accessToken;
  }
  insertOrderDetail = async (entity) => {
    const response = await axios.post(
      this.realtimeDB + this.collectionName,
      entity
    );
    const insertedId = await response.data.name;
    return insertedId;
  };
  deleteOrderDetail = async (id) => {
    const response = await axios.delete(
      `${this.realtimeDB}order_details/${id}.json`
    );
    return response.data;
  };
  findAllOrderDetail = async (entity) => {
    const response = await axios.get(this.realtimeDB + this.collectionName);
    return response.data;
  };
}
export default OrderDetailServive;
