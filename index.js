require("dotenv").config();
let dayjs = require('dayjs')
const CronJob = require("cron").CronJob;
const { ciudades } = require("./lists/city-list.json");
const { countryList } = require("./lists/country-list.json");
const { asyncForEach } = require("./utils/utils");
const { dbConnection } = require("./database/config");
const { getWeather } = require("./services/weather.service");
const {
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
} = require("./services/db.service");
const CovidService = require("./services/covid.service");
const {
  getCovidActiveCasesDay,
  getCovidRecoveredDay,
  getCovidTestDay
} = require('./repositories/covid.repository')

let isDBOnline = false;
// let date = dayjs(new Date()).subtract(374, 'day').format('YYYY MM D HH');
let date = new Date('2020-11-19 00:00:00');

let start = 1604970000; //Tuesday, November 10, 2020 1:00:00 AM
let counter = 1;

const initWeather = async() => {
  // Obtener el arreglo de las ciudades
  await asyncForEach(ciudades, async(city) => {

    console.log(counter);
    counter += 1;
    console.log(city.name);
    // Hacer la peticion al API Open Weather
    // const listWeather = await getWeather(city.id, start);

    // // Guardar los datos en db
    // await saveWeather(city.id, city.name, city.country, listWeather);

    console.log('DATE', date);

    await delWeather(city.id, date);

  });
  counter = 0;
  // 86400 seg = 1 dia
  start += 86400;
  if (start > 1605747600) { // Thursday, November 19, 2020 1:00:00 AM
    console.log("Tarea finalizada", new Date().toISOString());
    Job.stop();
  }
};

const initCovid = async() => {
  // Obtener el arreglo de los paises
  await asyncForEach(countryList, async(country) => {
    console.log(country);
    // Hacer la peticion al API Nubentus
    const casesData = await CovidService.getTodayCases(country.name);
    const deathsData = await CovidService.getTodayDeaths(country.name);
    const activeDataSum = await CovidService.getActiveCasesSum(country.name);
    const recoveredDataSum = await CovidService.getRecoveredCases(country.name);
    const testDataSum = await CovidService.getTestTotals(country.name);

    //Traer datos de ayer desde la bd
    const activeDataYesterday = await getCovidActiveCasesDay(country.name);
    const recoveredDataYesterday = await getCovidRecoveredDay(country.name);
    const testDataYesterday = await getCovidTestDay(country.name);

    // Guardar los datos en db
    await saveCovidCases(casesData);
    await saveCovidDeaths(deathsData);
    await saveCovidActiveCasesSum(activeDataSum);
    await saveCovidActiveCasesDay(activeDataSum, activeDataYesterday);
    await saveCovidRecoveredSum(recoveredDataSum);
    await saveCovidRecoveredDay(recoveredDataSum, recoveredDataYesterday);
    // console.log();
    await saveCovidTestSum(testDataSum);
    await saveCovidTestDay(testDataSum, testDataYesterday);
    // console.log();
  });
};

const initDB = async() => {
  // Inicializar la base de datos
  await dbConnection();
};

const test = () => {
  console.log(ciudades[4845]);
  console.log(ciudades[4846]);
  console.log(ciudades[4847]);

}

// Pone el valor de cada ciclo según la config, si no lo pone cada 60segs
const seconds = Number(process.env.LOOP_EVERY_SECONDS) ?
  Number(process.env.LOOP_EVERY_SECONDS) :
  60;

// * * * * * * = 1 segundo
const stringTimes = {
  60: "* * * * *",
  30: "*/30 * * * * *",
  120: "*/2 * * * *",
  15: "*/15 * * * * *",
  20: "*/20 * * * * *",
  1: "*/1 * * * * *"
};

const Job = new CronJob(stringTimes[seconds], async() => {
  try {
    console.log('Inicio de tarea', new Date());
    if (!isDBOnline) {
      await initDB();
      isDBOnline = true;
    }
    Job.stop();
    // test();
    await initWeather();
    // await initCovid();
    Job.start();
    console.log("Tarea finalizada", new Date().toISOString());
  } catch (error) {
    console.log(new Date(), error);
  }
});

Job.start();