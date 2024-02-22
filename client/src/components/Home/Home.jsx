import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getByName, getDrivers } from "../../redux/actions/actions"
import Driver from "../Driver/Driver"
import SearchBar from "../SearchBar/SearchBar"
import Pagination from "./Pagination"
import styles from "./Home.css"

export default function Home(){
    const dispatch = useDispatch();
    let allDrivers = useSelector((state) => state.allDrivers);

    const [search, setSearch] = useState({
        origin: "--Origin--",
        team: "--Team--"
    });

    const [order, setOrder] = useState("--Order--");

    let renderDrivers = allDrivers;

    if(order == "Ascending"){
        renderDrivers.sort((a, b) =>{
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
    
            if(nameA < nameB) return -1;
            if(nameB > nameA) return 1;
            return 0
        })
    }
    if(order == "Descending"){
        renderDrivers.sort((a, b) =>{
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
    
            if(nameA > nameB) return -1;
            if(nameB < nameA) return 1;
            return 0
        })
    }
    if(order == "--Order--") renderDrivers = allDrivers;
   

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
        resetPage()

    }

    const handleSearch = (event) =>{
        event.preventDefault()
        dispatch(getByName(event.target.value));
        resetPage()

    }

    const handleOrder = (event) =>{
        event.preventDefault()
        setOrder(event.target.value)
        resetPage()
    }

    useEffect(() =>{
        dispatch(getDrivers())
    }, [dispatch]);

    const [page, setPage] = useState(1);
    const [byPage, setByPage] = useState(9);

    let max = Math.ceil(finalRender.length/ byPage)

    const resetPage = () =>{
        setPage(1)
    }
   
    return (
        <div>
            <div className="bar">
             <SearchBar handleChange={handleChange} handleSearch={handleSearch} handleOrder={handleOrder} resetPage={resetPage}/>
            </div>
            <div className="container">
            {finalRender?.slice((page - 1) * byPage, (page - 1) * byPage + byPage)
            .map(driver =>
                <Driver
                    id={driver.id}
                    name={driver.name}
                    lastName={driver.lastName}
                    image={driver.image}
                    teams={driver.teams}
                    Teams={driver.Teams}/>)}
            {finalRender.length === 0  ?
            <h2 className="title">No drivers match the criteria</h2> : ""}      
            </div>
            <div className="paginationHolder">
            {max > 0 && <Pagination page={page} setPage={setPage} max={max}/>}
            </div>
           
            {/* <Pagination page={page} setPage={setPage} max={max}/> */}
        </div>
    )
}