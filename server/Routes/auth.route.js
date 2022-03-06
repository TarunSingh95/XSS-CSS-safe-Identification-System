const express = require("express");
const router = express.Router();
const createError = require("http-errors");
// const csurf = require("csurf");
const User = require("../Models/user.model");
// const redis = require('../Helper/init_redis');
const { authSchema } = require("../Helper/user_validation");
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require("../Helper/jwt_helper");

// router.get("/test", (req, res) => {
//     // res.cookie("refresh", "New Token", {
//     //     httpOnly: true,
//     //     secure: true,
//     //     sameSite:false
//     // })
//     res.render(`<input type="text" name="_csrf" value="${req.csrfToken()}"`);
//     res.json({ csrfToken: req.csrfToken() })
    
// })

// REGISTER USER
router.post("/auth/register", async (req, res) => {
    
    try {
        // Validate the entries
        const validateUser = await authSchema.validateAsync(req.body);

        //Check if user is already registered
        const doesUserExist = await User.findOne({ username: validateUser.username });

        if (doesUserExist) throw res.json(createError.Conflict(`${validateUser.username} already exists!`))
        
        const user = new User(validateUser) 
        const saveUser = await user.save();

        res.json({ saveUser, message: "Success." });
        
    }
    catch (error) {
        if(error.isJoi === true) throw res.json({message : error.message})
        res.json({ message: error.message });
    }
})

// LOGIN USER
router.post("/auth/login", async (req, res) => {

    
    try {
        // console.log(req.body)
        const validateUser = await authSchema.validateAsync(req.body)
        
        const user = await User.findOne({ username: validateUser.username });
        if (!user) throw res.json(createError.Conflict(`Username/password is invalid.`))
        
        const isMatch = await user.isValidPassword(validateUser.password)
        if (!isMatch) throw res.json(createError.Unauthorized("Username/password is invalid"))

        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        res.cookie("refresh", refreshToken, {
            // maxAge,
            // expires
            httpOnly: true,
            secure: true,
            sameSite: false
        });

        // res.cookie("access", accessToken, {
        //     httpOnly: false,
        //     sameSite: true,
        //     secure: true
        // })

        res.json({message: "Success.", access: accessToken })
    }
    catch (error) {
        if (error.isJoi === true) throw res.json({message : error.message}).status()
        res.json({ message: error.message })
    }

})

// Welcome Route
router.get("/auth/welcome", verifyAccessToken, async (req, res) => {
    res.json({ "message": "Access Token Verified" });
})

// Any protected route
// router.get("/auth", verifyAccessToken, async (req, res) => {
//     res.send(req.payload).send(req)
//     console.log(client.GETALL())

// })

// REFRESH ROUTE: Incase the access token expires then this route will be hit.
router.get("/auth/refresh", async (req, res) => {
    try {

        // Check if refresh token is being sent by the client
        // const { token } = req.body
        const { refresh } = req.cookies;
        // console.log(req.cookies)

        if (!refresh) throw createError.BadRequest();

        // Verify the refresh token: if verified, issue a new access and refesh token and send it to the client
        const userId = await verifyRefreshToken(refresh);

        const accessToken = await signAccessToken(userId);
        const refreshToken = await signRefreshToken(userId);

        res.cookie("refresh", refreshToken, {
            // maxAge,
            // expires
            httpOnly: true,
            secure: true,
            sameSite: false
        });

        // res.cookie("access", accessToken, {
        //     httpOnly: false,
        //     sameSite: true,
        //     secure: true
        // })
        res.json({message: "Success.", access : accessToken });
        
    }
    catch (error) {
        res.json({message : error.message})
    }
})

// router.delete("/logout", (req, res) => {
//     res.clearCookie()
//     res.send("Hello")
//     console.log(req.cookies)
// })

module.exports = router;