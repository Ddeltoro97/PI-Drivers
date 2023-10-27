const {Router} = require("express");
const {getDriversHandler, createDriverHandler, getDriverHandler, editDriverHandler, deleteDriverHandler} = require("../handlers/driversHandlers")

const driverRouter = Router();

driverRouter.get("/", getDriversHandler) //All drivers or by name
driverRouter.post("/", createDriverHandler) //Create a driver
driverRouter.get("/:id", getDriverHandler) //Get with ID
driverRouter.post("/:id", editDriverHandler) //Edit driver (has to be in BD)
driverRouter.delete("/:id", deleteDriverHandler) // Delete driver

module.exports = driverRouter;