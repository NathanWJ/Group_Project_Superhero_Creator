import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom'

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
        <div>
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
        </div>
 
    )
}

export default HeroViewOne;
