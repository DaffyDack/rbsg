/* eslint-disable @typescript-eslint/no-require-imports */
const ApiError = require('../error/ApiError')

class UserController {
  async check(req, res, next) {
    const { id } = req.query
    if (!id) {
      return next(ApiError.badRequest('не передан ID'))
    }
    res.json(id)
  }
}

module.exports = new UserController()
