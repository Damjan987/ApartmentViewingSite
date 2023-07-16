import axios from "axios";

// checks if the chat with its members already exists
export const doesChatExist = async (member1, member2) => {
  const response = await axios.get(`/api/chat/doesExist/${member1}/${member2}`);

  return response;
};

export const createChat = async (member1, member2) => {
  const response = await axios.post(`/api/chat/${member1}/${member2}/create`);

  return response;
};

export const loadUsersChats = async (userId) => {
  const response = await axios.get(`/api/chat/${userId}/chats`);

  return response;
};

export const loadChat = async (chatId) => {
  const response = await axios.get(`/api/chat/${chatId}`);

  return response;
};

export const addMessageToChat = async (data) => {
  const response = await axios.post(`/api/chat/addMessage`, data);

  return response;
};

export const loadChatByMemberIds = async (member1, member2) => {
  const response = await axios.get(
    `/api/chat/loadByMembers/${member1}/${member2}`
  );

  return response;
};

export const loadChatMessages = async (member1, member2) => {
  const response = await axios.get(`/api/chat/${member1}/${member2}/messages`);

  return response;
};
