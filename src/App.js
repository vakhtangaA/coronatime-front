import { Routes, Route } from 'react-router-dom';

import MainContextProvider from './context/MainContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import VerificationLinkSent from './components/VerificationLinkSent';
import './App.css';

function App() {
  return (
    <MainContextProvider>
      <Routes>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route
          path='verification-sent'
          element={<VerificationLinkSent />}
        ></Route>
        <Route path='/' element={<Dashboard />}></Route>
      </Routes>
    </MainContextProvider>
  );
}

export default App;
