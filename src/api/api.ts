import axios from '@/lib/axios';

export const login = async (email: string, password: string) => {
  const res = await axios.post('/auth/sign-in', {
    email,
    password,
  });
  return res.data;
};

export const signup = async (email: string, password: string) => {
  const res = await axios.post('/auth/sign-up', { email, password });
  return res.data;
};
