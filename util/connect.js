/**
 * Load mongoose dependency
 */

const mongoose = require("mongoose");


/**
 * Connects to mongoDB server and returns new mongoose instance.
 */

module.exports.connect = mongoose.connect("mongodb+srv://admin:admin@maincluster.y8qjv.mongodb.net/users?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        console.log("Conntected to MongoDB: [USER]");
    })
    .catch(err => console.log("MongoDB Connection Error: " + err.message));