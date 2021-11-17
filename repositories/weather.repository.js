const Weather = require('../models/weather.model')
const ObjectID = require('mongodb').ObjectID
const { asyncForEach } = require("../utils/utils");


const createWeather = async(auxWeather) => {
  try {
    const weather = new Weather({...auxWeather });
    await weather.save();
  } catch (error) {
    console.log(error);
  }

}

const deleteWeather = async (cityId, date) => {
  const weathers = await Weather.find(
    { cityId: cityId, 
      date:  { "$lt": new Date(`${date}`).toISOString()}
    })

  await asyncForEach( weathers, async(weather) => {
    try {
      const weatherId = ObjectID(weather._doc._id).toString();
      await Weather.deleteOne({ _id: weatherId});
    } catch (error) {
      console.log(error);
    }
  })
  return;
}

module.exports = {
  createWeather,
  deleteWeather
}