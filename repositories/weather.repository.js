const Weather = require('../models/weather.model')

const createWeather = async (auxWeather) => {
    try {
        const weather = new Weather({...auxWeather});
        const weatherDb = await weather.save();
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    createWeather
}