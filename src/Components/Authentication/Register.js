import axios from 'axios';
import { useState } from 'react';
import logo from '../../Assets/reg-form-img.jpg'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const [image, setImage] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [pass, setPass] = useState('');
    const [cnfpass, setCnfPass] = useState('');
    const [errMessage, setErrMessage] = useState('');

    //for sign-up user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost/reg-form/registration.php';
        const FD = new FormData();
        FD.append('image', image);
        FD.append('name', name);
        FD.append('email', email);
        FD.append('mobile', mobile);
        FD.append('password', pass);
        FD.append('cnfpassword', cnfpass);
        if (cnfpass !== pass) {
            setErrMessage("Password not matched.")
        } else {
            try {
                let response = await axios.post(url, FD)
                if (response?.data?.code === 'SUCCESS') {
                    navigate('/login');
                } else {
                    setErrMessage(response?.data?.message)
                }
            } catch ({ response }) {
                console.log(response)
            }
        }

    }

    return (
        <>
            <div id='signup' className="absolute top-0 w-full h-screen bg-no-repeat bg-cover bg-blend-lighten flex justify-center items-center">
                <div className="h-[330px]  max-[700px]:flex-col-reverse max-[700px]:h-auto max-[700px]:p-4 max-[700px]:w-[100%] shadow-2xl px-4 mx-auto flex items-center justify-center border">
                    <form onSubmit={handleSubmit} className="max-w-[380px] relative max-[700px]:w-[100%] px-10 border-black flex flex-col items-center gap-1.5">
                        <h1 className='absolute left-4 -top-7 text-sm text-red-600'>{errMessage}</h1>
                        <input required type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])} className='w-[350px] max-[700px]:w-[100%] bg-transparent p-1 border-b placeholder:text-gray-500 focus:border-sky-500 outline-none rounded-md border-b-red-600'/>
                        <input required minLength={3} onChange={(e) => setName(e.target.value)} className='w-[350px] max-[700px]:w-[100%] bg-transparent p-1 border-b placeholder:text-gray-500 focus:border-sky-500 outline-none rounded-md border-b-red-600' type="text" name="name" id="name" placeholder='Enter Name' />
                        <input required minLength={12} onChange={(e) => setEmail(e.target.value)} className='w-[350px] max-[700px]:w-[100%] bg-transparent p-1 border-b placeholder:text-gray-500 focus:border-sky-500 outline-none rounded-md border-b-red-600' type="email" name="email" id="email" placeholder='Enter email' />
                        <input required min={10} onChange={(e) => setMobile(e.target.value)} className='w-[350px] max-[700px]:w-[100%] bg-transparent p-1 border-b placeholder:text-gray-500 focus:border-sky-500 outline-none rounded-md border-b-red-600' type="tel" name="mobile" id="mobile" placeholder='Enter Mobile' />
                        <input required onChange={(e) => setPass(e.target.value)} className='w-[350px] max-[700px]:w-[100%] bg-transparent p-1 border-b placeholder:text-gray-500 focus:border-sky-500 outline-none rounded-md border-b-red-600' type="password" name="pass" id="pass" placeholder='Enter Password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
                        <input required onChange={(e) => setCnfPass(e.target.value)} className='w-[350px] max-[700px]:w-[100%] bg-transparent p-1 border-b placeholder:text-gray-500 focus:border-sky-500 outline-none rounded-md border-b-red-600' type="password" name="cnfpass" id="cnfpass" placeholder='Re-Enter Password' />
                        <button type='submit' className='w-[350px] max-[700px]:w-[100%] p-1 outline-none rounded-md text-lg bg-blue-500 text-white bg-gradient-to-tr from-blue-600 to-green-400 transition-all duration-100 hover:from-green-400 hover:to-blue-600 ease-in-out'>REGISTER</button>
                    </form>
                    <div className="max-w-[380px] max-[700px]:w-[100%] relative h-auto">
                        <img src={logo} alt="form" className='w-full h-[230px] rounded-md after:contrast-200' />
                        <div className="max-w-[300px] absolute text-white bottom-4 right-2 flex justify-center">
                            <p>If you are an existing user ! <Link to='/login' className='text-green-400  hover:text-green-500 transition-all duration-100 ease-in-out'>Click Here.</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
