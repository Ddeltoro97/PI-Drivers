import axios from 'axios'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import style from "./Create.css"
import {getTeams } from '../../redux/actions/actions';

export default function Create(){

    const dispatch = useDispatch();
    const allTeams = useSelector((state) => state.allTeams);

    useEffect(() =>{
        dispatch(getTeams())
    }, [dispatch]);

    //BUTTONS
    const navigate = useNavigate()

    const handleSubmit = async() =>{
        const dob = `${date.year}-${date.month}-${date.day}`
        await axios.post('http://localhost:3001/drivers', {
            name: name,
            lastName: lastName,
            description: description,
            image: image,
            nationality: nationality,
            dob: dob,
            teams: teams
        })

        navigate("/home"); 
        return
    }

    const handleCancel = () =>{
        const confirmation = window.confirm("Are you sure you would like to cancel the creation of this driver?")
        if(confirmation){
            navigate("/home");
        }
    }

    const handleClear = () =>{
        setName("")
        setLastName("")
        setImage("")
        setNationality("")
        setTeams([])
        setDescription("")
        setDate({
            day: "",
            month: "",
            year: ""
        })
        
    }

    //SETTINGS FOR THE NAMES
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleName = (event) =>{
        setName(event.target.value);
    }
    const handleLastName = (event) =>{
        setLastName(event.target.value);
    }

    //SETTINGS FOR THE NATIONALITY
    const [nationality, setNationality] = useState("");

    const handleNationality = (event) =>{
        setNationality(event.target.value)
    }

    //SETTINGS FOR THE IMAGE

    const [image, setImage] = useState("");

    const handleImage = (event) =>{
        setImage(event.target.value);
    }

    //SETTINGS FOR THE DATE

    const [date, setDate] = useState({
        day: "",
        month: "",
        year: ""
    })

    const handleDate = (event) =>{
        setDate({
            ...date,
            [event.target.name]: event.target.value
        })
    }

    const months = [1, 2 ,3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    let currentMonth = currentDate.getMonth() + 1
    let currentDay = currentDate.getDate()


   let years = [];
   let index = 0;
   for(let i = 1900; i < currentYear + 1; i++){
    years[index] = i;
    index = index + 1;
   }
   years = years.reverse();

   let days = [];
   for (let i = 0; i < 28; i++){
    days[i] = i + 1;
   }

   const dateChecker = () =>{
    if (currentYear == date.year && currentMonth < date.month){
        return true;
    }
    if(currentYear == date.year && currentMonth == date.month  && currentDay < date.day){
        return true;
    }
    return false;
   }

   //SETTINGS FOR THE TEAMS
   const [teams, setTeams] = useState([]);
   
   const handleTeams = (event) =>{
        if (event.target.value === '--Select Teams--') return
        if(teams.includes(event.target.value)) return
        setTeams([
            ...teams, event.target.value        
        ])
   }

   const removeTeam = (teamRemove) =>{
        const newTeams = teams.filter(team => team != teamRemove);
        setTeams(newTeams);
   }

   //SETTINGS FOR THE DESCRIPTION
   const [description, setDescription] = useState("");

   const handleDescription = (event) =>{
        setDescription(
            event.target.value
        )
   }

//    console.log(nationality)
    return(
        <div>
            
            <h2>Name</h2>
            <input type="text" value={name} onChange={handleName}/>

            <h2>Last Name</h2>
            <input type="text" value={lastName} onChange={handleLastName}/>

            <h2>Image URL</h2>
            <input type="text" value={image} onChange={handleImage} />

            <h2>Nationality</h2>
            <input type="text" value={nationality} onChange={handleNationality} />

            <h2>Date Of Birth</h2>
            {dateChecker()? 
            <h4>Please select a valid date</h4> : ""}
           
            <div>
            <select name='year' onChange={handleDate}>
                    <option>Year</option>
                    {years.map(year =>{
                        return(
                            <option>{year}</option>
                        )
                    })}
                </select>
            <select name='month' onChange={handleDate}>
                    <option>Month</option>
                    {months.map(month =>{
                        return(
                            <option>{month}</option>
                        )
                    })}
                </select>
                <select name='day' onChange={handleDate}>
                    <option>Day</option>
                    {days.map(day =>{
                        return(
                            <option>{day}</option>
                        )
                    })}
                    {date.month != '2' || date.year % 4 == "0" ? 
                    <option>29</option> : ""}
                    {date.month != '2' ?
                    <option>30</option> : ""}
                    {date.month != '2' && date.month != '4' && date.month != '6' && date.month != '9' && date.month != '11' ? 
                    <option>31</option> : ""}
                </select>
               
            
            </div>

            <h2>Teams</h2>
                <select name='team' onChange={handleTeams}>
                    <option>--Select Teams--</option>
                    {allTeams.map(team =>{
                        return(
                            <option>{team.name}</option>
                        )
                    })}
                </select>
                <div className='teamsHolder'>
                    {teams.map(team =>{
                        return(
                            <a onClick={() => removeTeam(team)}>{team}</a>
                        )
                    })}
                </div>

                <h2>Description</h2>
                <textarea className='descriptionContainer' value={description} onChange={handleDescription}></textarea>
                <hr />

            <button onClick={handleCancel}>Cancel</button>        
            <button onClick={handleClear}>Clear</button>
            <button onClick={handleSubmit} disabled={isNaN(date.month) || isNaN(date.year) || isNaN(date.day) || !date.month || !date.year || !date.day || dateChecker() || !name || !lastName}>Create Driver</button>
            
                
        </div>
    )
}