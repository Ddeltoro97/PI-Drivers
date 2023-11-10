import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTeams } from "../../redux/actions/actions"
import styles from "./SearchBar.css"

export default function SearchBar({handleChange, handleSearch, handleOrder}){

    const dispatch = useDispatch()
    const allTeams = useSelector((state) => state.allTeams);

    useEffect(() =>{
        dispatch(getTeams())
    }, [dispatch])

    const navigate = useNavigate()
    const goToCreate = () =>{
        navigate("/create")
    }

    return (
        <div>  
            
            <input name="name" placeholder="Search Driver"  type="search" className="search" onChange={handleSearch}></input>

            <select name="order" className="scroll" onChange={handleOrder}>
                <option>--Order--</option>
                <option>Ascending</option>
                <option>Descending</option>
            </select>
                <select name="origin" onChange={handleChange} className="scroll">
                    <option>--Origin--</option>
                    <option>DB</option>
                    <option>API</option>
                </select>
                <select name="team" onChange={handleChange} className="scroll">
                    <option>--Team--</option>
                    {allTeams?.map(team =>{
                        return(
                        <option>{team.name}</option>
                        )
                    })}
                </select>

                

            
            <button onClick={goToCreate} className="button">Create New Driver</button>
        </div>
    )
}