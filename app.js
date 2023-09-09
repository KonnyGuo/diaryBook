const express = require('express')
const app = express()
const dotenv = require('dotenv')
//morgan for logging
const morgan = require('morgan')
const exphs = require('express-handlebars')

//confgis
dotenv.config({path: './config/.env'})
const connectDB = require('./config/db')

if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

//handlebars
app.engine('.hbs', exphs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
    })
)

app.set('view engine', '.hbs')

connectDB()

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> {
    //process.env.NODE_ENV set in package.json (its either production or development)
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})



