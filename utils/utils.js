var moment = require('moment');

const asyncForEach = async(array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const formatCovidAux = (covidData) => {
  const auxCovid = {
    date: covidData.date,
    dateQuery: moment(covidData.date).format("DD-MM-YYYY"),
    country: covidData.country,
    data: covidData.data
  }
  return auxCovid
}

const formatCovidPast = (currentData, pastData, table) => {
  const auxCovid = {
    date: currentData.date,
    dateQuery: moment(currentData.date).format("DD-MM-YYYY"),
    country: currentData.country,
    data: formatDataNumber(currentData.data, pastData.data, table)
  }
  return auxCovid
}

const formatDataNumber = (cData, pData, table) => {
  if (pData && pData > 0)
    return (cData - pData)
  else
    return cData
}

const mainToCode = (main) => {
  switch(main) {
    case 'Thunderstorm': return 1;
    break;
    case 'Drizzle': return 2;
    break;
    case 'Rain': return 3;
    break;
    case 'Snow': return 4;
    break;
    case 'Mist': return 5;
    break;
    case 'Smoke': return 6;
    break;
    case 'Haze': return 7;
    break;
    case 'Dust': return 8;
    break;
    case 'Fog': return 9;
    break;
    case 'Sand': return 10;
    break;
    case 'Dust': return 11;
    break;
    case 'Ash': return 12;
    break;
    case 'Squall': return 13;
    break;
    case 'Tornado': return 14;
    break;
    case 'Clear': return 15;
    break;
    case 'Clouds': return 16;
    break;
  }
  return 15;
}

module.exports = {
  asyncForEach,
  formatCovidAux,
  formatCovidPast,
  mainToCode
}