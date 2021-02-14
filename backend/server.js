const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
const db = require("./models");

//in dev only:
if(process.env.MODE === "dev"){
    let run = require('./data');
    db.sequelize.sync({
        force: true
    }).then(() => {
        console.log("Drop and re-sync db.");
        run();
    });
}else{
    db.sequelize.sync();
}


//simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to my app"
    });
});

//set post, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});