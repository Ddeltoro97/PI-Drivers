import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getByName, getDrivers } from "../../redux/actions/actions"
import Driver from "../Driver/Driver"
import SearchBar from "../SearchBar/SearchBar"
import styles from "./Home.css"

export default function Home(){
    const dispatch = useDispatch();
    const allDrivers = useSelector((state) => state.allDrivers);

    const [searchName, setSearchName] = useState("");

    const handleChange = (event) =>{
        event.preventDefault();
        setSearchName(event.target.value);
    }

    const handleSearchName = (event) =>{
        event.preventDefault()
        dispatch(getByName(searchName));
    }

    useEffect(() =>{
        dispatch(getDrivers())
    }, [dispatch]);

    return (
        <div>
            <div>
            </div>
            <SearchBar handleChange={handleChange} handleSearchName={handleSearchName}/>
            <div className="container">
            {allDrivers?.map(driver =>
                <Driver
                    id={driver.id}
                    name={driver.name}
                    lastName={driver.lastName}
                    image={driver.image}
                    teams={driver.teams}
                    Teams={driver.Teams}/>)}
            {allDrivers.length === 0  ?
            <h2>No drivers match the criteria</h2> : ""}      
            </div>
        </div>
    )
}