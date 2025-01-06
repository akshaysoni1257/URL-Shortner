const mongoose = require('mongoose');

async function connecttoDatabase(url){
    return mongoose.connect(url);
}

module.exports = {
    connecttoDatabase
}