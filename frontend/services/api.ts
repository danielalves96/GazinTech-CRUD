import axios from 'axios';

export const gazinApi = axios.create({
  baseURL: `http://localhost:3333`,

});
