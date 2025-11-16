// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
import {axiosInstance} from '../lib/axios';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setAuth({ isAuthenticated: false, user: null, loading: false });
        return;
      }

     

      // التحقق مع الخادم
      const response = await axiosInstance.get('/user/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log("Auth verify response:", response);
      if (response.data.success) {
        const data =  response.data.user;
        setAuth({
          isAuthenticated: true,
          user: data.name,
          loading: false
        });
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        setAuth({ isAuthenticated: false, user: null, loading: false });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
       localStorage.removeItem('user');
      setAuth({ isAuthenticated: false, user: null, loading: false });
    }
  };

    const updateAuthAfterLogin = (name) => {
    
    
    // تحديث state
    setAuth({
      isAuthenticated: true,
      user: name, // ✅ حفظ كل بيانات المستخدم
      loading: false
    });
  };

const logout = () => {
  // ✅ مسح البيانات المحلية
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  
  // ✅ تحديث حالة التطبيق
  setAuth({
    isAuthenticated: false,
    user: null,
    loading: false
  });
  
  // ✅ إعادة التوجيه
  navigate('/');
  
  // ✅ إشعار المستخدم
  
};

  const value = {
    ...auth,
    updateAuthAfterLogin,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};