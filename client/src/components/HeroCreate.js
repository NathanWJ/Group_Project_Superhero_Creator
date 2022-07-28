import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import {useNavigate, Link,  BrowserRouter, Routes, Route} from 'react-router-dom'
import "../App.css";

const HeroCreate = (props) => { 
    const [name, setName] = useState('')
    const [powers, setPower] = useState('')
    const [weakness, setWeakness] = useState('')
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    
    const handleSubmit = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/heroes", {
            name,
            powers,
            weakness
        })
        .then(res => {
            console.log(res)
            navigate('/')
        })
        .catch((err) => {
            const errorResponseObj = err.response.data.errors
            console.log(errorResponseObj)
            const errorArr = []
            for (const key of Object.keys(errorResponseObj)){
                errorArr.push(errorResponseObj[key].message)
            }
            setErrors(errorArr)
                });
    }

    
    
    return ( 
        <div className='container'>
            <div className="header-container d-flex justify-content-around">
                <h1 className="header-hl text-light">Superhero Creator</h1>
                    <Link to={`/`} className='links'> Home </Link>
                    <Link to={`/heroes/new`} className='links'> Create Hero </Link>
                    <Link to={`/heroes/compare`} className='links'> Compare Superheroes </Link>
                    <Link to={`/login`} className='links'> Logout </Link>
            </div>
            <h1 className='smallTitle'> Create New Hero </h1>
            <form onSubmit={handleSubmit} className='col-12 align-items-center'>
                {errors.map((err, index) => (
                    <p key={index}>{err}</p>
                ))} 
                <div className='mt-3'>
                    <label>Superhero Name:</label>
                    <br/>
                    <input type='text' onChange={e => setName(e.target.value)}></input>
                </div>
                <div className='mt-3'>
                    <label>Powers:</label>
                    <br/>
                    <textarea onChange={e => setPower(e.target.value)}></textarea>
                </div>
                <div className='mt-3'>
                    <label>Weaknesses:</label>
                    <br/>
                    <textarea onChange={e => setWeakness(e.target.value)}></textarea>
                </div>
                <button className='m-3 btn btn-dark text-warning'>Create Superhero</button>
                <button className='m-3 btn btn-dark text-warning'>
                    <a className='text-warning' href='/'>Cancel</a>
                </button>
            </form>
        </div>
    )
}


export default HeroCreate;