import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/student/${id}`)
            .then(res => {
                setName(res.data.name);
                setEmail(res.data.email);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/update/${id}`, { name, email })
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-success justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Student</h2>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder='Enter your name'
                            className='form-control'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder='Enter your Email'
                            className='form-control'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-success mt-4 px-3'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update;
