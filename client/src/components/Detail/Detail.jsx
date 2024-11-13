import axios from "axios"
import {useTypewriter, Cursor} from 'react-simple-typewriter';
import { useState, useEffect } from "react";
import {useParams, useNavigate} from 'react-router-dom';
import { NavLink } from "react-router-dom";
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

    const handleDelete = async() =>{

        const confirmation = window.confirm("Are you sure you would like to delete this driver?")
        if(confirmation){
            await axios.delete(`http://localhost:3001/drivers/${id}`)
            navigate("/home");
        }
    }

    const fullName = `${driver.name} ${driver.lastName}` 

    const [text] = useTypewriter({
        words: [fullName],
        loop: {},
        typeSpeed: 120,
        deleteSpeed: 120
    })

    return(
        <div>
            <div className="buttonHolder">
            <button onClick={goBack} className="button">Go Back</button>
            <div>
            {driver.created? (<NavLink to={`/edit/${id}`} >
                <button className="button">Edit Driver</button>
                </NavLink>
            ): ("")}
            {driver.created? (<button onClick={handleDelete} className="dButton">Delete Driver</button>
            ): ("")}
            </div>
          
            </div>
            <div className="detailHolder">
                <div className="mainInfo">
                    <div className="nameInfo">
                        <h2 className="text">{text}</h2>
                        
                    </div>
                    <img src={driver.image} onError={addDefault} className="dImage" />
                    <h2 className="description">{driver.dob}</h2>
                    <h2 className="description">{driver.nationality}</h2>

                </div>

                <div className="moreInfo">
                    <h1>Teams</h1>
                    <h2 className="description">{renderTeams}</h2>
                    <h1>Description</h1>
                    <h2 className="description">{driver.description}</h2>
                </div>
            </div>
        </div>
    )

}