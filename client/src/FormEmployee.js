import { useState, useEffect } from 'react';
import axios from 'axios';
import './FormEmployee.css'
import { Link, useNavigate, useParams } from 'react-router-dom';


function FormEmployee() {

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [position, setPosition] = useState("")
  const [salary, setSalary] = useState("")

  // const [edit, setEdit] = useState(null);
  const navigate = useNavigate();

  let { userId } = useParams();

  // const [employeeList, setEmployeeList] = useState([])


  // const getEmployee = async () => {
  //     try {
  //         const response = await axios.get('http://localhost:3001/employees');
  //         setEmployeeList(response.data);
  //         console.log(response)
  //       } catch (error) {
  //         console.error(error);
  //       }
  // }

  // const getEmployee = async () => {
  //   await axios.get('http://localhost:3001/employees').then((response) => {
  //     setEmployeeList(response.data);
  //     console.log(response)
  //   })
  // }


  useEffect(() => {
    if (userId) {
      editEmployee();
    }
  }, []);

  const editEmployee = async () => {
    await axios.get(`http://localhost:3001/editEmployees/${userId}`).then((response) => {
      setName(response.data[0].name)
      setAge(response.data[0].age)
      setPosition(response.data[0].position)
      setSalary(response.data[0].salary)
    })
  }

  const updateEmployee = async (event) => {
    event.preventDefault()
    await axios.put(`http://localhost:3001/updateEmployee/${userId}`, {
      name: name,
      age: age,
      position: position,
      salary: salary
    }).then((response) => {
      navigate("/home", { replace: true });
    })
  }

  const addEmployee = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:3001/createEmployee', {
      name: name,
      age: age,
      position: position,
      salary: salary
    }).then((response) => {
      navigate("/home", { replace: true });
    });
  }

  const openPopup = (event) => {
    event.preventDefault();
    let popup = document.querySelector(".con-employee")
    popup.classList.add("open-popup")
  }

  const closePopup = (event) => {
    event.preventDefault();
    let btnCancelPopup = document.querySelector(".con-employee")
    btnCancelPopup.classList.remove("open-popup")
  }

  // useEffect(() => {
  //   editEmployee();
  // }, []);


  // const editEmployee = async () => {
  //   await axios.get(`http://localhost:3001/editEmployees/${userId}`).then((response) => {
  //     setName(response.data[0].name)
  //     setAge(response.data[0].age)
  //     setPosition(response.data[0].position)
  //     setSalary(response.data[0].salary)
  //   })
  // }


  return (
    <div className="con-employee">
      <div className="form-box">
        {/* <h1>Add Employee</h1> */}
        <h1>{userId ? 'Update Employee' : 'Add Employee'}</h1>
        <div className="form-employee">
          <form>
            <div className="mb-3">
              <label>Name</label>
              <input text='text' value={name} onChange={(event) => {
                setName(event.target.value)
              }}></input>
            </div>
            <div className="mb-3">
              <label>Age</label>
              <input text='text' value={age} onChange={(event) => {
                setAge(event.target.value)
              }}></input>
            </div>
            <div className="mb-3">
              <label>Position</label>
              <input text='text' value={position} onChange={(event) => {
                setPosition(event.target.value)
              }}></input>
            </div>
            <div className="mb-3">
              <label>Salary</label>
              <input text='text' value={salary} onChange={(event) => {
                setSalary(event.target.value)
              }}></input>
            </div>
            <div className="btn-input">
              {/* <button className='btn' type="submit" onClick={userId ? updateEmployee : addEmployee}>{userId ? 'Update' : 'Add Employee'}</button> */}
              <button className='btn' type="submit" onClick={openPopup}>{userId ? 'Update' : 'Add Employee'}</button>

              {/* <button className='btn' onClick={addEmployee}>Add Employee</button> */}
              <Link to="/home"><button className='btn'>Cancel</button></Link>
            </div>
          </form>
        </div>

      </div>

        <span className='overlay'></span>
        <div className="popup-form">
          <h3>Confirm to {userId ? 'Update' : 'Add Employee'}</h3>
          <p>Are you sure to {userId ? 'update' : 'add new employee'} ?</p>
          <div className="con-btn">
            <button className='btn-cancel-popup' onClick={closePopup}>CANCEL</button>
            <button className='btn-ok-popup' onClick={userId ? updateEmployee : addEmployee}>OK</button>
          </div>
        </div>

    </div>

  )
}

export default FormEmployee