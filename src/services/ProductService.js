import axios from "axios";

class ProductService {
  constructor(realtimeDB, accessToken) {
    this.collectionName = "products.json";
    this.realtimeDB = realtimeDB;
    this.accessToken = accessToken;
  }
  insertProduct = async (entity) => {
    const response = await axios.post(
      this.realtimeDB + this.collectionName,
      entity
    );
    const insertedId = await response.data.name;
    return insertedId;
  };

  updateProduct = async (id, entity) => {
    const response = await axios.put(
      `${this.realtimeDB}products/${id}.json`,
      entity
    );
    return response.data;
  };
  deleteProduct = async (id) => {
    const response = await axios.delete(
      `${this.realtimeDB}products/${id}.json`
    );
    return response.data;
  };

  findAllProducts = async (entity) => {
    const response = await axios.get(this.realtimeDB + this.collectionName);
    return response.data;
  };

  findByIdProducts = async (id) => {
    const response = await axios.get(`${this.realtimeDB}products/${id}.json`);
    return response.data;
  };
}

export default ProductService;
