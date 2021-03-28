const request = require('request')

const forecast = ( lat, long , callback) => {

    const url = `http://api.weatherstack.com/current?access_key=7dee4b3e9bd8ae7229b85e06a5b4944d&query= ${lat},${long}&units=f`

    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined , 
                `It is ${body.current.weather_descriptions[0]}`
                )
        }
    })
}


module.exports = forecast



////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const request = require('request')

// const forecast = ( lat, long , callback) => {

//     const url = `http://api.weatherstack.com/current?access_key=7dee4b3e9bd8ae7229b85e06a5b4944d&query= ${lat},${long}&units=f`

//     request({url:url , json:true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to location services', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location. Try another search', undefined)
//         } else {
//             callback(undefined , 
//                 `It is ${response.body.current.weather_descriptions[0]}`
//                 )
//         }
//     })
// }


// module.exports = forecast