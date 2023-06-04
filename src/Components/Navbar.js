import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiAccountPinCircleFill, RiLoginCircleFill, RiLogoutCircleRFill } from 'react-icons/ri';

const Navbar = ({ setLogin }) => {

  const login = localStorage.getItem('login');
  const navigate = useNavigate();

  const handleLogout = async () => {
    const url = "http://localhost/reg-form/logout.php";
    try {
      const response = await axios.get(url);
      if (response.data?.code === 'SUCCESS') {
        setLogin(false)
        localStorage.clear();
        navigate('/login')
        // window.location.reload();
      } else {
        console.log(response?.data?.message)
      }
    } catch ({ response }) {
      console.log(response?.data?.message)
    }
  }

  return (
    <>
      <nav className='w-full sticky top-0 z-20 bg-transparent h-16 flex justify-between items-center px-6'>
        <div className="">
          <Link to='/home' className='text-2xl'>LOGO</Link>
        </div>
        <ul className='flex'>
          <li className='px-2'>
            <Link to='/home' className='hover:text-gray-600 transition-all duration-100 ease-in-out'>Home</Link>
          </li>
          {login ? <li className='px-2'><Link onClick={handleLogout} className='hover:text-red-600 transition-all duration-100 ease-in-out flex items-center gap-1'><RiLogoutCircleRFill className='text-lg' />LogOut</Link></li>
            : <li className='px-2 flex gap-1'><Link to='/' className='hover:text-gray-600 transition-all duration-100 ease-in-out flex items-center gap-1'><RiAccountPinCircleFill className='text-lg' /> SignUp</Link> | <Link to='/login' className='hover:text-gray-600 transition-all duration-100 ease-in-out flex items-center gap-1'><RiLoginCircleFill className='text-lg' />LogIn</Link></li>}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
