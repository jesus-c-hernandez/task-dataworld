const Weather = require('../models/weather.model')

const createWeather = async (auxWeather) => {
    try {
        console.log('AUX',auxWeather);
    
        const weather = new Weather({
            ...auxWeather
        });

        console.log('weather',weather);

        const weatherDb = await weather.save();
        console.log('DB', weatherDb);
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    createWeather
}