const axios = require('axios');
require('dotenv').config();
// const FilterPropertiesService = require('./filter-properties.service.js')

let config = {
  headers: {
    'Authorization': 'Bearer ' + process.env.API_KEY_COVID
  }
}

class CovidService {
  async getTodayCases(country) {
    // console.log(currentWeather);
    const resp = await axios.get(`https://gateway.nubentos.com/nubentos.com/ncovapi/2.0.0/todayCases?country=${country}`, config)
      // console.log(resp);
    return resp.data;
  }

  async getTodayDeaths(country) {
    // console.log(currentWeather);
    const resp = await axios.get(`https://gateway.nubentos.com/nubentos.com/ncovapi/2.0.0/todayDeaths?country=${country}`, config)
      // console.log(resp.data);
    return resp.data;
  }
}

module.exports = new CovidService()