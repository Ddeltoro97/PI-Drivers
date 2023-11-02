import axios from "axios"
import { useState, useEffect } from "react";
import {useParams, useNavigate} from 'react-router-dom';
import style from "./Detail.css"


export default function Detail(){

    const {id} = useParams()
    const [driver, setDriver] = useState({});

    const navigate = useNavigate();
    const goBack = () =>{
        navigate("/home")
    }

    useEffect(() =>{
        axios(`http://localhost:3001/drivers/${id}`)
        .then(response =>{
           setDriver(response.data);
        });
        return setDriver({})
    }, [id]);

    const addDefault = (event) =>{
        event.target.src = "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png"
    }

    let renderTeams = "";
    if (driver.teams){
        renderTeams = driver.teams;
    } 

    if(driver.Teams){
        let arrayTeams = driver.Teams.map(team => team.name)
        renderTeams = arrayTeams.join(", ");
    }


    return(
        <div>
            <button onClick={goBack}>Go Back</button>
            {driver.created? (
                <button>Edit Driver</button>
            ): ("")}
            <h2>{driver.name}</h2>
            <h2>{driver.lastName}</h2>
            <img src={driver.image} onError={addDefault} />
            <h2>{driver.nationality}</h2>
            <h2>{driver.dob}</h2>
            <h2>{renderTeams}</h2>
        </div>
    )

}