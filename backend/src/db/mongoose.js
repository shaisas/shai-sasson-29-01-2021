const mongoose = require('mongoose')

const connectionURL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';

console.log(process.env.MONGO_URI)

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})