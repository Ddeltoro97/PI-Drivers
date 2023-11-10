import { useNavigate } from "react-router-dom"
import styles from "./Driver.css"

export default function Driver(props){
    const {id, name, lastName, image, teams, Teams} = props;
    const navigate = useNavigate();

    const loadDetail = () =>{
        navigate(`/driver/${id}`)
    }


    let renderTeams = "";

    if (typeof(teams) == "string"){
        renderTeams = teams.split(",");
        renderTeams = renderTeams.join(", ")
    } 

    if(Teams){
        let arrayTeams = Teams.map(team => team.name)
        renderTeams = arrayTeams.join(", ");
    }


    
    const addDefault = (event) =>{
        event.target.src = "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png"
    }

    return(
        <div className="card" onClick={loadDetail}>
            <div className="nameHolder">
                <h2 className="name">{name}</h2>
                <h2 className="name">{lastName}</h2>
            </div>

            <div className="picContainer">
                <img src={image} onError={addDefault} className="driverPic"/>
            </div>
            
            <div className="teamContainer">
                <h2>{renderTeams}</h2>
            </div>
        </div>
    )
}