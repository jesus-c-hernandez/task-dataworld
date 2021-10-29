const axios = require('axios');
require('dotenv').config();
var moment = require('moment');
// const FilterPropertiesService = require('./filter-properties.service.js')

let config = {
  headers: {
    'Authorization': 'Bearer ' + process.env.API_KEY_COVID
  }
}

class CovidService {
  async getTodayCases(country) {
    // const resp = await axios.get(`https://gateway.nubentos.com/nubentos.com/ncovapi/2.0.0/todayCases?country=${country}`, config)
    // console.log(resp);
    const data = {
      "date": moment(new Date()), //.format("2021-10-27T10:12:00.000Z"),
      "country": country,
      "data": Math.floor(Math.random(10000, 800) * 1000)
    }
    return data;
  }

  async getTodayDeaths(country) {
    // const resp = await axios.get(`https://gateway.nubentos.com/nubentos.com/ncovapi/2.0.0/todayDeaths?country=${country}`, config)
    // console.log(resp.data);
    const data = {
      "date": moment(new Date()), //.format("2021-10-27T10:12:00.000Z"),
      "country": country,
      "data": Math.floor(Math.random(10000, 800) * 1000)
    }
    return data;
  }

  async getActiveCasesSum(country) {
    // const resp = await axios.get(`https://gateway.nubentos.com/nubentos.com/ncovapi/2.0.0/active?country=${country}`, config)
    // console.log(resp.data);
    const data = {
      "date": moment(new Date()), //.format("2021-10-27T10:12:00.000Z"),
      "country": country,
      "data": Math.floor(Math.random(10000, 800) * 1000)
    }
    return data;
  }

  async getRecoveredCases(country) {
    // const resp = await axios.get(`https://gateway.nubentos.com/nubentos.com/ncovapi/2.0.0/recovered?country=${country}`, config)
    // console.log(resp.data);
    const data = {
      "date": moment(new Date()), //.format("2021-10-27T10:12:00.000Z"),
      "country": country,
      "data": Math.floor(Math.random(10000, 800) * 1000)
    }
    return data;
  }

  async getTestTotals(country) {
    // const resp = await axios.get(`https://gateway.nubentos.com/nubentos.com/ncovapi/2.0.0/totalTests?country=${country}`, config)
    // console.log(resp.data);
    const data = {
      "date": moment(new Date()), //.format("2021-10-27T10:12:00.000Z"),
      "country": country,
      "data": Math.floor(Math.random(10000, 800) * 1000)
    }
    return data;
  }

}

module.exports = new CovidService()