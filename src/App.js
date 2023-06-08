import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { useState } from 'react';
import CreateTask from './Components/Task/CreateTask';
// import UpdateTask from './Components/Task/UpdateTask';
import DeletedTask from './Components/Task/DeletedTask';
import Register from './Components/Authentication/Register';
import Login from './Components/Authentication/Login';


function App() {
  const [login,setLogin] = useState(false);
  const [createTask,setCreateTask] = useState(false);
   
  return (
    <>
    <Navbar login={login} setLogin={setLogin}/>
    <Routes>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login setLogin={setLogin} />}/>
      <Route index path='/' element={<Home setCreateTask={setCreateTask}/>}/>
      <Route path='/createtask/:id' element={<CreateTask createTask={createTask}/>}/>
      {/* <Route path='/updatetask/:id' element={<UpdateTask/>}/> */}
      <Route path='/deletedtask' element={<DeletedTask/>}/>
    </Routes>
    </>
  );
}

export default App;
