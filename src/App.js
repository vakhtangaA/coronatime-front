import { Routes, Route } from 'react-router-dom';

import MainContextProvider from './context/MainContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import VerificationLinkSent from './components/VerificationLinkSent';
import VerificationSuccess from './components/VerificationSuccess';
import PrivatePage from './components/PrivatePage';
import GuestPage from './components/GuestPage';
import ForgotPassword from './components/ForgotPassword';
import PasswordResetLinkSent from './components/PasswordResetLinkSent';
import SetNewPassword from './components/SetNewPassword';
import PasswordReseted from './components/PasswordReseted';
import './App.css';

function App() {
  return (
    <MainContextProvider>
      <Routes>
        <Route
          path='login'
          element={
            <GuestPage>
              <Login />
            </GuestPage>
          }
        ></Route>
        <Route
          path='register'
          element={
            <GuestPage>
              <Register />
            </GuestPage>
          }
        ></Route>
        <Route
          path='verification-sent'
          element={
            <GuestPage>
              <VerificationLinkSent />
            </GuestPage>
          }
        ></Route>
        <Route
          path='verification-success'
          element={
            <GuestPage>
              <VerificationSuccess />
            </GuestPage>
          }
        ></Route>
        <Route
          path='password-reset-sent'
          element={
            <GuestPage>
              <PasswordResetLinkSent />
            </GuestPage>
          }
        ></Route>
        <Route
          path='forgot-password'
          element={
            <GuestPage>
              <ForgotPassword />
            </GuestPage>
          }
        ></Route>
        <Route
          path='reset-password/:hash'
          element={
            <GuestPage>
              <SetNewPassword />
            </GuestPage>
          }
        ></Route>
        <Route
          path='password-reseted'
          element={
            <GuestPage>
              <PasswordReseted />
            </GuestPage>
          }
        ></Route>
        <Route
          path='/'
          element={
            <PrivatePage>
              <Dashboard />
            </PrivatePage>
          }
        ></Route>
        <Route path='*' element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </MainContextProvider>
  );
}

export default App;
