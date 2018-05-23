const express = require("express");
const port = 3000;
var path = require('path');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', express.static(path.join(__dirname, '/../public')));

let houses = new Map();


houses.set("house1", [{ name: "Livingroom", temperature: 21.7, humidity: 40.6 }, { name: "Bathroom", temperature: 18, humidity: 50 }, { name: "Bedroom", temperature: 25, humidity: 45.5 }, { name: "Kitchen", temperature: 22, humidity: 60.3 }]);
houses.set("house2", [{ name: "Livingroom", temperature: 20, humidity: 55 }, { name: "Bathroom", temperature: 18, humidity: 40.9 }, , { name: "Office", temperature: 14.4, humidity: 63 }, { name: "Hallway", temperature: 12.5, humidity: 55 }, { name: "Garage", temperature: 15, humidity: 70 }, { name: "Bedroom", temperature: 25, humidity: 45.5 }, { name: "Kitchen", temperature: 22, humidity: 60.3 }]);
houses.set("house3", [{ name: "Livingroom", temperature: 18.3, humidity: 60 }, { name: "Bathroom", temperature: 18, humidity: 59.3 }, { name: "Bedroom", temperature: 20.1, humidity: 54 }, { name: "Kitchen", temperature: 19.7, humidity: 55.5 }, { name: "Kidsroom", temperature: 22, humidity: 60.3 }]);


app.get("/homes/:houseNumber/data",function  (req,res){
    let house = req.params.houseNumber;
    let  rooms = houses.get(house);  
    res.json(rooms);
})

app.listen(port, () => console.log(`Server is listening on port ${port}!`));