import * as axios from 'axios';

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

export const client = axios.create({
  baseURL: baseUrl,
});
