import React, { useEffect, useState } from "react";
import {AiFillStar } from "react-icons/ai";
import egg from '../images/Eggs.png'
import mutton from '../images/mutton.png'
import chicken from '../images/chicken.png'
import prawns from '../images/prawns.png'
import fish from '../images/fish.png'
import all from '../images/all.png'
import {Link} from 'react-router-dom'
import loader from "../images/loader.gif"
import CommonHome from './CommonHome'


const Home=()=>{

    let checkinproduct='Chicken'
    let Mottonproduct='Mutton'
    let Fishproduct='Fish'
    let Eggproduct='Egg'
    let Prawnsproduct='Prawns'


    return(
        
        <div className="container-xxl">
            <div className="row">
                <div className="col">
                   <Link to={'/'}><img src={all} alt="Error Loading.."/></Link>
                   <h6 className="text-center">All</h6>
                </div>
                <div className="col">
                   <Link to={`/Type/${checkinproduct}`}><img src={chicken} alt="Error Loading.."/></Link>
                   <h6 className="text-center">Chicken</h6>
                </div>
                <div className="col">
                   <Link to={`/Type/${Mottonproduct}`}><img src={mutton} alt="Error Loading.."/></Link>
                   <h6 className="text-center">Mutton</h6>
                </div>
                <div className="col">
                   <Link to={`/Type/${Fishproduct}`}><img src={fish} alt="Error Loading.."/></Link>
                   <h6 className="text-center">Fish & Seafood</h6>
                </div>
                <div className="col">
                   <Link to={`/Type/${Prawnsproduct}`}><img src={prawns} alt="Error Loading.."/></Link>
                   <h6 className="text-center">Prawns</h6>
                </div>
                <div className="col">
                   <Link to={`/Type/${Eggproduct}`}><img src={egg} alt="Error Loading.."/></Link>
                   <h6 className="text-center">Egg</h6>
                </div>
            </div>
            {
                <CommonHome type={''}/>
            }
        </div>
    )
}

export default Home