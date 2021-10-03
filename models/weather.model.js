const { Schema, model } = require('mongoose')

const WeatherSchema = Schema({
    cityId: {
        type: String,
        require: true
    },
    cityName: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    temp: {
        type: Number,
        require: true
    },
    tempMin: {
        type: Number,
        require: true
    },
    tempMax: {
        type: Number,
        require: true
    },
    feelsLike: {
        type: Number,
        require: true
    },
    windSpeed: {
        type: Number,
        require: true
    },
    windDeg: {
        type: String,
        require: true
    },
    weatherMain: {
        type: String,
        require: true
    }
});

WeatherSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model( 'Weather', WeatherSchema );