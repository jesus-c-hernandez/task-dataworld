require('dotenv').config();
const axios = require('axios');

const getWeather = async(cityId, start) => {
        const resp = await axios.get( `${process.env.OPW_DIR}id=${cityId}&type=hour&appid=${process.env.appid}&start=${start}&cnt=24`)
        return resp.data.list;
}

module.exports = {
    getWeather
}

