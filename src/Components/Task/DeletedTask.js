import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MdRestore } from 'react-icons/md';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DeletedTask = () => {

  const [task, setTask] = useState([]);
  const navigate = useNavigate();

  const email = localStorage.getItem(['email']);
  const login = localStorage.getItem('login');

  //fetch data for recycle-bin tale
  const getData = () => {
    axios.get(`http://localhost/reg-form/task/get_deleted_task.php?email=${email}`).then((response) => {
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
            <div className="w-full h-[405px] -z-50 overflow-auto scrollbar-none px-32 mt-4">
              <table className='w-full overflow-auto mx-auto border'>
                <thead className='sticky top-[-0.5px] border z-50 bg-red-600 text-white'>
                  <tr className=' border'>
                    <th className='w-16 border'>S No.</th>
                    <th className='border p-2'>Deleted Task</th>
                    <th className='border max-[550px]:hidden p-2'>Deleted Description</th>
                    <th className='border p-2'>Recover</th>
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
            <div className='w-full flex justify-end px-8 my-2'>
              <Link to='/createtask' className='px-4 py-2 bg-blue-500 text-white rounded-md'>Add Task</Link>
            </div>
          </>
          :
          <div className="w-full flex flex-col justify-center py-8 px-8 relative">
            <div className='w-full flex justify-center items-center'>
              <p className="text-2xl text-red-600"> Kindly Login First...</p>
            </div>
          </div>}
      </div>

    </>
  )
}

export default DeletedTask
