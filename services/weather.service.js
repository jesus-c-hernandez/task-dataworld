require('dotenv').config();
const axios = require('axios');

let counter = 0;

const getWeather = async(cityId, start) => {
    if( counter < 1000 ){
        const resp = await axios.get( `${process.env.OPW_DIR}id=${cityId}&type=hour&appid=${process.env.appid}&start=${start}&cnt=24`)
        counter += 1;
        return resp.data.list;
    } else {
        console.log('1K', new Date().toISOString());
    }
}

module.exports = {
    getWeather
}

