const express = require('express')
const database = require('./database.js')
const cors = require('cors')
const path = require('path')
const api = require('./router/api')
const website = require('./router/website')
const hbs = require('hbs')
const app = express()



app.use(cors())
app.use(express.static(path.join(__dirname, './public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.use('/api', api)
app.use('/', website)
database.connectDB()


app.listen('4000', () => { console.log('server live at http://localhost:4000') })