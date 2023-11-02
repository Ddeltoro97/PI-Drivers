import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getDrivers } from "../../redux/actions/actions"
import Driver from "../Driver/Driver"
import SearchBar from "../SearchBar/SearchBar"
import styles from "./Home.css"

export default function Home(){
    const dispatch = useDispatch();
    const allDrivers = useSelector((state) => state.allDrivers);

    const [filteredUsers, setFilteredUsers] = useState(allDrivers)
    const [searchName, setSearchName] = useState("");

    const handleChange = (event) =>{
        event.preventDefault();
        setSearchName(event.target.value);
    }

    const handleSearchName = () =>{
        event.preventDefault();
        const filtered = allDrivers.filter(driver => driver.name.toLowerCase().includes(searchName.toLowerCase()))
        setFilteredUsers(filtered);
        console.log(filtered)
    }

    useEffect(() =>{
        dispatch(getDrivers())
        // return (() =>{
        //     clearDetail()
        // })
    }, [dispatch]);

    return (
        <div>
            <div>
            </div>
            <SearchBar handleChange={handleChange} handleSearchName={handleSearchName}/>
            <div className="container">
            {filteredUsers?.map(driver =>
                <Driver
                    id={driver.id}
                    name={driver.name}
                    lastName={driver.lastName}
                    image={driver.image}
                    teams={driver.teams}
                    Teams={driver.Teams}/>)}
            {filteredUsers.length === 0 ? 
            <h2>No drivers match the criteria</h2> : ""}        
            </div>
        </div>
    )
}