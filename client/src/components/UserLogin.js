import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

import {Link, BrowserRouter, Routes, Route} from "react-router-dom"; 
import "../App.css";

const UserLogin = (props) => { 
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/login", 
            JSON.stringify({
                email, 
                password}), 
            {
                headers: {'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem("token"),},
                

            }
        );
        console.log(JSON.stringify(response.data))
        if (response.data.user) {
            localStorage.setItem('token', response.data.user)
            alert("Login Successful!")
            props.handelLogin() 
            window.location.href = "/"
        } else {
            alert("Please check your username/password.")
        }
        } catch (err) {

        }}

    return ( 
        <div className='container col-12'>
            <div className="header-container d-flex justify-content-around">
                <h1 className="header-hl text-light">Superhero Creator</h1>
            </div>
            <h1 className='smallTitle'>User Login Page</h1>
            <form onSubmit={loginHandler}>
                <label>Email:</label>
                <br/>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                <br/>
                <label>Password:</label>
                <br/>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                <br/>
                <Link to="/register" className='link'>Don't have an account? Register.</Link>
                <input className='btn btn-dark text-warning m-2' type="submit"/>
            </form>
        </div>
    )
}

export default UserLogin;