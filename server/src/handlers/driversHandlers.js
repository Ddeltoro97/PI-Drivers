const {getAllDrivers, createDriver, getDriver, searchByName, editDriver, deleteDriver} = require("../controllers/driversControllers");

const getDriversHandler = async (req, res) =>{
   const {name} = req.query;
   
   try { 
    if(name){
        // const {driversOnDisplay} = req.body;
        const response = await searchByName(name.toLowerCase())
        res.status(200).json(response);
    }else{
        const response = await getAllDrivers()
        res.status(200).json(response);
    }

   } catch (error) {
        res.status(400).json({error: error.message});
   }
}

const createDriverHandler = async (req, res) =>{
    let {name, lastName, description, image, nationality, dob, teams} = req.body;
    if (!description) description = "No description available";
    if (!image) image = "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png";

    try {
        const response = await createDriver(name, lastName, description, image, nationality, dob, teams);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getDriverHandler = async (req, res) =>{
    const {id} = req.params;
    const created = isNaN(id) ? true : false;

    try {
        const response = await getDriver(id, created);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const editDriverHandler = async (req, res) =>{
    const {id} = req.params;
    let {name, lastName, description, image, nationality, dob, teams} = req.body;

    try {
        if (!description) description = "No description available";
        if (!image) image = "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png";

        const response = editDriver(id, name, lastName, description, image, nationality, dob, teams);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteDriverHandler = async (req, res) =>{
    const {id} = req.params;

    try {
        const response = deleteDriver(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getDriversHandler,
    createDriverHandler,
    getDriverHandler,
    editDriverHandler,
    deleteDriverHandler
}