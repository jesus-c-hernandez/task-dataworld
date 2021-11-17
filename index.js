require("dotenv").config();
let dayjs = require('dayjs')
const moment = require('moment');
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
let initTask = false;
let now;
let date;
let dateDelAux;
let dateDel;
let start;

let ciudadesAux;

// let start = dayjs.unix(date); //Tuesday, November 10, 2020 1:00:00 AM
let counter = 1;

const initWeather = async() => {
  // Obtener el arreglo de las ciudades
  await asyncForEach(ciudades, async(city) => {

    console.log(counter);
    counter += 1;
    console.log(city.name);
    // Hacer la peticion al API Open Weather
    const listWeather = await getWeather(city.id, start);

    // // Guardar los datos en db
    await saveWeather(city.id, city.name, city.country, listWeather);

    await delWeather(city.id, dateDel);
  });
  counter = 0;
  // 86400 seg = 1 dia
  // start += 86400;
  // if (start > 1605747600) { // Thursday, November 19, 2020 1:00:00 AM
  //   console.log("Tarea finalizada", new Date().toISOString());
  //   Job.stop();
  // }
};

const initDate = () => {
  if(!initTask){
    now = dayjs(new Date('2021 11 20 01:00:00')).subtract(6, 'h').format('YYYY-MM-D HH:mm:ss');
    initTask = true;
  } else {
    now = dayjs(new Date(now)).add(1, 'day').format('YYYY-MM-D HH:mm:ss');
  }
  date = dayjs(new Date(now)).subtract(365 - 4, 'day').format('YYYY-MM-D HH:mm:ss');
  dateDelAux = dayjs(new Date(date)).subtract(8, 'day').format('YYYY-MM-D HH:mm:ss');
  dateDel = new Date(dateDelAux);
  start = parseInt((new Date(date).getTime() / 1000).toFixed(0));
}

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

const test = async () => {
  // ciudadesAux = await ciudades.findIndex( c => c.name === "General Iázaro Cárdenas" );
  ciudadesAux = await ciudades.slice( 1390 );

  console.log('CIU', ciudadesAux);
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
    initDate();
    // await test();
    await initWeather();
    // await initCovid();
    Job.start();
    console.log("Tarea finalizada", new Date().toISOString());
  } catch (error) {
    console.log(new Date(), error);
  }
});

Job.start();