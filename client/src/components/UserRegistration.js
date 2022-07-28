import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate, Link, BrowserRouter, Routes, Route } from 'react-router-dom';

import "../App.css";

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
        <div className='container'>
            <div className="header-container d-flex justify-content-around">
                <h1 className="header-hl text-light">Superhero Creator</h1>
            </div>
            <h1 className='smallTitle'>User Registration Page</h1>
            {
                errors.map((error, index) => {
                    return(
                        <h4 style={{backgroundColor:"red"}} key={index}>{error}</h4>
                    )
                })
            }
            <form onSubmit={submitHandler}>
                <label>First Name:</label>
                <br/>
                <input type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}></input>
                <br/>
                <label>Last Name:</label>
                <br/>
                <input type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}}></input>
                <br/>
                <label>Email:</label>
                <br/>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                <br/>
                <label>Password:</label>
                <br/>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                <br/>
                <Link to="/login" className='link'>Already have an account? Login.</Link>
                <input className='mt-3 btn btn-dark text-warning' type="submit"/>
            </form>
            
        </div>
    )
}

export default UserRegistration;