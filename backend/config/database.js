const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false); // or true, depending on your needs


const connectDatabase = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connectDatabase;

