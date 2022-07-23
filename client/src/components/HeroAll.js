import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
// import jwt from "jsonwebtoken";

const HeroAll = (props) => { 

    const getHeroesHandler = (props) => {
        //Please enter code that will get super heros from database here.
        //In the useEffect hook, I'm basically saying if user does exist, run this function to get all heroes.
        //I've provided some boilerplate code because I was testing the code. Can be used for calling heroes too.
        axios.get("http://localhost:8000/users", {
            headers: {
            'x-access-token': localStorage.getItem("token"),
        }
    })
            .then ((response) => {
                console.log(response.data)
            }
        )
            .catch((err) => {
                console.log(err)
            })
    }

        const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const user = (token) => {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse(window.atob(base64));
              };
            if (!user) {
                localStorage.removeItem("token")
                navigate('/register')
            } else {
                getHeroesHandler()
                
            }
        }
    }, [])



    // const history = useHistory()
    // useEffect(() => {
    //     const token = localStorage.getItem("token")
    //     if (token) {
    //         const user = jwt.decode(token)
    //         if (!user) {
    //             localStorage.removeItem("token")
    //             history.replace('/register')
    //         } else {
    //             getHeroesHandler()
                
    //         }
    //     }
    // }, [])

    return ( 
        <div>
            <h1>View All Hero Dashboard Page</h1>
        </div>
    )
}

export default HeroAll;
