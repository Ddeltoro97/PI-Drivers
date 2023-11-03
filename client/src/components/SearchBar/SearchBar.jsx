import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import { getTeams } from "../../redux/actions/actions"

export default function SearchBar({handleChange, handleSearchName}){

    const dispatch = useDispatch()
    const allTeams = useSelector((state) => state.allTeams);

    useEffect(() =>{
        dispatch(getTeams())
    }, [dispatch])

    const navigate = useNavigate()
    const goToCreate = () =>{
        navigate("/create")
    }

    console.log(allTeams);

    return (
        <div>
            <form onChange={handleChange}>
            <input placeholder="Search Driver" type="search"/>

                <select>
                    <option>--Origin--</option>
                    <option>DB</option>
                    <option>API</option>
                </select>
                <select>
                    <option>--Team--</option>
                    {allTeams?.map(team =>{
                        return(
                        <option>{team.name}</option>
                        )
                    })}
                </select>

                <button type="submit" onClick={handleSearchName}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
            </form>
            <button onClick={goToCreate}>Create New Driver</button>
        </div>
    )
}