import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import LanguageLayout from './layout/LanguageLayout';
import logo from '../images/logo.png';
import MainImage from '../images/covidvaccinces-compressed.png';

function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_PUBLIC_API}/api/register`, {
        ...data,
        language: i18n.language,
      })
      .then(() => navigate('/verification-sent'))
      .catch((err) => alert(err.response.data.message));
  };

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
  return (
    <LanguageLayout>
      <div className='justify-between lg:flex'>
        <div className='px-4 py-8 md:flex md:flex-col lg:flex-1 md:items-center lg:items-start lg:pl-32 lg:w-3/5'>
          <div className='max-w-lg lg:w-3/5 sm:w-3/4 sm:m-auto lg:m-0'>
            <img src={logo} className='mb-8' alt='logo' />
            <h2 className='mb-2 text-xl font-black leading-6'>
              {t('Welcome to Coronatime')}
            </h2>
            <p className='mb-2 text-gray-400'>
              {t('Please enter required info to sign up')}
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mt-6 mb-2'>
                <label className='block font-bold' htmlFor='name'>
                  {t('Username')}
                </label>
                <div className='relative'>
                  <input
                    className='block w-full p-4 my-2 border rounded-lg focus:outline-none h-14'
                    type='text'
                    placeholder={t('Enter unique username')}
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
                <label className='block font-bold' htmlFor='email'>
                  {t('Email')}
                </label>
                <div className='relative'>
                  <input
                    className='block w-full p-4 my-2 border rounded-lg focus:outline-none h-14'
                    type='text'
                    placeholder={t('Enter your email')}
                    {...register('email', authInputValidation)}
                  />
                </div>
                <div className='h-6'>
                  {errors.email && (
                    <span className='block mb-4 text-sm text-red-500'>
                      {errors.email.message}
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
              <div className='mb-2'>
                <label className='block font-bold' htmlFor='name'>
                  {t('Repeat Password')}
                </label>
                <div className='relative'>
                  <input
                    className='block w-full p-4 my-2 border rounded-lg focus:outline-none h-14'
                    type='password'
                    placeholder={t('Repeat Password')}
                    {...register('repeat_password', {
                      ...authInputValidation,
                      validate: (value) =>
                        value === getValues().password ||
                        t('Passwords does not match'),
                    })}
                  />
                </div>
                <div className='h-6'>
                  {errors.repeat_password && (
                    <span className='block mb-4 text-sm text-red-500'>
                      {errors.repeat_password.message}
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
              </div>
              <button
                type='submit'
                className='block w-full p-4 my-6 font-black text-white rounded-lg bg-btnColor'
              >
                {t('REGISTER')}
              </button>

              <p className='text-center text-gray-400'>
                {t('Already have an account?')}
                <Link
                  to='/login'
                  className='ml-2 font-bold text-black hover:underline'
                >
                  {t('Log in')}
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
export default Register;
