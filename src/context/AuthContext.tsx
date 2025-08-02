'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

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
  isPending: boolean;
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

  const getMe = async () => {
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
  };

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
        isPending: values.isPending,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('반드시 AuthProvider 안에서 사용해야함');

  //const router = useRouter();
  // useEffect(() => {
  //   if (required && !context?.user && !context?.isPending) {
  //     router.push('/login');
  //   }
  // }, [context?.user, context?.isPending, required, router]);

  return context;
};
