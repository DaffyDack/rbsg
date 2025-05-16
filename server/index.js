/* eslint-disable @typescript-eslint/no-require-imports */

require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const modules = require('./models/models')
const cors = require('cors')
const routes = require('./routes/index')

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'WORKING!!' })
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
