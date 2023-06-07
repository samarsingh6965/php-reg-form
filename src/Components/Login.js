import React, { useState } from 'react'
import logo from '../Assets/login.jpg'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({setLogin}) => {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errMessage, setErrMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost/reg-form/login.php';
        const FD = new FormData();
        // FD.append('image',image);
        FD.append('email', email);
        FD.append('password', pass);
        try {
            const response = await axios.post(url, FD);
            if (response.data?.code === 'SUCCESS') {
                localStorage.setItem('name',response.data.user[0])
                localStorage.setItem('email',response.data.user[1])
                localStorage.setItem('mobile',response.data.user[2])
                const logIn = setLogin(true);
                localStorage.setItem('login', logIn)
                // point to be asked
                navigate('/');
                // console.log(response?.data?.user)
            } else {
                setErrMessage(response?.data?.message)
                setLogin(false);
            }
        } catch ({ response }) {
            setErrMessage(response?.data?.message)
            setLogin(false);
        }
    }
    
    return (
        <>
            <div id='signup' className="absolute top-0 w-full h-screen bg-no-repeat bg-cover bg-blend-lighten flex justify-center items-center">
                <div className="h-[250px] px-6 shadow-2xl max-[700px]:flex-col-reverse max-[700px]:h-auto max-[700px]:py-4 max-[700px]:w-[100%] mx-auto gap-4 flex items-center justify-center border">
                    <form onSubmit={handleSubmit} className="max-w-[380px] relative max-[700px]:w-[100%] max-[700px]:px-2 border-black flex flex-col items-center gap-3">
                        <h1 className='absolute left-1 -top-6 text-sm text-red-600'>{errMessage}</h1>
                        <input required value={email} onChange={(e) => setEmail(e.target.value)} className='w-[300px] max-[700px]:w-[100%] bg-transparent p-1 border-b placeholder:text-gray-500 focus:border-sky-500 outline-none rounded-md border-b-red-600 ' type="email" name="email" id="email" placeholder='Enter email' />
                        <input required value={pass} onChange={(e) => setPass(e.target.value)} className='w-[300px] max-[700px]:w-[100%] bg-transparent p-1 border-b placeholder:text-gray-500 focus:border-sky-500 outline-none rounded-md border-b-red-600' type="password" name="pass" id="pass" placeholder='Enter Password' />
                        <button type='submit' className='w-[300px] max-[700px]:w-[100%] p-1 outline-none rounded-md text-lg bg-blue-500 text-white bg-gradient-to-tr from-blue-600 to-green-400 transition-all duration-100 hover:from-green-400 hover:to-blue-600 ease-in-out'>LOGIN</button>
                    </form>
                    <div className="max-w-[280px] relative max-[700px]:w-[100%] max-[700px]:px-2 h-auto">
                        <img src={logo} alt="form" className='w-full h-[150px] rounded-md after:contrast-200' />
                        <div className="max-w-[300px] absolute text-white bottom-2 right-2 flex justify-center">
                            <p>If new here ! <Link to='/register' className='text-green-400 hover:text-green-500 transition-all duration-100 ease-in-out'>Click Here.</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
