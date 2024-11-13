import axios from 'axios'
import { useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getTeams, getDrivers } from '../../redux/actions/actions';
import style from "./Edit.css"

export default function Edit(){

    const {id} = useParams()

    if(!isNaN(id)) return(<h2>404 Not Found</h2>)

    const dispatch = useDispatch();
    const allTeams = useSelector((state) => state.allTeams);
    const allDrivers = useSelector((state) => state.allDriversCopy)

    useEffect(() =>{
        dispatch(getTeams())
        dispatch(getDrivers())
    }, [dispatch]);

    const driverInfo = allDrivers.find(driver => driver.id == id);
    console.log(driverInfo)

    //BUTTONS
    const navigate = useNavigate()

    const handleSubmit = async() =>{
        const dob = `${date.year}-${date.month}-${date.day}`
        await axios.post(`pi-drivers-production-47f5.up.railway.app/drivers/${id}`, {
            name: name,
            lastName: lastName,
            description: description,
            image: image,
            nationality: nationality,
            dob: dob,
            teams: teams
        })

        navigate(`/driver/${id}`); 
        return
    }

    const handleCancel = () =>{
        const confirmation = window.confirm("Are you sure you would like to cancel the editing of this driver?")
        if(confirmation){
            navigate(`/driver/${id}`);
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
    const [name, setName] = useState(driverInfo.name);
    const [lastName, setLastName] = useState(driverInfo.lastName);

    const handleName = (event) =>{
        setName(event.target.value);
    }
    const handleLastName = (event) =>{
        setLastName(event.target.value);
    }

    //SETTINGS FOR THE NATIONALITY
    const [nationality, setNationality] = useState(driverInfo.nationality);

    const handleNationality = (event) =>{
        setNationality(event.target.value)
    }

    //SETTINGS FOR THE IMAGE

    const [image, setImage] = useState(driverInfo.image);

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

    const months = ["01", "02" ,"03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

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

   const days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"];

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

   const teamsAux = driverInfo.Teams.map(team => team.name)
   const [teams, setTeams] = useState(teamsAux);
   
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
   const [description, setDescription] = useState(driverInfo.description);

   const handleDescription = (event) =>{
        setDescription(
            event.target.value
        )
   }

//    console.log(nationality)
    if(!driverInfo) return (<h2>404 Not found</h2>)
    return(
        <div className='thisHolder'>
            <div className='createContainer'>  
                <h2 className='relevance'>Edit Driver:</h2>
                <h2>Image Preview</h2>
                <img className='previewImage' src={image} alt="Upload a valid image to see preview" /> 
                <h2>Image URL</h2>
                <input type="text" className='searchUrl' value={image} onChange={handleImage} />                 
            </div>

            <div className='theOtherContainer'>
            <h2>Name*</h2>
            <div className='error'>
            {name.startsWith(" ") ? 
            <h2>This is not a valid name</h2> : " "}
            </div>
            <input type="text" className='search' value={name} onChange={handleName}/>
            <h2>Last Name*</h2>
            <div className='error'>
                
            {lastName.startsWith(" ") ? 
            <h2>This is not a valid last name</h2> : " "}
            </div>
            
            <input type="text" className='search' value={lastName} onChange={handleLastName}/>
            <h2>Nationality*</h2>

            <div className='error'>
            {nationality.startsWith(" ") ? 
            <h2>This is not a valid nationality</h2> : " "}
            </div>
            <input type="text" className='search' value={nationality} onChange={handleNationality} />

            <h2>Date Of Birth*</h2>
            <div className='error'>
            {dateChecker()? 
            <h2>Please select a valid date</h2> : ""}
            </div>
           
           
            <div>
            <select name='year' className='scroll' onChange={handleDate}>
                    <option>Year</option>
                    {years.map(year =>{
                        return(
                            <option>{year}</option>
                        )
                    })}
                </select>
            <select name='month' className='scroll' onChange={handleDate}>
                    <option>Month</option>
                    {months.map(month =>{
                        return(
                            <option>{month}</option>
                        )
                    })}
                </select>
                <select name='day' className='scroll' onChange={handleDate}>
                    <option>Day</option>
                    {days.map(day =>{
                        return(
                            <option>{day}</option>
                        )
                    })}
                    {date.month != '02' || date.year % 4 == "0" ? 
                    <option>29</option> : ""}
                    {date.month != '02' ?
                    <option>30</option> : ""}
                    {date.month != '02' && date.month != '04' && date.month != '06' && date.month != '09' && date.month != '11' ? 
                    <option>31</option> : ""}
                </select>
               
            
            </div>

            <h2>Teams</h2>
                <select name='team'className='scroll' onChange={handleTeams}>
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
                            <a className='teamName' onClick={() => removeTeam(team)}>{team}</a>
                        )
                    })}
                </div>

                <h2>Description</h2>
                <textarea className='descriptionContainer' value={description} onChange={handleDescription}></textarea>
                <hr />
            <div>
            <button className= "dButton"onClick={handleCancel}>Cancel</button>        
            <button className='button' onClick={handleClear}>Clear</button>
            <button className='button' onClick={handleSubmit} disabled={isNaN(date.month) || isNaN(date.year) || isNaN(date.day) || !date.month || !date.year || !date.day || dateChecker() || !name || !lastName || name.startsWith(" ") ||lastName.startsWith(" ") ||nationality.startsWith(" ") || !nationality }>Edit Driver</button>

            </div>
            </div>
         
            
                
        </div>
    )
}