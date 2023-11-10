import React, { useState } from "react";

import styles from "./Home.css"

export default function Pagination({page, setPage, max}){

    const nextPage = () =>{
        setPage(page + 1)
    }

    const prevPage = () =>{
        setPage(page - 1)
    }

    return(
        <div className="flex">
        {page != 1 ? <button onClick={prevPage} className="button">Back</button> : ""}   
        <p className="page">Page {page} of {max}</p>
        {page != max ? <button onClick={nextPage} className="button">Next</button> : ""}
        
        </div>
    )
} 