import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom'

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
        <div>
            <form onSubmit={handleSubmit}>
                {errors.map((err, index) => (
                    <p key={index}>{err}</p>
                ))}
                <div>
                    <label>Superhero Name:</label>
                    <input type='text' onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label>Powers:</label>
                    <textarea onChange={e => setPower(e.target.value)}></textarea>
                </div>
                <div>
                    <label>Weaknesses:</label>
                    <textarea onChange={e => setWeakness(e.target.value)}></textarea>
                </div>
                <button>Create Superhero</button>
                <button>Cancel</button>
            </form>
        </div>
    )
}

export default HeroCreate;
