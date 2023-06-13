import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import CreateTask from './Components/Task/CreateTask';
import DeletedTask from './Components/Task/DeletedTask';
import Register from './Components/Authentication/Register';
import Login from './Components/Authentication/Login';


function App() {
   
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login/>}/>
      <Route index path='/' element={<Home/>}/>
      <Route path='/createtask/:id' element={<CreateTask/>}/>
      <Route path='/deletedtask' element={<DeletedTask/>}/>
    </Routes>
    </>
  );
}

export default App;
