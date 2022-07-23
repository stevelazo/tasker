import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const endpoint = 'http://localhost:8000/api' ////Ruta de conexion con Laravel////


const ShowTask = () => {
    ////Declaracion de Costantes para Usar en los metodos////
    const [tasks, setTasks] = useState([])
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
  //  const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  //  const handleCloseEdit = () => setShowEdit(false);
  // eslint-disable-next-line
    const handleShowEdit = () => setShowEdit(true);
   // const handleShowDelete = () => setShowDelete(true);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [name_response, setNameResponse] = useState('')
    const [last_name_response, setLastNameResponse] = useState('')
    const [title_edit, setTitleEdit] = useState('')
    const [description_edit, setDescriptionEdit] = useState('')
    const [name_response_edit, setNameResponseEdit] = useState('')
    const [last_name_response_edit, setLastNameResponseEdit] = useState('')
    const [id_edit, setIdEdit] = useState('')
    const [id_delete, setIdDelete] = useState('')
    const [title_delete, setTitleDelete] = useState('')
    
    ////Metodo para Registrar la Nueva Tarea////
    const store = async () =>{
        await axios.post(`${endpoint}/task/`,{
            title:title,
            description:description,
            name_response:name_response,
            last_name_response:last_name_response})
            setShow(false)
            getAllTask()
    }
    ////Metodo para Editar Datos de la Tarea////
    const update = async (id) =>{
        // eslint-disable-next-line
        await axios.put(`${endpoint}/task/${id}`,{
            title:title_edit,
            description:description_edit,
            name_response:name_response_edit,
            last_name_response:last_name_response_edit
        })
        setShowEdit(false)
        getAllTask()
    }

    ////Trae el Listado de las Tareas////
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
        setShowDelete(false)
        getAllTask()
    }
    
    ////Metodo para Obtener la Infprmacion de la Tarea para Editar////
    const getTaskById =  async (id)=>{
        // eslint-disable-next-line
        const response =  await axios.get(`${endpoint}/task/${id}`)
        console.log(response.data)
        setTitleEdit( response.data.title )
        setDescriptionEdit( response.data.description )
        setNameResponseEdit( response.data.name_response )
        setLastNameResponseEdit( response.data.last_name_response)
        setIdEdit(response.data.id)
        setShowEdit(true)
    }

    ////Metodo para Obtener la Infprmacion de la Tarea para Eliminar////
    const getTaskByIdDelete =  async (id)=>{
        // eslint-disable-next-line
        const response =  await axios.get(`${endpoint}/task/${id}`)
        setTitleDelete( response.data.title )
        setIdDelete(response.data.id)
        setShowDelete(true)
    }


    const cancelCourse = (form) => { 
        // eslint-disable-next-line
        if (form===1) {
            setTitle("")
            setDescription("")
            setNameResponse("")
            setLastNameResponse("")
            setShow(false) 
        }else{
            if(form===2){
                //console.log('editar')
                document.getElementById("form_editar_tarea").reset();
                setShowEdit(false)
            }else{
                setShowDelete(false)
            }
        }       
    }
   
    return (
        <div className="tab-content">
            <div className="container-fluid spark-screen">
                <div className="box box-solid">
                    <div className="box-header">
                        <h3> <b>Gestor de Tareas</b></h3>
                            <button onClick={handleShow} className="btn btn-success bt-lg mt-2 mb-2 text-white"> Registrar Nueva Tarea</button>
                        </div>
                    <div className="box-body">
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
                                            <button onClick={()=>getTaskById(task.id)} className="btn btn-warning"> Editar</button>&nbsp;&nbsp;
                                            <button onClick={()=>getTaskByIdDelete(task.id)} className='btn btn-danger'><b>Eliminar</b></button>
                                        </td>
                                    </tr>
                                )) }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <Modal show={show} onHide={()=>cancelCourse(1)}>
                <Modal.Header closeButton>
                    <Modal.Title><h3><b>Registrar Nueva Tarea</b></h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id='form_crear'>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <label className="control-label"><b>Titulo:</b></label>
                                    <input value={title} onChange={(e)=>setTitle(e.target.value)} type='text' className='form-control'/>
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <label className="control-label"><b>Descripcion:</b></label>
                                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} type='text' className='form-control'/>
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <label className="control-label"><b>Nombre Responsable:</b></label>
                                    <input value={name_response} onChange={(e)=>setNameResponse(e.target.value)} type='text' className='form-control'/>
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <label className="control-label"><b>Apellido Responsable:</b></label>
                                    <input value={last_name_response} onChange={(e)=>setLastNameResponse(e.target.value)} type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>                        
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>cancelCourse(1)}>Close</Button>
                    <Button variant="primary" onClick={store}>Registrar</Button> 
                </Modal.Footer>
            </Modal>
            
            <Modal show={showEdit} onHide={()=>cancelCourse(2)}>
                <Modal.Header closeButton>
                    <Modal.Title><h3><b>Editar Tarea</b></h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id='form_editar_tarea'>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <label className="control-label"><b>Titulo:</b></label>
                                    <input value={title_edit} onChange={(e)=>setTitleEdit(e.target.value)} type='text' className='form-control'/>
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <label className="control-label"><b>Descripcion:</b></label>
                                    <textarea value={description_edit} onChange={(e)=>setDescriptionEdit(e.target.value)} type='text' className='form-control'/>
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <label className="control-label"><b>Nombre Responsable:</b></label>
                                    <input value={name_response_edit} onChange={(e)=>setNameResponseEdit(e.target.value)} type='text' className='form-control'/>
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <label className="control-label"><b>Apellido Responsable:</b></label>
                                    <input value={last_name_response_edit} onChange={(e)=>setLastNameResponseEdit(e.target.value)} type='text' className='form-control'/>
                                </div>
                            </div>
                        </div>                        
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>cancelCourse(2)}>Close</Button>
                    <Button variant="primary" onClick={()=>update(id_edit)}>Editar</Button> 
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={()=>cancelCourse(3)}>
                <Modal.Header closeButton>
                    <Modal.Title><h3><b>Confirmacion</b></h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="control-label"><b>Confirma la eliminacion de la Tarea Titulo: {title_delete}</b></label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>cancelCourse(3)}>Close</Button>
                    <Button variant="primary" onClick={()=>deleteTask(id_delete)}>Eliminar</Button> 
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ShowTask