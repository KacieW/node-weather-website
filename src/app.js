const express = require('express')//it is a function
const path = require('path')

const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public')) //change file path directory

const app = express()

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');//这个path包含了public文件夹里的所以文件
const viewsPath = path.join(__dirname, '../templates/views')//自定义view文件夹
const partialsPath = path.join(__dirname, '../templates/partials')//建立一个可以共享的小的template

//setup handlerbars engine and views location
app.set('view engine', 'hbs');//which template engin you installed. Get handlerbar to set up.
app.set('views', viewsPath)//告诉需要用哪个文件夹
hbs.registerPartials(partialsPath)//告诉他partical在哪里

//setup static directory to serve
app.use(express.static(publicDirectoryPath))//.use is to custmise your server




//app.com
app.get('', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather APP',
        name: 'AGF'
    })//render views
})

//setup a route for home page. (route, callback function)
// app.get('', (req, res)=>{
//     //send back html
//     res.send('<h1>Weather</h1>')
// })

//app.com/help
// app.get('/help', (req, res)=>{
//     //send back Obj, json, array
//     res.send({
//         name:'AB',
//         age:27
//     })
// })
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is help text',
        title: 'Help',
        name: 'sdfs'
    })
})

//app.com/about
// app.get('/about', (req, res)=>{
//     res.send('<h1>About</h1>')
// })
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'sdfw'
    })
})

//链接json和api
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is needed'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, locations }={}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location: locations,
                address: req.query.address
            })

        })
    })

    // res.send({
    //     forecast:'It is sunny',
    //     location:'Orlando',
    //     address:req.query.address
    // })
})
//app.com/weather
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 error',
        name: 'adsf',
        errorMessage: 'Help page not found'
    })
})

//error page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 errror',
        name: 'adsf',
        errorMessage: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on '+port)
}) //start the server