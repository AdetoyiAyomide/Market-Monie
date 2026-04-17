import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from './api';

// --- QUERIES ---

// Example: Get current user profile
export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => apiClient('/auth/profile'),
    // enabled: !!token, (optional: only run if token exists)
  });
};

// --- MUTATIONS ---

// Login Mutation
export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials) => 
      apiClient('/auth/login', { body: credentials }),
    onSuccess: (data) => {
      // Logic for storing token, e.g., localStorage.setItem('token', data.token)
      console.log('Login successful:', data);
    },
  });
};

// Register Mutation
export const useRegister = () => {
  return useMutation({
    mutationFn: (userData) => 
      apiClient('/auth/register', { body: userData }),
    onSuccess: (data) => {
      console.log('Registration successful:', data);
    },
  });
};

// Logout (usually a mutation or simple function clearing state)
export const useLogout = () => {
    // This could just clear local storage and reset query client
    // For now, we just export a simple hook structure
    return useMutation({
        mutationFn: () => apiClient('/auth/logout', { method: 'POST' }),
    })
}
