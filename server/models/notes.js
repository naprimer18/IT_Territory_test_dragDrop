  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notes = new Schema({
    name: String,
    isDone: Boolean
});

module.exports = mongoose.model('Notes', Notes);