import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import logo from '../images/logo.png';
import apiClient from '../services/api';

function ForgotPassword() {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    apiClient
      .get(`/sanctum/csrf-cookie`)
      .then(() => {
        apiClient
          .post(`/api/forgot-password`, { ...data, language: i18n.language })
          .then((res) => {
            navigate('/password-reset-sent');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='flex flex-col items-center justify-start h-screen'>
      <img
        src={logo}
        alt='coronatime logo'
        className='self-start mt-4 ml-6 md:mt-12 md:ml-0 md:self-center'
      />

      <div className='flex flex-col items-center self-center w-full max-w-lg px-4 mt-36 md:w-2/5 grow'>
        <h2 className='mb-16 text-3xl font-extrabold'>{t('Reset Password')}</h2>
        <form
          className='flex flex-col w-full grow'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='mb-10'>
            <label htmlFor='email' className='block mb-4 font-bold '>
              {t('Email')}
            </label>
            <input
              {...register('email', { required: t('This field is required') })}
              placeholder={t('Enter your email')}
              className='block w-full h-16 p-4 mb-2 border border-r-gray-300'
            ></input>
            <div className='h-6'>
              {errors.email && (
                <span className='block mb-4 text-sm text-red-500'>
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <button className='block w-full p-4 mt-auto mb-12 font-black text-white rounded-lg bg-btnColor md:mt-4'>
            {t('RESET PASSWORD')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
