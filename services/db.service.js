require('dotenv').config()
var dayjs = require('dayjs')
const { asyncForEach } = require('../utils/utils')
const { createWeather } = require('../repositories/weather.repository')

const saveWeather = async(cityId, name, country, weatherList) => {

  await asyncForEach(weatherList, async(weather) => {
    console.log('WT1', weather);
    let date = dayjs.unix(weather.dt).toDate();
    date = dayjs(date).format('YYYY-MM-DD hh:mm:ss');
    console.log('DATE', date);
    const auxWeather = {
      cityId: cityId,
      cityName: name,
      country: country,
      date: date,
      temp: Math.round(weather.main.temp - 273),
      tempMin: Math.round(weather.main.temp_min - 273),
      tempMax: Math.round(weather.main.temp_max - 273),
      feelsLike: Math.round(weather.main.feels_like - 273),
      windSpeed: weather.wind.speed, // meter/sec
      windDeg: weather.wind.deg, // degrees (meteorological)
      weatherMain: weather.weather[0].main
    }
    await createWeather(auxWeather);
  });
}

module.exports = {
  saveWeather
}