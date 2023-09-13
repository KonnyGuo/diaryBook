const path = require('path')
const express = require('express')
const app = express()
const dotenv = require('dotenv')
//morgan for logging
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')
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

//body parser, extended true to take in arrays, not needed this time
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//handlebar helpers
const {formatDate, stripTags, truncate} = require("./helpers/hbs")

//handlebars
app.engine('.hbs', exphbs.engine({
    helpers: {
        formatDate,
        stripTags,
        truncate
    },
    defaultLayout: 'main',
    extname: '.hbs',
    })
)

app.set('view engine', '.hbs')

//middlewares are functions that have access to req, res objects
//session middleware(needs to be above passport middleware)
//order important because passport session look for session manager attach to req which express-session does to look up user from db
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//static folder
// app.use(express.static('public')) //also works
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/stories", require("./routes/stories"))


// app.use("/dashboard", require("./routes/index")), not needed


const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> {
    //process.env.NODE_ENV set in package.json (its either production or development)
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})


