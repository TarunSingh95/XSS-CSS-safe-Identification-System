const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
// require("./Helper/init_redis");
const helmet = require('helmet');
const csrf = require("csurf");

const User = require("./Models/user.model");
require("./Helper/init_mongo");
const RegisterRoute = require("./Routes/auth.route");
const cookieParser = require("cookie-parser");

// Middlewares
app.use(helmet());
  app.use(cors({
      origin: "http://localhost:3000",
      credentials: true
  }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// const csrfProtection = csrf({ cookie: true })

// app.get('/csrf', (req, res, next) => {
//     res.send("H")
    // res.json({ csrfToken: req.csrfToken() })
    // next()
//   })
// Routes
// app.use("/api", csrfProtection, RegisterRoute);
app.use("/api", RegisterRoute);


app.listen(8080, () => {
    console.log("Listening on port 8080")
})