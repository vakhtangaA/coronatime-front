import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
