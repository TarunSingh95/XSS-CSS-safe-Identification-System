const jwt = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();
const client = require("./init_redis");

module.exports = {
   
    // Sign Access Token
    signAccessToken: (userId) => {
      
        return new Promise((resolve, reject) => {
            
            // To sign a token we need payload, secret key, expiry date, audience
            const payload = {}
            const secret = process.env.ACCESS_SECRET
            const options = {
                expiresIn: '10s',
                issuer: 'auth_server',
                audience: userId,
                jwtid: "SecretKey"
            }

            jwt.sign(payload, secret, options, ((error, token) => {
                if (error) {
                    reject(createError.InternalServerError())
                }
                resolve(token)
                
            })
            )
        })
    },

    // Verify access token for protected routes
    verifyAccessToken: (req, res, next) => {

        console.log(req.headers)
        
        // if header Authorization does not exist, then return 404
        if (!req.headers['authorization']) throw res.sendStatus(401).json(createError.Unauthorized());

        // extract the token from Header
        const token = req.headers['authorization'].split(" ")[1]
        const secret = process.env.ACCESS_SECRET;

        // verify that it is the right token
        jwt.verify(token, secret, (error, payload) => {
            if (error) {
                throw res.sendStatus(403).json(createError.Unauthorized())
            }
            req.payload = payload;
            next()
        })
    },

    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            
            const payload = {};
            const secret = process.env.REFRESH_SECRET;
            const options = {
                expiresIn: '1d',
                issuer: 'auth-server',
                audience: userId
            }

            // Sign the token
            jwt.sign(payload, secret, options, (error, token) => {
                
                if (error) {
                    reject(createError.InternalServerError())
                }

                // client.SET(userId, token, 'EX', 24 * 60 * 60, (err, reply) => {
                //     console.log(reply)
                //     if (err) {
                //         reject(createError.InternalServerError());
                //         return
                //     }
                    resolve(token)
                // } )
            })

        })
    },

    verifyRefreshToken: (token) => {
        
        return new Promise((resolve, reject) => {


            
            jwt.verify(token, process.env.REFRESH_SECRET, (error, payload) => {
                
                if (error) return reject(createError.Unauthorized())
                
                // client.GET(payload.aud, (err, result) => {
                //     if (err) {
                //         reject(createError.Unauthorized())
                //     }
                //     // If tokem verified then send back the user id which will be used to generate both access & refresh token
                //     if (token === result) {
                        resolve(payload.aud)
                        // return
                    // }
                
                // })
            })

        })
    }

}