import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ByCountry from './ByCountry';
import WorldWide from './WorldWide';
import { MainContext } from '../context/MainContext';
import logo from '../images/logo.png';

function Dashboard() {
  const { user } = useContext(MainContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(null);
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

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsLoggedIn(true);
    }

    if (!localStorage.getItem('user') && !isLoggedIn) {
      navigate('login');
    }
  }, [navigate, isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return !isLoading
    ? isLoggedIn && (
        <div className='px-24'>
          <div className='flex items-center justify-between m-auto my-6 width90'>
            <img src={logo} alt='Coronatime logo' />
            <div className='flex'>
              <select
                id='location'
                name='location'
                className='mr-10 mt-1 block w-24 pl-3 pr-10 py-2 font-semibold text-lg focus:outline-none bg-white sm:text-sm rounded-md self-center'
                defaultValue={i18n.language === 'ka' ? 'ka' : 'en'}
                onChange={handleLanguage}
              >
                <option value='en'>English</option>
                <option value='ka'>Georgian</option>
              </select>
              <h2 className='text-lg font-bold self-center'>{user?.name}</h2>
              <button
                className='ml-4 border-l pl-4 w-auto text-red-300'
                onClick={handleLogout}
              >
                {t('Log Out')}
              </button>
            </div>
          </div>
          <hr />
          <div className='mt-12 font-extrabold text-2xl w-full'>
            <h2 className='mb-12 '>{t('Worldwide Statistics')}</h2>
            <div className='border-b-2 pb-6 mb-14'>
              <div className='flex text-lg w-56 justify-between'>
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
    : '';
}

export default Dashboard;
