import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import{Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '.././components/styles/stylesheets/style.css'


const HeroAll = (props) => { 

    const [allHeroes, setAllHeroes] = useState([]);

    const deleteHero = (idBelow) => {
        axios
        .delete(`http://localhost:8000/api/heroes/${idBelow}`)
        .then((res) =>{
            console.log(res.body);

            const newHeroList = allHeroes.filter((hero,index) => hero._id !== idBelow)
            setAllHeroes(newHeroList)
        })
        .catch((err)=> console.log(err))
    }


    useEffect(() => {
        axios
            .get("http://localhost:8000/api/heroes")
            .then((res) => {
            console.log(res.data);
            setAllHeroes(res.data);
            })
            .catch((err) => {
            console.log(err.res);
            });
        }, []);

    return ( 
        <div className='container mt-4'> 
            <div>
                <table className='table-bordered col-12 align-items-center'>
                    <thead>
                        <tr>
                            <th>Superhero</th>
                            <th>Powers</th>
                            <th>Weakness</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {allHeroes.map((hero,index) =>{
                            return(
                                <tr key={hero._id}> 
                                <td>{hero.name}</td>
                                <td>{hero.powers}</td>
                                <td>{hero.weakness}</td>
                                <td className='justify-content-evenly d-flex p-2 '>
                                    <button className='btn'> 
                                        <Link className='text-decoration-none text-dark' to={`/heroes/${hero._id}`}> Details </Link>
                                    </button> 
                                    
                                {/* DO IF STATEMENT */}

                                    <button className='btn'>
                                        <Link className='text-decoration-none text-dark' to={`/heroes/${hero._id}/edit`}> Edit </Link>
                                    </button>
                                    <button onClick={()=> deleteHero(hero._id) } className='btn'> 
                                        Delete!
                                    </button>

                                </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HeroAll;
