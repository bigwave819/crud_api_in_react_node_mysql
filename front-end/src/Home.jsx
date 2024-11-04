import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/")
      .then(res => setData(res.data))
      .catch(err => {
        console.log(err);
        setError("Failed to fetch data.");
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/student/${id}`)
      .then(() => {
        setData(data.filter(student => student.id !== id)); // Update the state to remove the deleted student
      })
      .catch(err => {
        console.log(err);
        setError("Failed to delete the student.");
      });
  };

  return (
    <div className='d-flex vh-100 bg-success justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <h2>List of Students</h2>
        {error && <div className='alert alert-danger'>{error}</div>} {/* Display error if any */}
        <div className='d-flex justify-content-end'>
          <Link to="/create" className='btn btn-success'>Add +</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map(student => (
              <tr key={student.id}> {/* Use student.id as the key */}
                <td>{student.id}</td> {/* Add ID column */}
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <Link to={`update/${student.id}`} className='btn btn-primary'>Edit</Link>
                  <button 
                    className='btn btn-danger mx-2' 
                    onClick={() => handleDelete(student.id)}> {/* Delete button with onClick */}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
