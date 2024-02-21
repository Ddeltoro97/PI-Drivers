import { useNavigate } from "react-router-dom"
import axios from "axios";
import styles from "./LandingPage.css";

export default function LandingPage(){

    const navigate = useNavigate();

    const goHome = () =>{
        navigate("/home");

    }

    return(
        <div className="Lcontainer">
            <div className="marginHaver">
                <h1 className="title">The Ultimate F1 Drivers API</h1>
                <button className="button"onClick={goHome}> Click here to get started</button>
            </div>
            

        </div>
    )
}