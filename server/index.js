/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config()
const express = require('express')
const connectHistory = require('connect-history-api-fallback')
const sequelize = require('./db')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const modules = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const routes = require('./routes/index')
const path = require('path')

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', routes)
app.use(connectHistory())

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Стартанул бэк на порту ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
