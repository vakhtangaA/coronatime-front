import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import logo from '../images/logo.png';
import MainImage from '../images/covidvaccinces-compressed.png';

function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className='justify-between lg:flex'>
      <div className='px-4 py-8 md:flex md:flex-col lg:flex-1 md:items-center lg:items-start lg:pl-32 lg:w-3/5'>
        <div className='max-w-lg lg:w-3/5 sm:w-3/4 sm:m-auto lg:m-0'>
          <img src={logo} className='mb-8' alt='logo' />
          <h2 className='mb-2 text-xl font-black leading-6'>
            Welcome to Coronatime
          </h2>
          <p className='mb-2 text-gray-400'>
            Please enter required info to sign up
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-10'>
              <label className='block font-bold' htmlFor='name'>
                Username
              </label>
              <div className='relative'>
                <input
                  className='block w-full p-4 my-2 border  rounded-lg focus:outline-none h-14'
                  type='text'
                  placeholder='Enter unique username'
                  {...register('username', { required: true })}
                />
              </div>
            </div>
            <div className='mb-10'>
              <label className='block font-bold' htmlFor='email'>
                Email
              </label>
              <div className='relative'>
                <input
                  className='block w-full p-4 my-2 border  rounded-lg focus:outline-none h-14'
                  type='text'
                  placeholder='Enter your email'
                  {...register('email', { required: true })}
                />
              </div>
            </div>
            <div className='mb-10'>
              <label className='block font-bold' htmlFor='name'>
                Password
              </label>
              <div className='relative'>
                <input
                  className='block w-full p-4 my-2 border  rounded-lg focus:outline-none h-14'
                  type='password'
                  placeholder='Fill in password'
                  {...register('password', { required: true })}
                />
              </div>
            </div>
            <div className='mb-10'>
              <label className='block font-bold' htmlFor='name'>
                Repeat Password
              </label>
              <div className='relative'>
                <input
                  className='block w-full p-4 my-2 border  rounded-lg focus:outline-none h-14'
                  type='password'
                  placeholder='Repeat Password '
                  {...register('repeat_password', { required: true })}
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
                    Remember this device
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
              LOG IN
            </button>

            <p className='text-center text-gray-400'>
              Already have an account?
              <Link
                to='/login'
                className='font-bold text-black hover:underline ml-2'
              >
                Log in
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
  );
}
export default Register;