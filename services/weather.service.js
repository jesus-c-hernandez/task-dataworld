require('dotenv').config();
const axios = require('axios');

const getWeather = async(cityId, start) => {

    // id=3981254&type=hour&appid=ae57b0f49f54af7c3ce53a9c9308949f&start=1601510400&cnt=169
    const resp = await axios.get( `${process.env.OPW_DIR}id=${cityId}&type=hour&appid=${process.env.appid}&start=${start}&cnt=24`)
    console.log(resp);

    return resp.data.list;
}

module.exports = {
    getWeather
}

