const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')
const errorHandler = require('./middleware/error')
require('colors')

const connectDB = require('./config/db')

// Load env vars
dotenv.config({path: './config/config.env'})

//Connect to datebase
connectDB()

// Route files
const post = require('./routes/post')
const auth = require('./routes/auth')
const category = require('./routes/category')
const user = require('./routes/user')
const upload = require('./routes/upload')

const cors = require('cors')

const app = express()

// Body parser
app.use(express.json())

app.use(cookieParser())

app.use(cors());
app.options('*', cors());

if(process.env.NODE_ENV === 'development') { 
    app.use(morgan('dev'))
} 


// Mount routers
app.use('/api/v1/auth', auth)
app.use('/api/v1/post', post)
app.use('/api/v1/category', category)
app.use('/api/v1/user', user)
app.use('/api/v1/file', upload)


app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)
})