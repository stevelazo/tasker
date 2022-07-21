import React, {useState}   from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateTask = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [name_response, setNameResponse] = useState('')
    const [last_name_response, setLastNameResponse] = useState('')
    const navigate = useNavigate()

    const store = () =>{
       // e.prevenDefault()
        console.log(title)
        console.log(description)
        console.log(name_response)
        console.log(last_name_response)
        axios.post('http://localhost:8000/api/task',{title:title,description:description,name_response:name_response,last_name_response:last_name_response})
        navigate('/')
    }

  return (
    <div>
        <h3><b>Registrar Nueva Tarea</b></h3>
        <form onSubmit={store}>
            <div className='mb-3'>
                <label className='form-label'><b>Titulo: </b></label>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} type='text' className='form-control'/>
            </div>
            <div className='mb-3'>
                <label className='form-label'><b>Descripcion: </b></label>
                <input value={description} onChange={(e)=>setDescription(e.target.value)} type='text' className='form-control'/>
            </div>
            <div className='mb-3'>
                <label className='form-label'><b>Nombre Responsable</b></label>
                <input value={name_response} onChange={(e)=>setNameResponse(e.target.value)} type='text' className='form-control'/>
            </div>
            <div className='mb-3'>
                <label className='form-label'><b>Apellido Responsable</b></label>
                <input value={last_name_response} onChange={(e)=>setLastNameResponse(e.target.value)} type='text' className='form-control'/>
            </div>
            <button type='submit' className='btn btn-primary'>Registrar</button>
        </form>
        
    </div>
  )
}

export default CreateTask