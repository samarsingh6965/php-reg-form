
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
        {login ? <div className="max-w-[600px] flex flex-col px-4 border py-4 gap-2">
          <h1><span className='text-blue-500 font-medium text-lg'>Welcome : </span>{name}</h1>
          <h1><span className='text-blue-500 font-medium text-lg'>Your Email is : </span>{email}</h1>
          <h1><span className='text-blue-500 font-medium text-lg'>Your Number is : </span>{mobile}</h1>
        </div>
        :<div className="max-w-[600px] flex flex-col border gap-2 relative">
        <img src={login_error} alt="login_error" className='w-full h-full'/>
        <p className='absolute bottom-10 left-1/3 text-white text-lg'><Link to='/login' className='hover:text-green-500'>Log-in</Link> to view Contents.</p>
      </div>}
      </div>
    </>
  )
}

export default Home
