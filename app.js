require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

app.get('/', (req,res) => {
    res.send('<h1>my jobs</h1>')
})

app.use(errorHandlerMiddleware)
app.use(notFound)


const port = process.env.PORT || 3001;

const start = async () => {
    try {
app.listen(port, () => console.log(`server is listening on port ${port}....`))
    } catch (error) {
        console.log(error)
    }
}
start();



