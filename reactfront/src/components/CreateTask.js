import React, {useState}   from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api' ////Ruta de conexion con Laravel////

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
        axios.post(`${endpoint}/task/`,{
            title:title,
            description:description,
            name_response:name_response,
            last_name_response:last_name_response})
        navigate('/')
    }

  return (
    <div class="tab-content">
        <h3><b>Registrar Nueva Tarea</b></h3>
        <form  onSubmit={store}>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="col-md-6 col-sm-6 col-xs-6">
                    <div class="form-group">
                        <label class="control-label"><b>Titulo: </b></label>
                        <input value={title} onChange={(e)=>setTitle(e.target.value)} type='text' className='form-control' required="true"/>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                    <div class="form-group">
                        <label class="control-label"><b>Descripcion: </b></label>
                        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} type='text' className='form-control' required="true"/>
                        
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                    <div class="form-group">
                        <label class="control-label"><b>Nombre Responsable</b></label>
                        <input value={name_response} onChange={(e)=>setNameResponse(e.target.value)} type='text' className='form-control' required="true"/>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                    <div class="form-group">
                        <label class="control-label"><b>Apellido Responsable</b></label>
                        <input value={last_name_response} onChange={(e)=>setLastNameResponse(e.target.value)} type='text' className='form-control' required="true"/>
                    </div>
                </div>
                
                <button type='submit' className='btn btn-primary'>Registrar</button> 
            </div>

            
        </form>
        
    </div>
  )
}

export default CreateTask