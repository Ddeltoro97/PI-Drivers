import { useNavigate } from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"

export default function SearchBar({handleChange, handleSearchName}){
    const navigate = useNavigate()
    const goToCreate = () =>{
        navigate("/create")
    }


    return (
        <div>
            <form onChange={(event) => handleChange(event)}>
            <input placeholder="Search Driver" type="search"/>

                <select>
                    <option></option>
                </select>
                <select>
                    <option></option>
                </select>

                <button type="submit" onClick={handleSearchName}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
            </form>
            <button onClick={goToCreate}>Create New Driver</button>
        </div>
    )
}