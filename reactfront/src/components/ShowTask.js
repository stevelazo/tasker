import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api' ////Ruta de conexion con Laravel////

const ShowTask = () => {
    const [tasks, setTasks] = useState([])
 
    useEffect (()=>{
        getAllTask()
    },[])

    ////Metodo para obtener listado de tareas////
    const getAllTask = async () =>{
        const response = await axios.get(`${endpoint}/tasks`)
        setTasks(response.data)
    }
    ////Metodo para eliminar una tarea////
    const deleteTask = async (id) =>{
        // eslint-disable-next-line
        await axios.delete(`${endpoint}/task/${id}`)
        getAllTask()

    }
    
    return (
        <div>
            <div className='d-grid gap-2'>
                <h3>Listado de Tareas</h3>
                <Link to="/create" className='btn btn-success bt-lg mt-2 mb-2 text-white'>Crear</Link>
            </div>
            <table className='table table-striped'>
                <thead className='bg-primary text-white'>
                    <th><b>Titulo</b></th>
                    <th><b>Decripcion</b></th>
                    <th><b>Responsable</b></th>
                    <th><b>Acciones</b></th>
                </thead>
                <tbody>
                    {tasks.map( (task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.name_response} {task.last_name_response}</td>
                            <td>
                                <Link to={`/edit/${task.id}`} className='btn btn-warning'><b>Editar</b></Link>&nbsp;
                                <button onClick={ ()=>deleteTask(task.id)} className='btn btn-danger'><b>Eliminar</b></button>
                            </td>
                        </tr>
                    )) }
                    
                </tbody>
            </table>
        </div>
    )
}

export default ShowTask