const Joi = require("@hapi/joi");

const authSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required(),
    
    password : Joi.string().min(2).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

module.exports = {authSchema}