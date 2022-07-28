import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import{Link, BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../App.css";


const HeroAll = (props) => {
    const{loggedIn} = props;

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


        
        <div className='container'> 
        <div className='header-nav\'>
            <div className="header-container d-flex justify-content-around">
                <h1 className="header-hl text-light">Superhero Creator</h1>
                    <Link to={`/`} className='links'> Home </Link>
                    <Link to={`/heroes/new`} className='links'> Create Hero </Link>
                    <Link to={`/heroes/compare`} className='links'> Compare Superheroes </Link>
                    <Link to={`/login`} className='links'> Logout </Link>
            </div>
        </div>
            <div>
                <h1 className='smallTitle'> All Created Heroes </h1>
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
                                    <button className='btn btn-warning'> 
                                        <Link className='text-decoration-none text-dark' to={`/heroes/${hero._id}`}> Details </Link>
                                    </button> 
                                    
                                {/* DO IF STATEMENT */}

                                    <button className='btn btn-warning'>
                                        <Link className='text-decoration-none text-dark' to={`/heroes/edit/${hero._id}`}> Edit </Link>
                                    </button>
                                    <button onClick={()=> deleteHero(hero._id) } className='btn btn-warning'> 
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