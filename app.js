const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName
const apiKey = "1a22ff2a52993390ca19c9cb344da0e8"
const units = "imperial"
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const description = weatherData.weather[0].description;

        const temp = weatherData.main.temp;

        const icon = weatherData.weather[0].icon;

        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<h1>The temperature in " + query + " is " + temp + ".</h1>");

        res.write("<h2>The weather description is " + description + ".</h2>");

        res.write("<img src=" + imageUrl + ">")

        res.status(200).send();
    });
});
});






app.listen(3000, function () {
    console.log("Server running on port 3000.");
});