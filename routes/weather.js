const express = require("express");
const router = express.Router();
const logger = require("../logger/logger");
const { default: axios } = require("axios");
require('dotenv').config();

router.get("/weather/:city", async (req, res) => {

    const city = req.params.city;
    console.log(city)

    if(!city){
        logger.log({level:'error', message: 'No city provided'})
        return res.status(400).json({Error: "No city provided"})
    }

    const apiKey = process.env.WEATHER_API;
    const api_call = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    axios.get(api_call)
    .then((response) =>{
        const weatherCondition = response.data.weather[0].description;
        const weather = {
            'WeatherConditions': response.data.weather[0].description,
            'TemperatureLow': response.data.main.temp_min,
            'TemperatureHigh': response.data.main.temp_max
        }
        logger.log({level:'info', message:`Found ${city}`})
        res.send(weather)
        // // res.send(response.data)
        // console.log(response.data.main.temp_max)
    })
    .catch((error) => {
        console.log(error);
        logger.log({level: 'error', message:'Error fetching user data'})
        res.status(500).json({error: `Error fetching weather data.`});
    })
})

module.exports = router