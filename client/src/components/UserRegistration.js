import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate, Link } from 'react-router-dom';

const UserRegistration = (props) => { 
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate()
    
    const submitHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/users", {
            firstName,
            lastName,
            email,
            password
        })
        .then((response) => {
            console.log(response)
            if (response.statusText === 'OK') {
                navigate("/login")
            }
        })
        .catch((err) => {
            console.log(err.response.data.err.errors)
            const errorResponse = err.response.data.err.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })
    }
    return ( 
        <div>
            <Link to="/login">Already have an account? Login.</Link>
            <h1>User Registration Page</h1>
            {
                errors.map((error, index) => {
                    return(
                        <h4 style={{backgroundColor:"red"}} key={index}>{error}</h4>
                    )
                })
            }
            <form onSubmit={submitHandler}>
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}></input>
                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}}></input>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>

                <input type="submit"/>
            </form>
            
        </div>
    )
}

export default UserRegistration;