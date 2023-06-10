import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiAccountPinCircleFill, RiLoginCircleFill, RiLogoutCircleRFill } from 'react-icons/ri';

const Navbar = () => {

  const login = localStorage.getItem('token');
  const img_url = localStorage.getItem('img_url');
  const name = localStorage.getItem(['name']);
  const [isMenu, setisMenu] = useState(false);
  const navigate = useNavigate();

  // user Log-out
  const handleLogout = async () => {
    const url = 'http://localhost/reg-form/logout.php';
    try {
      const response = await axios.get(url);
      if (response.data?.code === 'SUCCESS') {
        localStorage.clear();
        setisMenu(false);
        navigate('/login')
      } else {
        console.log(response?.data?.message)
      }
    } catch ({ response }) {
      console.log(response?.data?.message)
    }
  }

  // to toggle logout button
  const logout = () => {
    if (isMenu === false) {
      setisMenu(true);
      setTimeout(() => {
        setisMenu(false);
      }, 3000);
    }
  }

  return (
    <>
      <nav className='w-full sticky top-0 z-50 bg-transparent h-16 flex justify-between items-center px-6'>
        <ul className="flex items-center">
          <li><Link to='/' className='text-2xl'>TASKS</Link></li>
        </ul>
        <ul className='flex gap-4 items-center relative'>
          {login ?
            <>
              <li><Link to='/deletedtask' className='hover:text-gray-600 transition-all duration-100 ease-in-out'>RecycleBin</Link></li>
              <li onClick={logout} className='cursor-pointer'><button className='flex items-center gap-1'><img src={'http://localhost/reg-form/' + img_url} alt="user_img" className='w-10 h-10 rounded-full'/>{name}</button> </li>
            </>
            : <li className='px-2 flex gap-1'>
              <Link to='/register' className='hover:text-gray-600 transition-all duration-100 ease-in-out flex items-center gap-1'><RiAccountPinCircleFill className='text-lg' /> SignUp</Link> |
              <Link to='/login' className='hover:text-gray-600 transition-all duration-100 ease-in-out flex items-center gap-1'><RiLoginCircleFill className='text-lg' />LogIn</Link>
            </li>}
          {isMenu ?
            <li className='my-2 absolute top-5 z-50 right-0 bg-gray-200 px-2 py-0.5 rounded-md mt-5'><Link onClick={handleLogout} className='hover:text-red-600 transition-all duration-100 ease-in-out flex items-center'><RiLogoutCircleRFill className='text-lg' />LogOut</Link></li>
            : ''}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
