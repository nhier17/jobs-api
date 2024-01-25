const User = require('../models/user')
const JWT = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')



const auth = async (req,res,next) => {
    // check for header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentification invalid')
    }
const token = await authHeader.split(' ')[1]
try {
const payload = JWT.verify(token, process.env.JWT_SECRET)
// attach the user to the job routes
req.user = {userId: payload.userId}
next()

} catch (error) {
    throw new UnauthenticatedError('Authentification invalid')
}
}

module.exports = auth;