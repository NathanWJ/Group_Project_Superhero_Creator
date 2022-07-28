import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import axios from 'axios';
import "../App.css";

const HeroCompare = () => { 
    const [comicHero, setComicHero] = useState([]);
    const opponent1 = randomIntComicHero();
        console.log("FIRST HERO INDEX: ", opponent1);
    const opponent2 = randomIntComicHero();
        console.log("SECOND HERO INDEX: ", opponent2);

    useEffect(() => {
        console.log("COMIC HERO API STARTING");
        axios
            .get('https://akabab.github.io/superhero-api/api/all.json')
            .then(response=>{setComicHero(response.data)})
            .catch((err) => console.log("HERO COMPARE API ERROR: ", err));
    }, []);

    function refreshPage(){ 
        window.location.reload(); 
    }

    function randomIntComicHero(min, max) {
        min = Math.ceil(0);
        max = Math.floor(comicHero.length - 1);
        return Math.floor(Math.random() * (max-min) + min);
        //The maximum is exclusive and the minimum is inclusive
        //SOURCE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    }

    function findWinner(myStat, otherStat) {
        var result = "";
        // var element = document.getElementById("winnerCheck");
        // element.classList.add("winnerStyle");

        if (myStat > otherStat) {
            result = "comparison-winner";
        } else if (myStat < otherStat) {
            result = "comparison-loser";
        } else {
            result = "comparison-tied"
        }
    console.log("MY STAT: ", myStat);
    console.log("OTHER STAT: ", otherStat);
    console.log("DID I WIN? ", result);
    return result;
    }


    return ( 
        <div className="container">
            <div className="header-container d-flex justify-content-around">
                <h1 className="header-hl text-light">Superhero Creator</h1>
                    <Link to={`/`} className='links'> Home </Link>
                    <Link to={`/heroes/new`} className='links'> Create Hero </Link>
                    <Link to={`/heroes/compare`} className='links'> Compare Superheroes </Link>
                    <Link to={`/login`} className='links'> Logout </Link>
            </div>
            <div className="header">
                <h1 className='smallTitle' >Superhero Matchup</h1>
            </div>
            <div className="body">
                <table className="table table-sm">
                    <tbody>
                        <tr className="table-row">
                            <td className="col-5"><img src={ comicHero[opponent1]?.images.sm } alt="image of superhero"/></td>
                            <td className="col-2"><button className="btn btn-danger text-center" type="button" onClick={ refreshPage }> New Matchup </button></td>
                            <td className="col-5"><img src={ comicHero[opponent2]?.images.sm } alt="image of superhero"/></td>
                        </tr>
                        <tr className="table-row">
                            <th className="col-5 comicHeroName">{ comicHero[opponent1]?.name }</th>
                            <th className="col-2"></th>
                            <th className="col-5 comicHeroName">{ comicHero[opponent2]?.name }</th>
                            {/* The "?" is "Optional Chaining" looking to see if the data is defined yet, useful if the page loads too fast and React will come back and check again once the data is present */}
                            {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */}
                        </tr>
                        <tr className="table-row">
                            <td className="col-5"> from { comicHero[opponent1]?.biography.publisher }</td>
                            <td className="col-2"></td>
                            <td className="col-5"> from { comicHero[opponent2]?.biography.publisher }</td>
                        </tr>
                        <tr className="table-row table-subhead">
                            <td className="col-5"></td>
                            <td className="col-2">POWER STATS</td>
                            <td className="col-5"></td>
                        </tr>
                        <tr className="table-row">
                            <td className={findWinner(comicHero[opponent1]?.appearance.height[0], comicHero[opponent2]?.appearance.height[0])}>
                                { comicHero[opponent1]?.appearance.height[0] }
                            </td>
                            <td className="col-2">height</td>
                            <td className={findWinner(comicHero[opponent2]?.appearance.height[0], comicHero[opponent1]?.appearance.height[0])}>
                                { comicHero[opponent2]?.appearance.height[0] }
                            </td>
                        </tr>
                        <tr className="table-row">
                            <td className={findWinner(comicHero[opponent1]?.appearance.weight[0], comicHero[opponent2]?.appearance.weight[0])}>
                                { comicHero[opponent1]?.appearance.weight[0] }
                            </td>
                            <td className="col-2">weight</td>
                            <td className={findWinner(comicHero[opponent2]?.appearance.weight[0], comicHero[opponent1]?.appearance.weight[0])}>
                                { comicHero[opponent2]?.appearance.weight[0] }
                            </td>
                        </tr>
                        <tr className="table-row">
                            <td className={findWinner(comicHero[opponent1]?.powerstats.intelligence, comicHero[opponent2]?.powerstats.intelligence)}>
                                { comicHero[opponent1]?.powerstats.intelligence }
                            </td>
                            <td className="col-2">intelligence</td>
                            <td className={findWinner(comicHero[opponent2]?.powerstats.intelligence, comicHero[opponent1]?.powerstats.intelligence)}>
                                { comicHero[opponent2]?.powerstats.intelligence }
                            </td>
                        </tr>
                        <tr className="table-row">
                            <td className={findWinner(comicHero[opponent1]?.powerstats.strength, comicHero[opponent2]?.powerstats.strength)}>
                                { comicHero[opponent1]?.powerstats.strength }
                            </td>
                            <td className="col-2">strength</td>
                            <td className={findWinner(comicHero[opponent2]?.powerstats.strength, comicHero[opponent1]?.powerstats.strength)}>
                                { comicHero[opponent2]?.powerstats.strength }
                            </td>
                        </tr>

                        <tr className="table-row">
                            <td className={findWinner(comicHero[opponent1]?.powerstats.speed, comicHero[opponent2]?.powerstats.speed)}>
                                { comicHero[opponent1]?.powerstats.speed }
                            </td>
                            <td className="col-2">speed</td>
                            <td className={findWinner(comicHero[opponent2]?.powerstats.speed, comicHero[opponent1]?.powerstats.speed)}>
                                { comicHero[opponent2]?.powerstats.speed }
                            </td>
                        </tr>
                        <tr className="table-row">
                            <td className={findWinner(comicHero[opponent1]?.powerstats.durability, comicHero[opponent2]?.powerstats.durability)}>
                                { comicHero[opponent1]?.powerstats.durability }
                            </td>
                            <td className="col-2">durability</td>
                            <td className={findWinner(comicHero[opponent2]?.powerstats.durability, comicHero[opponent1]?.powerstats.durability)}>
                                { comicHero[opponent2]?.powerstats.durability }
                            </td>
                        </tr>
                        <tr className="table-row">
                            <td className={findWinner(comicHero[opponent1]?.powerstats.power, comicHero[opponent2]?.powerstats.power)}>
                                { comicHero[opponent1]?.powerstats.power }
                            </td>
                            <td className="col-2">power</td>
                            <td className={findWinner(comicHero[opponent2]?.powerstats.power, comicHero[opponent1]?.powerstats.power)}>
                                { comicHero[opponent2]?.powerstats.power }
                            </td>
                        </tr>
                        <tr className="table-row">
                            <td className={findWinner(comicHero[opponent1]?.powerstats.combat, comicHero[opponent2]?.powerstats.combat)}>
                                { comicHero[opponent1]?.powerstats.combat }
                            </td>
                            <td className="col-2">combat</td>
                            <td className={findWinner(comicHero[opponent2]?.powerstats.combat, comicHero[opponent1]?.powerstats.combat)}>
                                { comicHero[opponent2]?.powerstats.combat }
                            </td>
                        </tr>
                        <tr className="table-row table-subhead">
                            <td className="col-5"></td>
                            <td className="col-2">BIOGRAPHY</td>
                            <td className="col-5"></td>
                        </tr>
                        <tr className="table-row">
                            <td className="col-5">{ comicHero[opponent1]?.biography.fullName }</td>
                            <td className="col-2">name</td>
                            <td className="col-5">{ comicHero[opponent2]?.biography.fullName }</td>
                        </tr>
                        <tr className="table-row">
                            <td className="col-5">{ comicHero[opponent1]?.biography.placeOfBirth }</td>
                            <td className="col-2">from</td>
                            <td className="col-5">{ comicHero[opponent2]?.biography.placeOfBirth }</td>
                        </tr>
                        <tr className="table-row">
                            <td className="col-5">{ comicHero[opponent1]?.appearance.race }</td>
                            <td className="col-2">species</td>
                            <td className="col-5">{ comicHero[opponent2]?.appearance.race }</td>
                        </tr>
                        <tr className="table-row">
                            <td className="col-5">{ comicHero[opponent1]?.work.occupation }</td>
                            <td className="col-2">occupation</td>
                            <td className="col-5">{ comicHero[opponent2]?.work.occupation }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HeroCompare;
