import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useParams, useNavigate, BrowserRouter, Routes, Route,Link } from 'react-router-dom'
import "../App.css";

const HeroEdit = (props) => { 
    const [name, setName] = useState('')
    const [powers, setPower] = useState('')
    const [weakness, setWeakness] = useState('')
    const [errors, setErrors] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`http://localhost:8000/api/heroes/${id}`)
        .then(res => {
            setName(res.data.name)
            setPower(res.data.powers)
            setWeakness(res.data.weakness)
        })
        .catch(err => console.log(err))
    }, [])


        const handleUpdate = e => {
            e.preventDefault()

            axios.put(`http://localhost:8000/api/heroes/${id}`, {
                name,
                powers,
                weakness
            })
            .then(res => {
                setName(res.data.name)
                setPower(res.data.powers)
                setWeakness(res.data.weakness)
                navigate('/')

            }).catch((err) => {
                const errorResponseObj = err.response.data.errors
                console.log(errorResponseObj)
                const errorArr = []
                for (const key of Object.keys(errorResponseObj)){
                  errorArr.push(errorResponseObj[key].message)
                }
                setErrors(errorArr)
                  })
        }

    return ( 
        <div>
            <div className="header-container d-flex justify-content-around">
                <h1 className="header-hl text-light">Superhero Creator</h1>
                    <Link to={`/`} className='links'> Home </Link>
                    <Link to={`/heroes/new`} className='links'> Create Hero </Link>
                    <Link to={`/heroes/compare`} className='links'> Compare Superheroes </Link>
                    <Link to={`/login`} className='links'> Logout </Link>
            </div>
            <h1 className='smallTitle'>Edit Hero</h1>
            <div>
                <form onSubmit={handleUpdate}>
                    {errors.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))}
                    <div>
                        <label>Superhero Name:</label>
                        <br/>
                        <input type='text' onChange={e => setName(e.target.value)} value={name}></input>
                    </div>
                    <div>
                        <label>Powers:</label>
                        <br/>
                        <textarea onChange={e => setPower(e.target.value)} value={powers}></textarea>
                    </div>
                    <div>
                        <label>Weaknesses:</label>
                        <br/>
                        <textarea onChange={e => setWeakness(e.target.value)} value={weakness}></textarea>
                    </div>
                    <button className='btn btn-dark text-light'>Update Superhero</button>
                    <button className='btn btn-dark text-light'>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default HeroEdit;
