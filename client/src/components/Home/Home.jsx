import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getByName, getDrivers } from "../../redux/actions/actions"
import Driver from "../Driver/Driver"
import SearchBar from "../SearchBar/SearchBar"
import styles from "./Home.css"

export default function Home(){
    const dispatch = useDispatch();
    let allDrivers = useSelector((state) => state.allDrivers);

    const [search, setSearch] = useState({
        origin: "--Origin--",
        team: "--Team--"
    });


    let renderDrivers = allDrivers;
    if(search.origin == "--Origin--") renderDrivers = allDrivers;
    if(search.origin == "DB") renderDrivers = allDrivers.filter(driver => driver.created == true);
    if(search.origin == "API") renderDrivers = allDrivers.filter(driver => driver.created != true);

    let finalRender = renderDrivers
    if(search.team == "--Team--"){
        finalRender = renderDrivers;
    } else{
        finalRender = [];
        for (let i = 0; i < renderDrivers.length; i++){
            if(isNaN(renderDrivers[i].id)){
                let aux = renderDrivers[i].Teams
                // console.log(aux)
                if(aux){
                    for(let j = 0; j < aux.length; j++){
                       if(aux[j].name == search.team){
                        finalRender.push(renderDrivers[i])
                        break;
                       } 
                    }
                }
            }else{
                let aux = renderDrivers[i].teams
                // console.log("List of teams", aux)
                // console.log("Team to find", search.team)
                if(aux){
                   let newAux = aux.split(",").map(team => team.trim());
                //    console.log(newAux)
                   if (newAux.includes(search.team)){
                    finalRender.push(renderDrivers[i]);
                   }
                }
            }
        }
    }

    


    const handleChange = (event) =>{
        event.preventDefault();
        setSearch({
            ...search,
            [event.target.name]: event.target.value
        });
    }

    const handleSearch = (event) =>{
        event.preventDefault()
        dispatch(getByName(event.target.value));
    }


    useEffect(() =>{
        dispatch(getDrivers())
    }, [dispatch]);

    console.log(finalRender)
    // console.log(finalRender[0].Teams)
    // console.log(finalRender[1].teams)
    // console.log(search);

    return (
        <div>
            <div>
            </div>
            <SearchBar handleChange={handleChange} handleSearch={handleSearch}/>
            <div className="container">
            {finalRender?.map(driver =>
                <Driver
                    id={driver.id}
                    name={driver.name}
                    lastName={driver.lastName}
                    image={driver.image}
                    teams={driver.teams}
                    Teams={driver.Teams}/>)}
            {finalRender.length === 0  ?
            <h2>No drivers match the criteria</h2> : ""}      
            </div>
        </div>
    )
}