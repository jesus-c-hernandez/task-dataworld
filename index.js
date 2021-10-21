require('dotenv').config();
const CronJob = require('cron').CronJob
const { cityList } = require('./city-list/city-list.json')
const { asyncForEach } = require('./utils/utils')
const { dbConnection } = require('./database/config');
const { getWeather } = require('./services/weather.service');
const { saveWeather } = require('./services/db.service')

let isDBOnline = false;
let start = 1603584000;

const initWeather = async () => {
    // Obtener el arreglo de las ciudades
    await asyncForEach( cityList, async (city) => {
        // Hacer la peticion al API Open Weather
        const listWeather = await getWeather(city.id, start);

        // Guardar los datos en db
        await saveWeather(city.id, city.name, city.country, listWeather);
    })
    // 86400 seg = 1 dia
    start += 86400;
}

const initDB = async () => {
    // Database connection
    await dbConnection();
}

// Pone el valor de cada ciclo según la config, si no lo pone cada 60segs
const seconds = Number(process.env.LOOP_EVERY_SECONDS)
	? Number(process.env.LOOP_EVERY_SECONDS)
	: 60

    // * * * * * * = 1 segundo
const stringTimes = {
	60: '* * * * *',
	30: '*/30 * * * * *',
	120: '*/2 * * * *',
	15: '*/15 * * * * *',
	20: '*/20 * * * * *',
	1: '*/1 * * * * *',
}

// 0 1 * * * cada dia a la 1am
// */15 * * * * cada 15 minutos
// */2 * * * * cada 2 minutos
const Job = new CronJob( '* * * * * *' , async () => {
	try {
        console.log('Tarea iniciada');
        if(!isDBOnline) {
            await initDB();
            isDBOnline = true;
        }
		Job.stop()
        await initWeather();
		Job.start()
	} catch (error) {
		console.log(new Date(), error)
	}
})

Job.start()




