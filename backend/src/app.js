const express = require('express')
require('./db/mongoose')
const authRouter = require('./routers/auth')
const mailRouter = require('./routers/mail')
const cors = require('cors');

const app = express()

app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(mailRouter)

module.exports = app