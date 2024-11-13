const axios = require("axios");
const {Team} = require("./db");

const fetchInfo = async () =>{
    const teamCount = await Team.count();
    if (teamCount == 0){
        await getTeamsFromApi()
    }
}


const infoCleaner = (array) => array.map(driver =>{
    return {
        id: driver.id,
        name: driver.name.forename,
        lastName: driver.name.surname,
        description: driver.description ? driver.description : "No description available",
        image: driver.image.url ? driver.image.url : "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png",
        dob: driver.dob,
        teams: driver.teams,
        created: false 
    }
})

const simpleCleaner = (driver) =>{
    return {
        id: driver.id,
        name: driver.name.forename,
        lastName: driver.name.surname,
        description: driver.description ? driver.description : "No description available",
        image: driver.image.url ? driver.image.url : "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png",
        dob: driver.dob,
        created: false,
        nationality: driver.nationality,
        teams: driver.teams
    }
}

const getTeamsFromApi = async() =>{
    try {
        const {data} = await axios("http://localhost:5000/drivers");
        let teamsArray = [];
            for(let i = 0; i < data.length; i++){
                
                if(data[i].teams){
                    let teamsByDriver = data[i].teams.split(',');
                    // console.log(teamsByDriver)

                    let cleanTeamsByDriver = []
                    for (let k = 0; k < teamsByDriver.length; k++){
                        // console.log(teamsByDriver[k].trim());
                        cleanTeamsByDriver.push(teamsByDriver[k].trim());
                    }

                    for(let j = 0; j < cleanTeamsByDriver.length; j++){
                        // console.log(teamsByDriver[i]);
                        if (!teamsArray.includes(cleanTeamsByDriver[j])){
                            // console.log(teamsByDriver[i]);
                            teamsArray.push(cleanTeamsByDriver[j]);
                        }
                    }  
                }
            }
        // console.log(teamsArray);

        const teamsAsObjects = teamsArray.map((team) =>{
            return {
                name: team
            }
        })
        // console.log(teamsAsObjects);    
        await Team.bulkCreate(teamsAsObjects);
    } catch (error) {
        console.log("Error")
    }
}

module.exports = {
    infoCleaner,
    simpleCleaner,
    getTeamsFromApi,
    fetchInfo
}