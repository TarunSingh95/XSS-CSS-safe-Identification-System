const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017", {
    dbName: "login",
    useNewUrlParser : true
}).then(() => {
    console.log("Connected to Mongo")
}).catch((err) => {
    console.log(err.message)
})

mongoose.connection.on("connected", () => {
    console.log("Connected to DB")
})

mongoose.connection.on("error", (err) => {
    console.log(err)
})

mongoose.connection.on("disconnected", () => {
    console.log("Mongo is disconnected")
})

process.on("SIGINT", async () => {
    await mongoose.connection.close()
    proccess.exit(0)
})

