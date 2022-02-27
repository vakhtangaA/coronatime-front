import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiClient from '../services/api';

const GuestPage = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get(`api/is-logged`)
      .then((res) => {
        setIsLoggedIn(res.data.isLoggedIn);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  if (isLoading) {
    return <h2>waiting...</h2>;
  }

  return !isLoggedIn === true ? children : <Navigate to='/' replace />;
};

export default GuestPage;
