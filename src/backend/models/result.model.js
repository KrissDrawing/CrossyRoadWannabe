const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    username: String,
    result: Number,
})

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
