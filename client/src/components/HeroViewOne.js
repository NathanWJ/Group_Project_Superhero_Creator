import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useParams, Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import "../App.css";

const HeroViewOne = (props) => { 
    const [name, setName] = useState('')
    const [powers, setPowers] = useState('')
    const [weakness, setWeakness] = useState('')
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/heroes/${id}`)
        .then(res => {
            setName(res.data.name)
            setPowers(res.data.powers)
            setWeakness(res.data.weakness)
        })
        .catch(err => console.log(err))
    })
    return ( 
        <div className='container'>
            <div className="header-container d-flex justify-content-around">
                <h1 className="header-hl text-light">Superhero Creator</h1>
                    <Link to={`/`} className='links'> Home </Link>
                    <Link to={`/heroes/new`} className='links'> Create Hero </Link>
                    <Link to={`/heroes/compare`} className='links'> Compare Superheroes </Link>
                    <Link to={`/login`} className='links'> Logout </Link>
            </div>
            <h1 className='smallTitle'> Information on {name} </h1>
            <div className='info'>
                <div>
                    <h2>Superhero Name:</h2>
                    <p>{name}</p>
                </div>
                <div>
                    <h2>Superhero's Powers:</h2>
                    <p>{powers}</p>
                </div>
                <div>
                    <h2>Superhero's Weakness:</h2>
                    <p>{weakness}</p>
                </div>
                <button className='btn btn-warning'>
                    <Link className='text-decoration-none text-dark' to={`/`}> Go Back </Link>
                </button>
            </div>
        </div>

    )
}

export default HeroViewOne;
