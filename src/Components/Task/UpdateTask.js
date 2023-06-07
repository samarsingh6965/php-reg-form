import React, { useEffect, useState } from 'react'
import todo2 from '../../Assets/todoupdate.jpg'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTask = () => {

    const [todo, setTodo] = useState('');
    // console.log(todo)
    const { id } = useParams();

    const navigate = useNavigate();
    const [taskName, setEditTask] = useState('');
    // console.log(taskName)
    const [description, setEditDesciption] = useState('');
    const [errMessage, setErrMessage] = useState('');

    //get task value for updation
    const getData = () => {
        const url = `http://localhost/reg-form/task/get_by_id.php?id=${id}`;
        axios.get(url).then((response) => {
            setTodo(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        getData();
    }, []);

    //updation of task
    const handleSubmit = async (e) => {
        const url = `http://localhost/reg-form/task/update.php?id=${id}`;
        e.preventDefault();
        const updated = {
            taskName,
            description
        }
        try {
            const response = await axios.put(url, updated);
            if (response.data?.code === 'SUCCESS') {
                navigate('/');
            } else {
                setErrMessage(response?.data?.message)
            }
        } catch ({ response }) {
            setErrMessage(response?.data?.message)
        }
    }
    return (
        <>
            <div id='signup' className="absolute top-0 w-full h-screen bg-no-repeat bg-cover bg-blend-lighten flex justify-center items-center">
                <div className="h-[250px] px-6 shadow-2xl max-[700px]:flex-col-reverse max-[700px]:h-auto max-[700px]:py-4 max-[700px]:w-[100%] mx-auto gap-4 flex items-center justify-center border">
                    <form onSubmit={handleSubmit} className="max-w-[380px] relative max-[700px]:w-[100%] max-[700px]:px-2 border-black flex flex-col items-center gap-3">
                        <h1 className='absolute left-1 -top-6 text-sm text-red-600'>{errMessage}</h1>
                        <input required minLength={3} defaultValue={todo.task} onChange={(e) => setEditTask(e.target.value)} className='w-[300px] max-[700px]:w-[100%] bg-transparent p-1 border-b placeholder:text-gray-500 focus:border-sky-500 outline-none rounded-md border-b-red-600 ' type="text" name="task" id="task" placeholder='Enter Task Name' />
                        <input required minLength={5} defaultValue={todo.desc} onChange={(e) => setEditDesciption(e.target.value)} className='w-[300px] max-[700px]:w-[100%] bg-transparent p-1 border-b placeholder:text-gray-500 focus:border-sky-500 outline-none rounded-md border-b-red-600' type="text" name="description" id="desc" placeholder='Enter Description' />
                        <button type='submit' className='w-[300px] max-[700px]:w-[100%] p-1 outline-none rounded-md text-lg bg-blue-500 text-white bg-gradient-to-tr from-blue-600 to-green-400 transition-all duration-100 hover:from-green-400 hover:to-blue-600 ease-in-out'>UPDATE</button>
                    </form>
                    <div className="max-w-[280px] relative max-[700px]:w-[100%] max-[700px]:px-2 h-auto">
                        <img src={todo2} alt="form" className='w-full h-[150px] rounded-md after:contrast-200' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateTask
