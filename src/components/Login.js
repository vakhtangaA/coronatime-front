import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import apiClient from '../services/api';
import { MainContext } from '../context/MainContext';
import LanguageLayout from './layout/LanguageLayout';
import logo from '../images/logo.png';
import MainImage from '../images/covidvaccinces-compressed.png';

function Login() {
  const { register, handleSubmit } = useForm();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useContext(MainContext);

  const onSubmit = (data) => {
    apiClient
      .get(`/sanctum/csrf-cookie`)
      .then(() => {
        apiClient
          .post(`${process.env.REACT_APP_PUBLIC_API}/api/login`, {
            ...data,
            language: i18n.language,
          })
          .then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            navigate('/');
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <LanguageLayout>
      <div className='justify-between lg:flex'>
        <div className='px-4 py-8 md:flex md:flex-col lg:flex-1 md:items-center lg:items-start lg:pl-32 lg:w-3/5'>
          <div className='max-w-lg lg:w-3/5 sm:w-3/4 sm:m-auto lg:m-0'>
            <img src={logo} className='mb-8' alt='logo' />
            <h2 className='mb-2 text-xl font-black leading-6'>
              {t('Welcome back')}
            </h2>
            <p className='mb-2 text-gray-400'>
              {t('Please enter required info to log in')}
            </p>
            <div className='mb-2 text-gray-400'>
              <span className='italic'>
                {t('if your are lazy to register')}
                <br />
              </span>
              <span className='text-red-300'>
                {t('name: admin, password: admin')}
              </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-10'>
                <label className='block font-bold' htmlFor='name'>
                  {t('Username or Email')}
                </label>
                <div className='relative'>
                  <input
                    className='block w-full p-4 my-2 border  rounded-lg focus:outline-none h-14'
                    type='text'
                    placeholder={t('Enter username or email')}
                    {...register('name', { required: true })}
                  />
                </div>
              </div>
              <div className='mb-10'>
                <label className='block font-bold' htmlFor='name'>
                  {t('Password')}
                </label>
                <div className='relative'>
                  <input
                    className='block w-full p-4 my-2 border  rounded-lg focus:outline-none h-14'
                    type='password'
                    placeholder={t('Fill in password')}
                    {...register('password', { required: true })}
                  />
                </div>
              </div>
              <div className='mb-10 flex justify-between'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center flex-row-reverse'>
                    <label
                      className='container my-2 text-sm font-semibold'
                      htmlFor='remember'
                    >
                      {t('Remember this device')}
                    </label>
                    <input
                      type='checkbox'
                      {...register('remember')}
                      className='w-6 h-10 mr-2'
                    />
                  </div>
                </div>
                <Link
                  to=''
                  className='font-semibold text-blue-600 my-auto'
                  href="{{ route('password.email', app()->getLocale()) }}"
                >
                  {t('Forgot password?')}
                </Link>
              </div>
              <button
                type='submit'
                className='block w-full p-4 my-6 font-black text-white rounded-lg bg-btnColor'
              >
                {t('LOG IN')}
              </button>

              <p className='text-center text-gray-400'>
                {t("Don't have an account?")}
                <Link
                  to='/register'
                  className='font-bold text-black hover:underline ml-2'
                >
                  {t('Sign up for free')}
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className='hidden h-full lg:block lg:w-2/5 logo max-w-604px'>
          <img
            src={MainImage}
            alt='Covid vaccinces'
            className='w-full max-h-screen min-h-screen'
          />
        </div>
      </div>
    </LanguageLayout>
  );
}
export default Login;
