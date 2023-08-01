import axios from "axios";

class OrderServive {
  constructor(realtimeDB, accessToken) {
    this.collectionName = "orders.json";
    this.realtimeDB = realtimeDB;
    this.accessToken = accessToken;
  }
  insertOrder = async (entity) => {
    const response = await axios.post(
      this.realtimeDB + this.collectionName,
      entity
    );
    const insertedId = await response.data.name;
    return insertedId;
  };
  updateOrder = async (id, entity) => {
    const response = await axios.put(
      `${this.realtimeDB}orders/${id}.json`,
      entity
    );
    return response.data;
  };
  deleteOrder = async (id) => {
    const response = await axios.delete(`${this.realtimeDB}orders/${id}.json`);
    return response.data;
  };
  findAllOrder = async (entity) => {
    const response = await axios.get(this.realtimeDB + this.collectionName);
    return response.data;
  };
  findByIdOrder = async (id) => {
    const response = await axios.get(`${this.realtimeDB}orders/${id}.json`);
    return response.data;
  };
}
export default OrderServive;
