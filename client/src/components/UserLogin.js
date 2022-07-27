import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

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
            window.location.href = "/"
        } else {
            alert("Please check your username/password.")
        }
        } catch (err) {

        }}

    return ( 
        <div>
            <h1>User Login Page</h1>
            <form onSubmit={loginHandler}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>

                <input type="submit"/>
            </form>
            
        </div>
    )
}

export default UserLogin;