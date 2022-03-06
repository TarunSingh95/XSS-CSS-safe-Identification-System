const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// This function will run before a entry is saved into the database
// When user registers we want to save a hashed password in the DB
userSchema.pre("save", async function (next) {
    //Hash the new entry ie the new password. If any other time this model is used then do not hash the password
    // this refers to the current entry and isNew checks if its a new entry or an old entry
    try {
        if (this.isNew) {
            // Generate a salt
            const salt = await bcrypt.genSalt(10);
            // Hash the password with the help of the salt
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next()
    }
    catch (error) {
        console.log(error)
    }
})

// When user is logging in we want to hashed password stored in the DB with the password that the user entered
userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)     
        }
    catch (error) {
        console.log(error)
    }
}

const User = mongoose.model("user", userSchema);

module.exports = User