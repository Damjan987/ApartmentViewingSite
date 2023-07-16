import axios from "axios";

export const getUsers = async () => {
  const response = await axios.get("/api/user");

  return response;
};

export const getUser = async (userId) => {
  const response = await axios.get(`/api/user/${userId}`);

  return response;
};

export const updateUser = async (userId, data) => {
  const response = await axios.put(`/api/user/${userId}`, data);

  return response;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`/api/user/${userId}`);

  return response;
};

export const loadUsersBySearchName = async (
  searchName,
  searchMode,
  loggedInUserId,
  postId
) => {
  const response = await axios.get(
    `/api/user/filter/${searchName}/${searchMode}/${loggedInUserId}/${postId}`
  );

  return response;
};

export const getUsersPostCount = async (userId) => {
  const response = await axios.get(`/api/user/${userId}/postCount`);

  return response;
};

export const getUsersPosts = async (userId) => {
  const response = await axios.get(`/api/user/${userId}/posts`);

  return response;
};

export const savePost = async (postId, userId) => {
  const response = await axios.put(`/api/user/${userId}/${postId}/save`);

  return response;
};

export const unsavePost = async (postId, userId) => {
  const response = await axios.put(`/api/user/${userId}/${postId}/unsave`);

  return response;
};

export const getUsersSavedPosts = async (userId) => {
  const response = await axios.get(`/api/user/${userId}/savedPosts`);

  return response;
};

export const getMostCommentedPost = async () => {
  const response = await axios.get(`/api/user/mostCommentedPost`);

  return response;
};

export const banUser = async (userId) => {
  const response = await axios.put(`/api/user/ban/${userId}`);

  return response;
};

export const unbanUser = async (userId) => {
  const response = await axios.put(`/api/user/unban/${userId}`);

  return response;
};