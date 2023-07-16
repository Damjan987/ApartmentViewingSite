import axios from "axios";

export const createPost = async (data) => {
  const response = await axios.post("/api/post", data);

  return response;
};

export const getPosts = async () => {
  const response = await axios.get("/api/post");

  return response;
};

// gets a list of post that all have the same location
export const getPostsByLocation = async (locationId) => {
  const response = await axios.get(`/api/post/location/${locationId}`);

  return response;
};

export const getPost = async (postId) => {
  const response = await axios.get(`/api/post/${postId}`);

  return response;
};

export const updatePost = async (postId, formData) => {
  const response = await axios.put(`/api/post/${postId}`, formData);

  return response;
};

export const deletePost = async (postId, ownerId) => {
  const response = await axios.delete(`/api/post/${postId}/${ownerId}`);

  return response;
};

export const postComment = async (comment, postId, userId) => {
  const response = await axios.post(
    `/api/post/${postId}/${userId}/postComment`,
    comment
  );

  return response;
};

export const getPostsComments = async (postId, loggedInUserId) => {
  const response = await axios.get(`/api/post/${postId}/${loggedInUserId}/comments`);

  return response;
};

export const deleteComment = async (commentId, postId) => {
  const response = await axios.delete(
    `/api/post/comment/${commentId}/${postId}/delete`
  );

  return response;
};
