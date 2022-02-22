import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiClient from '../services/api';

const GuestPage = ({ children }) => {
  const [isLoggedIn, setiIsLoggedIn] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get(`api/is-logged`)
      .then((res) => {
        setiIsLoggedIn(res.data.isLoggedIn);
        setisLoading(false);
      })
      .catch((err) => {
        setisLoading(false);
        console.error(err);
      });
  }, []);

  if (isLoading) {
    return <h2>waiting...</h2>;
  }

  return !isLoggedIn === true ? children : <Navigate to='/' replace />;
};

export default GuestPage;
