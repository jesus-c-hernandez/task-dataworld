const { Shema, model } = require('mongoose')

const WeatherSchema = Shema({
    cityId: {
        type: Integer,
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
        type: Integer,
        require: true
    },
    tempMin: {
        type: Integer,
        require: true
    },
    tempMax: {
        type: Integer,
        require: true
    },
    feelsLike: {
        type: Integer,
        require: true
    },
    windSpeed: {
        type: Integer,
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
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Weather', WeatherSchema);