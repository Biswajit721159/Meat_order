import React from'react'
import {Link} from'react-router-dom'
import { BiSolidCategory } from "react-icons/bi";

import egg from '../images/Eggs.png'
import mutton from '../images/mutton.png'
import chicken from '../images/chicken.png'
import prawns from '../images/prawns.png'
import fish from '../images/fish.png'
import all from '../images/all.png'



const Navbar=()=>{

    let checkinproduct='Chicken'
    let Mottonproduct='Mutton'
    let Fishproduct='Fish'
    let Eggproduct='Egg'
    let Prawnsproduct='Prawns'

    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <Link class="navbar-brand" href="/">
                <img src="https://i.ibb.co/WsvhYqS/home-img-2.png" alt="" width="40" height="40" className="d-inline-block align-text-top mx-4"/>
                   MeatCenter
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                   <span class="navbar-toggler-icon"></span>
                </button> 
            </div>
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft:"200px"}}>
                    <li class="nav-item mx-3">
                        <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <BiSolidCategory/> Categories
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link class="dropdown-item" to={'/'}> <img src={all} style={{height:"40px",width:"40px",marginRight:"15px"}} alt="Error Loading.."/>All</Link></li>
                            <li><Link class="dropdown-item" to={`/Type/${checkinproduct}`}> <img src={chicken} style={{height:"40px",width:"40px",marginRight:"15px"}} alt="Error Loading.."/>Chicken</Link></li>
                            <li><Link class="dropdown-item" to={`/Type/${Mottonproduct}`}> <img src={mutton} style={{height:"40px",width:"40px",marginRight:"15px"}} alt="Error Loading.."/>Mutton</Link></li>
                            <li><Link class="dropdown-item" to={`/Type/${Fishproduct}`}> <img src={fish} style={{height:"40px",width:"40px",marginRight:"15px"}} alt="Error Loading.."/>Fish & Seafood</Link></li>
                            <li><Link class="dropdown-item" to={`/Type/${Prawnsproduct}`}> <img src={prawns} style={{height:"40px",width:"40px",marginRight:"15px"}} alt="Error Loading.."/>Prawns</Link></li>
                            <li><Link class="dropdown-item" to={`/Type/${Eggproduct}`}> <img src={egg} style={{height:"40px",width:"40px",marginRight:"15px"}} alt="Error Loading.."/>Egg</Link></li>
                        </ul>
                    </li>
                    <li class="nav-item mx-3">
                        <Link class="nav-link"  aria-current="page" to="/ProductAdd">Add</Link>
                    </li>
                    <li class="nav-item mx-3">
                        <Link class="nav-link"  aria-current="page" to="/Operation">Product</Link>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
    )
}

export default Navbar