import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdRestore } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import loginFirst from '../../Assets/login-please.jpg';
import axios from 'axios';

const DeletedTask = () => {

  const [task, setTask] = useState([]);
  const navigate = useNavigate();

  // const email = localStorage.getItem(['email']);
  const login = localStorage.getItem('token');

  //fetch data for recycle-bin tale
  const getData = () => {
    axios.get(`http://localhost/reg-form/task/get_deleted_task.php`,{
      headers:{
        token:localStorage.getItem('token')
      },
    }).then((response) => {
      setTask(response.data)
    }).catch((error) => {
      console.log(error);
    });
  };
  useEffect(() => {
    getData()
  }, []);

  let sno = 1;
  //permanently delete Task
  const deleteTask = (id) => {
    axios.delete(`http://localhost/reg-form/task/delete.php?id=${id}`)
      .then(function (response) {
        console.log(response);
        getData();
      }).catch((error) => {
        console.log(error)
      })
  };

  //recover deleted task
  const handleRecovery = async (id) => {
    const url = `http://localhost/reg-form/task/recover_deleted_task.php?id=${id}`;
    try {
      const response = await axios.put(url);
      if (response.data?.code === 'SUCCESS') {
        getData();
        navigate('/');
      } else {
        console.log(response?.data?.message)
      }
    } catch ({ response }) {
      console.log(response?.data?.message)
    }
  }

  return (
    <>
      <div>
        {login ?
          <>
            {/* Deleted Task Table  */}
            <div className="w-full max-h-[405px] h-auto -z-50 overflow-auto scrollbar-none px-32 mt-4">
              <table className='w-full overflow-auto mx-auto border'>
                <thead className='sticky top-[-0.5px] border z-50 bg-red-600 text-white'>
                  <tr className=' border'>
                    <th className='w-16 border'>S No.</th>
                    <th className='border p-2'>Deleted Task</th>
                    <th className='border max-[550px]:hidden p-2'>Deleted Description</th>
                    <th className='border p-2'>Restore</th>
                    <th className='border p-2'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {task.map((e, key) =>
                    <tr key={key}>
                      <td className='w-16 border text-center'>{sno++}</td>
                      <td className='border p-2'>{e.task}</td>
                      <td className='border max-[550px]:hidden p-2'>{e.desc}</td>
                      <td onClick={() => handleRecovery(e.sno)} className='delete w-[70px] border py-2'><MdRestore className='text-2xl mx-auto cursor-pointer ' /></td>
                      <td className='w-[70px] border py-2' onClick={() => deleteTask(e.sno)}><RiDeleteBin2Fill className='text-2xl mx-auto cursor-pointer  hover:text-red-500 transition-all duration-100 ease-in-out' /></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
          :
          <div className="w-full flex flex-col justify-center py-8 px-8 relative">
            <div className='w-full flex justify-center items-center'>
            <img src={loginFirst} alt="user-not-loggedd-in" className='w-[70%] h-[440px]'/>
            </div>
          </div>}
      </div>

    </>
  )
}

export default DeletedTask
