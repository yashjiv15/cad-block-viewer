import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // adjust if needed

export const uploadFile = (formData: FormData) => {
  return axios.post(`${BASE_URL}/files/upload`, formData);
};

export const getBlocks = (params?: any) => {
  return axios.get(`${BASE_URL}/blocks`, { params });
};

export const getBlockById = (id: string) => {
  return axios.get(`${BASE_URL}/blocks/${id}`);
};
