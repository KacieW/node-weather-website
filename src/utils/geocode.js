
const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FjaWUxIiwiYSI6ImNqdmU3bGwwOTBsbDc0NHBseGQybHd5ZjkifQ.AR5s4b5jVm4EnIj_PeArmQ'

    request({url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to service!', undefined)
        }else if(response.body.features.length==0){
            callback('Unable to find the location.', undefined)
        }else{
            //callback(error, data),这是callback参数的形式
            callback(undefined, {
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                locations: response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode