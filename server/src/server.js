const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors({
    origin: "http://pi-drivers-7es2b64g6-ddeltoro97s-projects.vercel.app",}
));

server.use(router);

module.exports = server;
