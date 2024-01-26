require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const connectDB = require('./db/connect')
const authentificateUSer = require('./middleware/authentification')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')


const authRouter = require('./Routes/auth')
const jobsRouter = require('./Routes/jobs')
app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, // limit each ip to 100 requests per window
}))

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())



app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',authentificateUSer, jobsRouter)
app.use(errorHandlerMiddleware)
app.use(notFound)



const port = process.env.PORT || 3001;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
app.listen(port, () => console.log(`server is listening on port ${port}....`))
    } catch (error) {
        console.log(error)
    }
}
start();



