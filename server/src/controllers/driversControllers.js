const axios = require ("axios");
const {Driver, Team} = require ("../db");
const {infoCleaner, simpleCleaner} = require("../utils")


const getAllDrivers = async () =>{
    const driversDB = await Driver.findAll();
    const {data} = await axios.get("http://localhost:5000/drivers");

    const driversApi = await infoCleaner(data);

    return[...driversDB, ...driversApi];
}

const searchByName = async (name) =>{
    const allDrivers = await getAllDrivers();
    const filteredDrivers = allDrivers.filter((driver) => {
        return (
            driver.name.toLowerCase().startsWith(name) || driver.lastName.toLowerCase().startsWith(name)
        )
    })
    
    let aux = 0;
    if (filteredDrivers.length < 15){
        aux = filteredDrivers.length
    } else{
        aux = 15;
    }
    if (aux === 0) return "No driver was found with this name"

    let first15 = [];
    for(let i = 0; i < aux; i++){
        first15.push(filteredDrivers[i]);
    }
    return first15;
}

const getDriver = async (id, created) =>{
    if (created){
        const driver = await Driver.findOne({where:{id: id}, include: {model: Team}});
        return driver;
    } else{
        const {data} = await axios.get(`http://localhost:5000/drivers/${id}`);
        const driver = simpleCleaner(data)
        return driver;
    }
}

const createDriver = async (name, lastName, description, image, nationality, dob, teams) =>{
    const driver = await Driver.create({name, lastName, description, image, nationality, dob, created: true});

    for (let i = 0; i < teams.length; i++){
        await driver.addTeam(teams[i]);
    }

    return driver
}

const editDriver = async(id, name, lastName, description, image, nationality, dob, teams) => {
    if (!isNaN(id)) return ("This can't be done")

    const driver = {
        name: name,
        lastName: lastName,
        description: description,
        image: image,
        nationality: nationality,
        dob: dob,
        created: true
    }
   

    const updatedDriver = await Driver.update(driver, {where: {id: id}, returning: true});
    const driverInstance = await Driver.findByPk(id);
    driverInstance.setTeams([]);

    for(let i = 0; i < teams.length; i++){
        driverInstance.setTeams(teams[i]);
    }

    return updatedDriver;
}

const deleteDriver = async(id) =>{
    if (!isNaN(id)) return ("This can't be done")
    const driver = await Driver.findByPk(id);
    return await driver.destroy()
}


module.exports = {
    getAllDrivers,
    createDriver,
    getDriver,
    searchByName,
    editDriver,
    deleteDriver
}