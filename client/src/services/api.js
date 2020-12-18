import { create } from 'apisauce';

const apiUrl = {
  hml: 'http://localhost:3000/api/v1',
  prod: 'http://localhost:3000/api/v1',
};

const api = create({
  baseURL: process.env.NODE_ENV === 'production' ? apiUrl.prod : apiUrl.hml,
  headers: {
    Authorization: '',
  },
});

export default api;