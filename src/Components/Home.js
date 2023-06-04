
import { Link } from 'react-router-dom';
import login_error from '../Assets/login_error.jpg'

const Home = () => {

  const login = localStorage.getItem('login');

  const name = localStorage.getItem(['name']);
  const email = localStorage.getItem(['email']);
  const mobile = localStorage.getItem(['mobile']);
  // console.log(typeof(name))
  return (
    <>
      <div className="w-full flex justify-center py-8">
        {login ? <div className="max-w-[600px] w-[500px] bg-pink-100 flex flex-col px-4 shadow-2xl py-8 gap-2">
          <h1><span className='text-blue-500 font-medium text-lg'>Welcome : </span>{name}</h1>
          <h1><span className='text-blue-500 font-medium text-lg'>Your Email is : </span>{email}</h1>
          <h1><span className='text-blue-500 font-medium text-lg'>Your Number is : </span>{mobile}</h1>
        </div>
        :<div className="max-w-[600px] border-2 border-gray-500 shadow-2xl flex flex-col shadow-gray-700 gap-2 relative">
        <img src={login_error} alt="login_error" className='w-full h-full'/>
        <p className='absolute bottom-10 left-1/3 text-white text-lg'>Kindly <Link to='/login' className='hover:text-green-500'>log-in</Link> to view contents.</p>
      </div>}
      </div>
    </>
  )
}

export default Home
