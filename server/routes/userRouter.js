/* eslint-disable @typescript-eslint/no-require-imports */
const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.get('/users', userController.fetchUzers)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.delete('/delete/:id', userController.delete)

module.exports = router
