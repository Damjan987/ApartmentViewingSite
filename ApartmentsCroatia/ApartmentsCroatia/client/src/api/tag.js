import axios from "axios";

export const createTag = async (data) => {
  const response = await axios.post("/api/tag", data);

  return response;
};

export const getTags = async () => {
  const response = await axios.get("/api/tag");

  return response;
};

export const getTag = async (tagId) => {
  const response = await axios.get(`/api/tag/${tagId}`);

  return response;
};

export const updateTag = async (tagId, formData) => {
  const response = await axios.put(`/api/tag/${tagId}`, formData);

  return response;
};

export const deleteTag = async (tagId) => {
  const response = await axios.delete(`/api/tag/${tagId}`);

  return response;
};

export const loadTagsBySearchName = async (name) => {
  const response = await axios.get(`/api/tag/search/${name}`);

  return response;
};