// eslint-disable-next-line @typescript-eslint/no-require-imports
const Router = require('express')
const router = new Router()
// eslint-disable-next-line @typescript-eslint/no-require-imports
const userRouter = require('./userRouter')

router.use('/user', userRouter)

module.exports = router
