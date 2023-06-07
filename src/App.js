import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { useState } from 'react';
import CreateTask from './Components/Task/CreateTask';
import UpdateTask from './Components/Task/UpdateTask';
import DeletedTask from './Components/Task/DeletedTask';


function App() {
  const [login,setLogin] = useState(false);
   
  return (
    <>
    <Navbar login={login} setLogin={setLogin}/>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login setLogin={setLogin} />}/>
      <Route index path='/' element={<Home/>}/>
      <Route path='/createtask' element={<CreateTask/>}/>
      <Route path='/updatetask/:id' element={<UpdateTask/>}/>
      <Route path='/deletedtask' element={<DeletedTask/>}/>
    </Routes>
    </>
  );
}

export default App;
