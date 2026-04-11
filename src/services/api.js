const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

export const apiClient = async (endpoint, { body, ...customConfig } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  
  // You can add logic here to get tokens from localStorage/cookies
  // const token = localStorage.getItem('token');
  if (token) headers.Authorization = `Bearer ${token}`;

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    throw new Error(data.message || response.statusText);
  } catch (err) {
    return Promise.reject(err.message || 'Something went wrong');
  }
};
