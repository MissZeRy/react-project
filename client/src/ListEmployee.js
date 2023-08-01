import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListEmployee.css';

function ListEmployee() {

    const [employeeList, setEmployeeList] = useState([])
    const [deleteId, setDeleteId] = useState("")

    useEffect(() => {
        getEmployee();
    }, []);

    const getEmployee = async () => {
        await axios.get('http://localhost:3001/employees').then((response) => setEmployeeList(response.data))
    }


    const deleteEmployee = async (id) => {
        await axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            setEmployeeList(
                employeeList.filter((val) => {
                    return val.id !== id
                })
            )
        })
        closePopup();
    }

    const handleDelete = async (id) => {
        let popup = document.querySelector('.delete-popup')
        popup.classList.add('open-popup')
        setDeleteId(id)
    }

    const closePopup = async (id) => {
        let popup = document.querySelector('.delete-popup')
        popup.classList.remove('open-popup')
    }

    return (
        <>
            <span className='overlay-delete'></span>
            <div className='list-container'>
                <div className="btn-list-employee">
                    <button onClick={getEmployee} className='btn'>Show Employee</button>
                    <Link to="/add"><button className='btn'>Add Employee</button></Link>
                    <Link to="/login"><button className='btn'>Login</button></Link>
                </div>
                <h1>Employee List</h1>
                {/* <div className="list-employee"> */}
                <div className="header-list">
                    <p className='header-title'>Name</p>
                    <p className='header-title'>Age</p>
                    <p className='header-title'>Position</p>
                    <p className='header-title'>Salary</p>
                    <p className='header-title'>Action</p>
                </div>
                <div className="body-list">
                    {employeeList.map((val, key) => {
                        return (
                            <div className="employee-list">
                                <p className='card-employee'>{val.name}</p>
                                <p className='card-employee'>{val.age}</p>
                                <p className='card-employee'>{val.position}</p>
                                <p className='card-employee'>{val.salary}</p>
                                <div className="card-employee">
                                    <Link to={`/edit/${val.id}`}><button className='btn-edit'>EDIT</button></Link>
                                    {/* <button className="btn-delete" onClick={() => deleteEmployee(val.id)}>DELETE</button> */}
                                    <button className="btn-delete" onClick={() => handleDelete(val.id)}>DELETE</button>
                                    
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* </div> */}



            </div>

            <div className="delete-popup">
                <h3>Confirm to Delete</h3>
                <p>Are you sure to delete?</p>
                <div className="con-btn">
                    <button className='btn-cancel-popup' onClick={closePopup}>CANCEL</button>
                    <button className='btn-delete-popup' onClick={() => deleteEmployee(deleteId)}>DELETE</button>
                </div>
            </div>
        </>
    )
}

export default ListEmployee



