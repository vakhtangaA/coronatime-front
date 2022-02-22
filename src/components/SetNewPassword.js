import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

import logo from '../images/logo.png';

function SetNewPassword() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { hash } = useParams();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    apiClient
      .get(`/sanctum/csrf-cookie`)
      .then(() => {
        apiClient
          .post(`/api/reset-password`, { ...data })
          .then((res) => {
            navigate('/password-reseted');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div className='flex flex-col items-center justify-start h-screen'>
      <img
        src={logo}
        className='self-start mt-4 ml-6 md:mt-12 md:ml-0 md:self-center'
        alt='redberry logo'
      />
      <div className='flex flex-col items-center self-center w-full max-w-lg px-4 mt-36 md:w-2/5 grow'>
        <h2 className='mb-16 text-3xl font-extrabold'>{t('Reset Password')}</h2>
        <form
          className='flex flex-col w-full grow'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='mb-10'>
            <input
              {...register('password', authInputValidation)}
              type='password'
              placeholder={t('Fill in password')}
              className='block w-full h-16 p-4 mb-2 border border-r-gray-300'
            />
            <div className='h-6'>
              {errors.password && (
                <span className='block mb-4 text-sm text-red-500'>
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className='mb-10'>
            <input
              {...register('password_confirmation', {
                ...authInputValidation,
                validate: (value) =>
                  value === getValues().password ||
                  t('Passwords does not match'),
              })}
              placeholder={t('Repeat Password')}
              type='password'
              className='block w-full h-16 p-4 mb-2 border border-r-gray-300'
            />
            <div className='h-6'>
              {errors.password_confirmation && (
                <span className='block mb-4 text-sm text-red-500'>
                  {errors.password_confirmation.message}
                </span>
              )}
            </div>
          </div>
          <input
            className='hidden'
            {...register('email')}
            defaultValue={searchParams.get('email')}
          />
          <input
            className='hidden'
            defaultValue={hash}
            {...register('token')}
          />

          <div></div>
          <button
            type='submit'
            className='block w-full p-4 my-6 mt-auto font-black text-white rounded-lg md:mt-5 bg-btnColor'
          >
            {t('SAVE CHANGES')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetNewPassword;
