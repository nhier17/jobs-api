const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')



const register = async (req,res) => {
const user = await User.create({ ...req.body })
const token = user.createJWT();
res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token })
}

const login = async (req,res) => {
    //initial checking
const { email, password } = req.body;
if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
}
// check for the user
const user = await User.findOne({ email })
//compare password
if (!user) {
    throw new UnauthenticatedError('Invalid email')
}

const isPasswordCorrect = await user.comparePassword(password)

if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Incorrect password')
}
// if user exists create token
const token = user.createJWT();
res.status(StatusCodes.OK).json({user: {name:user.name},token })


}
module.exports = {
    register,
    login,
}