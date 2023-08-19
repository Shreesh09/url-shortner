const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
   link: {
     type: String,
     required: true
   },
    url: {
       type: Number,
        required: true
    }
});

const url = mongoose.model("Url", urlSchema);
module.exports = url;