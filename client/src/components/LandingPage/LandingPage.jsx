import { useNavigate } from "react-router-dom"
import styles from "./LandingPage.css";

export default function LandingPage(){

    const navigate = useNavigate();

    const goHome = () =>{
        navigate("/home");
    }

    return(
        <div className="container">
            <div className="marginHaver">
                <h1>The Ultimate F1 Drivers API</h1>
                <button onClick={goHome}> Click here to get started</button>
            </div>
            
            <img src="https://p1.hiclipart.com/preview/678/441/84/ferrari-f2008-red-red-and-black-f1-car-png-clipart.jpg" alt="" />

        </div>
    )
}