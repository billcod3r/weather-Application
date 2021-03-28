const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { allowedNodeEnvironmentFlags } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for Express Config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static Directory to serve

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bill Calixte'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Bill Calixte'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: "Help is on the way",
        title: 'Help',
        name: "Bill Calixte"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }
   console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bill Calixte',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title:'404',
        name: 'Bill Calixte',
        errorMessage: 'Page not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is Up on Port 3000.')
})


