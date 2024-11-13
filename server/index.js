const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = process.env.PORT || 3001;
const {fetchInfo} = require('./src/utils.js');

conn.sync({ force: false }).then(() => {
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
})
})
.then(() =>{
  fetchInfo();
})
.catch(error => console.error(error))
