import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const UserRegistration = (props) => { 
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
            console.log(err)
        })
    }
    return ( 
        <div>
            <h1>User Registration Page</h1>
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