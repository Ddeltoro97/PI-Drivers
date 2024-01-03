const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = process.env.PORT || 3001;
const {getTeamsFromApi} = require('./src/utils.js');

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
})
.then(() =>{
  getTeamsFromApi();
})
.catch(error => console.error(error))
