import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiClient from '../services/api';

const PrivatePage = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
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
    }, 500);
  }, []);

  if (isLoading) {
    return <h2>waiting...</h2>;
  }

  return !!isLoggedIn ? children : <Navigate to='/login' replace />;
};

export default PrivatePage;
