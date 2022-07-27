import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useParams, useNavigate } from 'react-router-dom'

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
         <form onSubmit={handleUpdate}>
            {errors.map((err, index) => (
                <p key={index}>{err}</p>
            ))}
            <div>
                <label>Superhero Name:</label>
                <input type='text' onChange={e => setName(e.target.value)} value={name}></input>
            </div>
            <div>
                <label>Powers:</label>
                <textarea onChange={e => setPower(e.target.value)} value={powers}></textarea>
            </div>
            <div>
                <label>Weaknesses:</label>
                <textarea onChange={e => setWeakness(e.target.value)} value={weakness}></textarea>
            </div>
            <button>Create Superhero</button>
            <button>Cancel</button>
        </form>
    </div>
    )
}

export default HeroEdit;
