import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const endpoint = 'http://localhost:8000/api' ////Ruta de conexion con Laravel////


const ShowTask = () => {
    const [tasks, setTasks] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [name_response, setNameResponse] = useState('')
    const [last_name_response, setLastNameResponse] = useState('')
    const navigate = useNavigate()

    const store = async () =>{
        //e.prevenDefault()
        console.log(title)
        console.log(description)
        console.log(name_response)
        console.log(last_name_response)
        await axios.post(`${endpoint}/task/`,{
            title:title,
            description:description,
            name_response:name_response,
            last_name_response:last_name_response})
        navigate('/')
    }

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
        <div class="tab-content">
            <div class="container-fluid spark-screen">
                <div class="box box-solid">
                    <div class="box-header">
                        <h3> <b>Gestor de Tareas</b></h3>
                        <Link to="/create" className='btn btn-success bt-lg mt-2 mb-2 text-white'>Registrar Nueva Tarea</Link>
                            <button onClick={handleShow} class="btn btn-primary btn-xs "> Agregar</button>
                        </div>
                    <div class="box-body">
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
                </div>
            </div>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h3><b>Registrar Nueva Tarea</b></h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="control-label"><b>Titulo: </b></label>
                                    <input value={title} onChange={(e)=>setTitle(e.target.value)} type='text' className='form-control'/>
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="control-label"><b>Descripcion: </b></label>
                                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} type='text' className='form-control'/>
                                    
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="control-label"><b>Nombre Responsable</b></label>
                                    <input value={name_response} onChange={(e)=>setNameResponse(e.target.value)} type='text' className='form-control'/>
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="control-label"><b>Apellido Responsable</b></label>
                                    <input value={last_name_response} onChange={(e)=>setLastNameResponse(e.target.value)} type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>                        
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={store}>Registrar</Button> 
                        
                   
                </Modal.Footer>
            </Modal>

        </div>

        
        
    )
}

export default ShowTask