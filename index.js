var dayjs = require('dayjs')
const CronJob = require('cron').CronJob
const { cityList } = require('./city-list/city-list.json')
const { asyncForEach } = require('./utils/utils')
const { dbConnection } = require('./database/config');
const { getWeather } = require('./services/weather.service');

let isDBOnline = false;
let start = 1601510400;

const initWeather = async () => {
    // Obtener el arreglo de las ciudades
    await asyncForEach( cityList, async (city) => {
        // Hacer la peticion al API Open Weather
        const listWeather = await getWeather(city.id, start);
        console.log('OLDWEATHER', listWeather);
    })

    // Guardar los datos en db
    const date  = dayjs.unix(1601510400)
    console.log('DATE', date.toDate());
}

const initDB = async () => {
    // Database connection
    await dbConnection();
}


// * * * * * * = 1 segundo
const Job = new CronJob( '* * * * * *', async () => {
	try {
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




