import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ByCountry from './ByCountry';
import WorldWide from './WorldWide';
import { MainContext } from '../context/MainContext';
import logo from '../images/logo.png';
import apiClient from '../services/api';

function Dashboard() {
  const { user } = useContext(MainContext);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [page, setPage] = useState(localStorage.getItem('page') || 'worldWide');

  const handleLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handlePageChange = (e) => {
    localStorage.setItem('page', e.target.value);
    setPage(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PUBLIC_API}/api/all-countries`)
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PUBLIC_API}/api/statistics-sum`)
      .then((res) => {
        setisLoading(false);
        setStatistics(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    apiClient
      .post(`/api/logout`)
      .then(() => console.log('logged out'))
      .catch((err) => console.log(err));

    localStorage.removeItem('user');

    navigate('/login');
  };

  return (
    !isLoading && (
      <div className='px-24'>
        <div className='flex items-center justify-between m-auto my-6 width90'>
          <img src={logo} alt='Coronatime logo' />
          <div className='flex'>
            <select
              id='location'
              name='location'
              className='self-center block w-24 py-2 pl-3 mt-1 mr-10 text-lg font-semibold bg-white rounded-md focus:outline-none sm:text-sm'
              defaultValue={i18n.language === 'ka' ? 'ka' : 'en'}
              onChange={handleLanguage}
            >
              <option value='en'>English</option>
              <option value='ka'>Georgian</option>
            </select>
            <h2 className='self-center text-lg font-bold'>{user?.name}</h2>
            <button
              className='w-auto pl-4 ml-4 text-red-300 border-l'
              onClick={handleLogout}
            >
              {t('Log Out')}
            </button>
          </div>
        </div>
        <hr />
        <div className='w-full mt-12 text-2xl font-extrabold'>
          <h2 className='mb-12 '>{t('Worldwide Statistics')}</h2>
          <div className='pb-6 border-b-2 mb-14'>
            <div className='flex justify-between w-56 text-lg'>
              <button
                onClick={handlePageChange}
                value='worldWide'
                className={page === 'worldWide' ? 'font-bold' : ''}
              >
                {t('Worldwide')}
              </button>
              <button
                onClick={handlePageChange}
                value='byCountry'
                className={page === 'byCountry' ? 'font-bold' : ''}
              >
                {t('By country')}
              </button>
            </div>
          </div>
          {page === 'worldWide' ? (
            statistics && <WorldWide statistics={statistics} />
          ) : page === 'byCountry' ? (
            <ByCountry countries={countries} />
          ) : null}
        </div>
      </div>
    )
  );
}

export default Dashboard;
