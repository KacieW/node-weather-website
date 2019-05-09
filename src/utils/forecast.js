const request = require('request')

const forecast=(latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/92674a5322014daed51e61740e1fe22d/'+latitude+','+longitude
//url is shorthand way to write
    request({url, json:true},(error, {body})=>{
        if(error){
            callback('Server not connected.', undefined)
        }else if(body.error){
            callback('location not found', undefined)
        }else{
            callback(undefined, {
                temperature:body.currently.temperature,
                precip:body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast