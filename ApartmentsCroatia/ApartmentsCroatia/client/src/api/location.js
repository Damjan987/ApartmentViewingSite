import axios from "axios";

export const createLocation = async (data) => {
  const response = await axios.post("/api/location", data);

  return response;
};

export const getLocations = async () => {
  const response = await axios.get("/api/location");

  return response;
};

export const getLocation = async (locationId) => {
  const response = await axios.get(`/api/location/${locationId}`);

  return response;
};

export const updateLocation = async (locationId, formData) => {
  const response = await axios.put(`/api/location/${locationId}`, formData);

  return response;
};

export const deleteLocation = async (locationId) => {
  const response = await axios.delete(`/api/location/${locationId}`);

  return response;
};

export const loadLocationsBySearchName = async (name) => {
  const response = await axios.get(`/api/location/search/${name}`);

  return response;
};