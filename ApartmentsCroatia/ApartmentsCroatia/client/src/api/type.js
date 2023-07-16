import axios from "axios";

export const createType = async (data) => {
  const response = await axios.post("/api/type", data);

  return response;
};

export const getTypes = async () => {
  const response = await axios.get("/api/type");

  return response;
};

export const getType = async (typeId) => {
  const response = await axios.get(`/api/type/${typeId}`);

  return response;
};

export const updateType = async (typeId, formData) => {
  const response = await axios.put(`/api/type/${typeId}`, formData);

  return response;
};

export const deleteType = async (typeId) => {
  const response = await axios.delete(`/api/type/${typeId}`);

  return response;
};

export const loadTypesBySearchName = async (name) => {
  const response = await axios.get(`/api/type/search/${name}`);

  return response;
};
