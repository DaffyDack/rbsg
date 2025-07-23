/* eslint-disable @typescript-eslint/no-require-imports */
const { Type } = require('../models/models')

class TypeController {
  async create(req, res) {
    const { name } = req.body
    const type = await Type.create({ name })
    return res.json(type)
  }
}

module.exports = new TypeController()
