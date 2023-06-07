import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiAccountPinCircleFill, RiLoginCircleFill, RiLogoutCircleRFill } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';

const Navbar = ({ setLogin }) => {

  const login = localStorage.getItem('login');
  const name = localStorage.getItem(['name']);

  const [isMenu, setisMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const url = "http://localhost/reg-form/logout.php";
    try {
      const response = await axios.get(url);
      if (response.data?.code === 'SUCCESS') {
        setLogin(false)
        localStorage.clear();
        setisMenu(false);
        navigate('/login')
        // window.location.reload();
      } else {
        console.log(response?.data?.message)
      }
    } catch ({ response }) {
      console.log(response?.data?.message)
    }
  }

  const logout = () => {
    setisMenu(!isMenu)
  }

  return (
    <>
      <nav className='w-full sticky top-0 z-50 bg-transparent h-16 flex justify-between items-center px-6'>
        <ul className="flex items-center">
          <li><Link to='/' className='text-2xl'>TASKS</Link></li>
        </ul>
        <ul className='flex gap-4 relative'>
          {login ?
            <>
              <li><Link to='/deletedtask' className='hover:text-gray-600 transition-all duration-100 ease-in-out'>RecycleBin</Link></li>
              <li onClick={logout} className='cursor-pointer'><button className='flex items-center gap-1'><BiUserCircle className='text-lg' />{name}</button> </li>
            </>
            : <li className='px-2 flex gap-1'>
              <Link to='/register' className='hover:text-gray-600 transition-all duration-100 ease-in-out flex items-center gap-1'><RiAccountPinCircleFill className='text-lg' /> SignUp</Link> |
              <Link to='/login' className='hover:text-gray-600 transition-all duration-100 ease-in-out flex items-center gap-1'><RiLoginCircleFill className='text-lg' />LogIn</Link>
            </li>}
          {isMenu ?
            <li className='my-2 absolute top-5 z-50 right-0 bg-gray-200 px-2 py-0.5 rounded-md'><Link onClick={handleLogout} className='hover:text-red-600 transition-all duration-100 ease-in-out flex items-center gap-1'><RiLogoutCircleRFill className='text-lg' />LogOut</Link></li>
            : ''}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
