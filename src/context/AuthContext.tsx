'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from '@/lib/axios';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    id: number;
    name: string;
    imageSource: string;
    email: string;
    createdAt: string;
  } | null;
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [values, setValues] = useState({
    user: null,
    isPending: true,
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  async function getMe() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));
    let nextUser;
    try {
      const res = await axios.get('/users');
      nextUser = res.data;
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await axios.post('/auth/sign-in', {
      email,
      password,
    });

    const data = await res.data;
    const nextToken = data.accessToken;

    localStorage.setItem('accessToken', nextToken);
    setToken(nextToken);

    await getMe();
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        user: values.user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
