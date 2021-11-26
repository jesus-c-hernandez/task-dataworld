require('dotenv').config()
let dayjs = require('dayjs')
const { asyncForEach, formatCovidAux, formatCovidPast, mainToCode } = require('../utils/utils')
const { createWeather, deleteWeather } = require('../repositories/weather.repository')
const {
  createCovidCases,
  createCovidDeaths,
  createCovidActiveCasesSum,
  createCovidActiveCasesDay,
  createCovidRecoveredSum,
  createCovidRecoveredDay,
  createCovidTestSum,
  createCovidTestDay
} = require('../repositories/covid.repository')

const saveWeather = async(cityId, name, country, weatherList) => {

  await asyncForEach(weatherList, async(weather) => {
    let date = dayjs.unix(weather.dt).toDate();
    date = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
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
      weatherMain: weather.weather[0].main,
      weatherMainCode: mainToCode(weather.weather[0].main)
    }
    await createWeather(auxWeather);
  });
}

const delWeather = async(cityId, date) => {
  await deleteWeather(cityId, date);
}


const saveCovidCases = async(covidData) => {
  let newData = formatCovidAux(covidData)
  await createCovidCases(newData)
}

const saveCovidDeaths = async(covidData) => {
  let newData = formatCovidAux(covidData)
  await createCovidDeaths(newData)
}

const saveCovidActiveCasesSum = async(covidData) => {
  let newData = await formatCovidAux(covidData)
  await createCovidActiveCasesSum(newData)
}

const saveCovidActiveCasesDay = async(covidDataCurrent, covidDataPast) => {
  let newData = await formatCovidPast(covidDataCurrent, covidDataPast, 'ActiveCases')
  await createCovidActiveCasesDay(newData)
}

const saveCovidRecoveredSum = async(covidData) => {
  let newData = await formatCovidAux(covidData)
  await createCovidRecoveredSum(newData)
}

const saveCovidRecoveredDay = async(covidDataCurrent, covidDataPast) => {
  let newData = await formatCovidPast(covidDataCurrent, covidDataPast, 'RecoveredCases')
  await createCovidRecoveredDay(newData)
}

const saveCovidTestSum = async(covidData) => {
  let newData = await formatCovidAux(covidData)
  await createCovidTestSum(newData)
}

const saveCovidTestDay = async(covidDataCurrent, covidDataPast) => {
  let newData = await formatCovidPast(covidDataCurrent, covidDataPast, 'TestTotals')
  await createCovidTestDay(newData)
}

module.exports = {
  saveWeather,
  delWeather,
  saveCovidCases,
  saveCovidDeaths,
  saveCovidActiveCasesSum,
  saveCovidActiveCasesDay,
  saveCovidRecoveredSum,
  saveCovidRecoveredDay,
  saveCovidTestSum,
  saveCovidTestDay
}