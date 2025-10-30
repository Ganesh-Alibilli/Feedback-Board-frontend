import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
  return response.data;
};

export const getAllFeedbacks = async (status) => {
  const url = status && status !== 'All'
    ? `${API_URL}/api/feedbacks?status=${status}`
    : `${API_URL}/api/feedbacks`;
  const response = await axios.get(url);
  return response.data;
};

export const postFeedback = async (feedback, token) => {
  const response = await axios.post(`${API_URL}/api/feedbacks`, feedback, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const postVote = async (feedbackId, token) => {
  const response = await axios.post(
    `${API_URL}/api/feedbacks/${feedbackId}/vote`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};




