const {Team} = require("../db");

const getAllTeams = async () =>{
    const allTeams = await Team.findAll();
    return allTeams
}

module.exports = {
    getAllTeams
}