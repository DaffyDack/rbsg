/* eslint-disable @typescript-eslint/no-require-imports */

const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)

module.exports = router
