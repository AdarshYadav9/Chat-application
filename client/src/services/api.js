import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: apiUrl,
});

export const getMessages = async () => {
  const response = await api.get("/api/messages");
  return response.data;
};

export const sendMessage = async (messageData) => {
  const response = await api.post("/api/messages", messageData);
  return response.data;
};

export default api;
