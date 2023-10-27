const {Router} = require("express");
const {getAllTeamsHandler} = require("../handlers/teamsHandlers");

const teamRouter = Router();

teamRouter.get("/", getAllTeamsHandler)

module.exports = teamRouter;