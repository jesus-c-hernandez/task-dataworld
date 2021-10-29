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

module.exports = {
  asyncForEach,
  formatCovidAux,
  formatCovidPast
}