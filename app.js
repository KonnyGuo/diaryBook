const path = require('path')
const express = require('express')
const app = express()
const dotenv = require('dotenv')
//morgan for logging
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')

//confgis
dotenv.config({path: './config/.env'})
const connectDB = require('./config/db')
//passport config
require('./config/passport')(passport)

connectDB()

if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}
//handlebars
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    })
)

app.set('view engine', '.hbs')

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//static folder
// app.use(express.static('public')) //also works
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use("/", require("./routes/index"))
// app.use("/dashboard", require("./routes/index")), not needed


const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> {
    //process.env.NODE_ENV set in package.json (its either production or development)
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})


