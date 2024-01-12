import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommonHome from './CommonHome'
import loader from "../images/loader.gif"

const SearchProduct =()=>{
    let type=useParams('type').type
   
    return(
        <>
            {
                <CommonHome type={type}/>
            }
        </>
    )
}
export default SearchProduct