const Weather = require('../models/weather.model')
const ObjectID = require('mongodb').ObjectID

const createWeather = async(auxWeather) => {
  try {
    const weather = new Weather({...auxWeather });
    await weather.save();
  } catch (error) {
    console.log(error);
  }

}

const deleteWeather = async (cityId, date) => {
  console.log('WEAREPO');
  console.log(cityId);
  console.log(date);



  const weathers = await Weather.find(
    { cityId: cityId, 
      date:  { "$gt": new Date(`${date}`).toISOString()}
    })

  console.log(weathers[0]._doc._id);

  console.log(ObjectID(weathers[0]._doc._id).toString())

  console.log('WEA', weathers);

  return;
}

module.exports = {
  createWeather,
  deleteWeather
}