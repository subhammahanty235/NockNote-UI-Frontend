const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/NockNotes_User?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const connectToMongo = ()=>{
    mongoose.connect(mongoURI , ()=>{
        console.log("Connected Succesfully")
    })
}
module.exports = connectToMongo;