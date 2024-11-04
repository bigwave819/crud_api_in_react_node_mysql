import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function create() {
    const [values, setValues] = useState({
        name:'',
        email:''
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/student", values)
        .then(res => {
            console.log(res),
            navigate("/")
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-success justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Student</h2>
                <div>
                    <label>Name</label>
                    <input
                     type="text"
                      placeholder='enter your name'
                       className='form-control'
                       onChange={e => setValues({...values, name: e.target.value})}
                       />
                </div>
                <div>
                    <label>Email</label>
                    <input
                     type="email" 
                     placeholder='enter your Email'
                      className='form-control'
                      onChange={e => setValues({...values, email: e.target.value})}
                      />
                </div>
                <div className='d-flex justify-content-center'>
                <button className='btn btn-success mt-4 px-3'>add</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default create