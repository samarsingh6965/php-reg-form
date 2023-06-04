import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { useState } from 'react';


function App() {
  const [login,setLogin] = useState(false);

   
  return (
    <>
    <Navbar login={login} setLogin={setLogin}/>
    <Routes>
      <Route index path='/' element={<Register/>}/>
      <Route index path='/login' element={<Login setLogin={setLogin} />}/>
      <Route index path='/home' element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
