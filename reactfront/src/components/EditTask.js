import axios from "axios";
import React, { useState, useEffect} from "react";
import { useNavigate, useParams  } from "react-router-dom";

const endpoint = 'http://localhost:8000/api' ////Ruta de conexion con Laravel////

const EditTask =() =>{

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [name_response, setNameResponse] = useState('')
    const [last_name_response, setLastNameResponse] = useState('')
    const navigate = useNavigate()
    // eslint-disable-next-line
    const {id} = useParams()

    const update = async (e) =>{
        e.preventDefault()
        console.log(title)
        console.log(description)
        console.log(name_response)
        console.log(last_name_response)
        // eslint-disable-next-line
        await axios.put(`${endpoint}/task/${id}`,{
            title:title,
            description:description,
            name_response:name_response,
            last_name_response:last_name_response
        })
         navigate('/')
     }
 
    useEffect(()=>{
        const getTaskById =  async ()=>{
            // eslint-disable-next-line
            const response =  await axios.get(`${endpoint}/task/${id}`)
            console.log(response.data)
            setTitle( response.data.title )
            setDescription( response.data.description )
            setNameResponse( response.data.name_response )
            setLastNameResponse( response.data.last_name_response)

        }

        getTaskById()
        // eslint-disable-next-line
    },[])


    return(
        <div>
        <h3><b>Editar Tarea</b></h3>
        <form onSubmit={update}>
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
            <button type='submit' className='btn btn-primary'>Editar</button>
        </form>
        
    </div>
    )

}

export default EditTask