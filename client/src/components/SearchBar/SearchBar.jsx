import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTeams } from "../../redux/actions/actions"

export default function SearchBar({handleChange, handleSearch}){

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
            
            <input name="name" placeholder="Search Driver"  type="search" onChange={handleSearch}></input>


                <select name="origin" onChange={handleChange}>
                    <option>--Origin--</option>
                    <option>DB</option>
                    <option>API</option>
                </select>
                <select name="team" onChange={handleChange}>
                    <option>--Team--</option>
                    {allTeams?.map(team =>{
                        return(
                        <option>{team.name}</option>
                        )
                    })}
                </select>

            
            <button onClick={goToCreate}>Create New Driver</button>
        </div>
    )
}