const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/92674a5322014daed51e61740e1fe22d/' + latitude + ',' + longitude
    //url is shorthand way to write
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Server not connected.', undefined)
        } else if (body.error) {
            callback('location not found', undefined)
        } else {
            callback(undefined,
                body.daily.data[0].summary + ' It is currently ' +
                body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + '. There is a ' + body.currently.precipProbability +'% chance of rain.'

            )
        }
    })
}

module.exports = forecast