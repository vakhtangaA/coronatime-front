import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import apiClient from '../services/api';
import { MainContext } from '../context/MainContext';
import LanguageLayout from './layout/LanguageLayout';
import logo from '../images/logo.png';
import MainImage from '../images/covidvaccinces-compressed.png';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useContext(MainContext);

  const authInputValidation = {
    required: t('This field is required'),
    minLength: {
      value: 3,
      message: t('Field needs to be at least 3 characters'),
    },
    maxLength: {
      value: 45,
      message: t('Field characters needs to be less than 45'),
    },
  };

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
              <div className='mb-2'>
                <label className='block font-bold' htmlFor='name'>
                  {t('Username or Email')}
                </label>
                <div className='relative'>
                  <input
                    className='block w-full p-4 my-2 border rounded-lg focus:outline-none h-14'
                    type='text'
                    placeholder={t('Enter username or email')}
                    {...register('name', authInputValidation)}
                  />
                </div>
                <div className='h-6'>
                  {errors.name && (
                    <span className='block mb-4 text-sm text-red-500'>
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>
              <div className='mb-2'>
                <label className='block font-bold' htmlFor='name'>
                  {t('Password')}
                </label>
                <div className='relative'>
                  <input
                    className='block w-full p-4 my-2 border rounded-lg focus:outline-none h-14'
                    type='password'
                    placeholder={t('Fill in password')}
                    {...register('password', authInputValidation)}
                  />
                </div>
                <div className='h-6'>
                  {errors.password && (
                    <span className='block mb-4 text-sm text-red-500'>
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <div className='flex justify-between mb-10'>
                <div className='flex items-center justify-between'>
                  <div className='flex flex-row-reverse items-center'>
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
                  to='/forgot-password'
                  className='my-auto font-semibold text-blue-600'
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
                  className='ml-2 font-bold text-black hover:underline'
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
