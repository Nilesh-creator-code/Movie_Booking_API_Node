const mongoose = require('mongoose');

/**
 * 
 *  Define the schema of theatre resources to be stored in the db
 *  
 */

const theatreScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    address: String
}, {timestamps: true});

const Theatre = mongoose.model("Theatre", theatreScheme);

module.exports = Theatre;