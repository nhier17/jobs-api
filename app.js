require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')


const authRouter = require('./Routes/auth')
const jobsRouter = require('./Routes/jobs')


app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)
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



