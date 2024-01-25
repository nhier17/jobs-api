const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
   name: { 
    type: String,
    required: [true, 'Please provide a name'],
    minlength: 3,
    maxlength: 50,
   },
   email: { 
    type: String,
    required: [true, 'Please provide a email'],
    match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true
   },
   password: {
    type: String,
    required: [true, 'please provide password'],
    minlength: 6,

   },

})
userSchema.pre('save', async function() {
   const salt = await bcrypt.genSalt(10);
   this.password =  await bcrypt.hash(this.password,salt)
   
})
//get user name
userSchema.methods.createJWT = function () {
return JWT.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET, {
   expiresIn: process.env.JWT_LIFETIME
})
}

//compare hashed password for successful login
userSchema.methods.comparePassword = async function (userPassword) {
const isMatch = await bcrypt.compare(userPassword, this.password)
return isMatch
}


module.exports = mongoose.model('User', userSchema)