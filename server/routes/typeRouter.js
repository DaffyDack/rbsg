/* eslint-disable @typescript-eslint/no-require-imports */
const Router = require('express')
const router = new Router()
const typeController = require('../controller/')

router.post('/', typeController.create)
// router.get('/', typeController.getAll)

module.exports = router
