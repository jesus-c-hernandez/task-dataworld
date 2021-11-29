var moment = require('moment');

const asyncForEach = async(array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const formatCovidAux = (covidData) => {
  let auxCovid
  covidData.forEach((e) => {
    auxCovid = {
      date: e.date,
      dateQuery: moment(e.date).format("DD-MM-YYYY"),
      country: e.country,
      data: e.data == isNaN(e.data) || e.data == null ? 0 : e.data
    }
  })
  return auxCovid
}

const formatCovidPast = (currentData, pastData, table) => {
  let auxCovid
  currentData.forEach((e) => {
    auxCovid = {
      date: e.date,
      dateQuery: moment(e.date).format("DD-MM-YYYY"),
      country: e.country,
      data: formatDataNumber(e.data, pastData._doc.data)
    }
  })
  console.log(auxCovid.data + " - " + table);
  return auxCovid
}

const formatDataNumber = (cData, pData) => {
  if (pData && pData > 0)
    if (pData > cData)
      return (pData - cData)
    else
      return (cData - pData)
  else
    return cData
}

const mainToCode = (main) => {
  switch (main) {
    case 'Thunderstorm':
      return 1;
    case 'Drizzle':
      return 2;
    case 'Rain':
      return 3;
    case 'Snow':
      return 4;
    case 'Mist':
      return 5;
    case 'Smoke':
      return 6;
    case 'Haze':
      return 7;
    case 'Dust':
      return 8;
    case 'Fog':
      return 9;
    case 'Sand':
      return 10;
    case 'Dust':
      return 11;
    case 'Ash':
      return 12;
    case 'Squall':
      return 13;
    case 'Tornado':
      return 14;
    case 'Clear':
      return 15;
    case 'Clouds':
      return 16;
  }
  return 15;
}

module.exports = {
  asyncForEach,
  formatCovidAux,
  formatCovidPast,
  mainToCode
}