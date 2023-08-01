import axios from "axios";

class CategoryServive {
  constructor(realtimeDB, accessToken) {
    this.collectionName = "categories.json";
    this.realtimeDB = realtimeDB;
    this.accessToken = accessToken;
  }
  insertCategory = async (entity) => {
    const response = await axios.post(
      this.realtimeDB + this.collectionName,
      entity
    );
    const insertedId = await response.data.name;
    return insertedId;
  };

  updateCategory = async (id, entity) => {
    const response = await axios.put(
      `${this.realtimeDB}categories/${id}.json`,
      entity
    );
    return response.data;
  };
  deleteCategory = async (id) => {
    const response = await axios.delete(
      `${this.realtimeDB}categories/${id}.json`
    );
    return response.data;
  };

  findAllCategorys = async (entity) => {
    const response = await axios.get(this.realtimeDB + this.collectionName);
    return response.data;
  };

  findByIdCategorys = async (id) => {
    const response = await axios.get(`${this.realtimeDB}categories/${id}.json`);
    return response.data;
  };
}

export default CategoryServive;
