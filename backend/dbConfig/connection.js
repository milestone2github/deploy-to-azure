const mongoose = require("mongoose");
require('dotenv').config()


const connetToTransactionsDb = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URI}/mftransactiondb`)
        if (connect) {
            console.log("Connected to MfTransactions DB");
        }
        else {
            throw new Error("MfTransactions DB connection failed")
        }
    } catch (error) {
        console.log("MfTransactions DB connection failed: ", error.message);
        process.exit(1);
    }
}


module.exports = { connetToTransactionsDb };