import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import {Link} from 'react-router-dom'
const HeroAll = (props) => { 
    const [heroes, setHeroes] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/heroes')
        .then(res => setHeroes(res.data))
        .catch(err => console.log(err))
    }, [])


    const deleteHero = id => {
        axios.delete(`http://localhost:8000/api/heroes/${id}`)
        .then(deletedHero => {
            console.log(deletedHero)
            setHeroes(heroes.filter(filterHeroes => filterHeroes._id !== id ))
        }, [])
        .catch(err => console.log(err))
    }
    return ( 
        <div>
            <table className='table table-danger'>
                <thead>
                    <tr>
                    {/* <th scope='col'>Creator Name</th> */}
                    <th scope='col'>Superhero</th>
                    <th scope='col'>Powers</th>
                    <th scope='col'>Weakness</th>
                    <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        heroes.map((hero, index) => (
                            <tr key={index}>
                                <td>{hero.name}</td>
                                <td>{hero.powers}</td>
                                <td>{hero.weakness}</td>
                                <td><Link to={"/heroes/:id"}><button>Details</button></Link><Link to={`/heroes/edit/${hero._id}`}><button>Edit</button></Link><button onClick={() => deleteHero(hero._id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default HeroAll;
