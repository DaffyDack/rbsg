/* eslint-disable @typescript-eslint/no-require-imports */
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

const generatejwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  })
}

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('не верный логин или пароль!'))
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.badRequest('Такой пользователь уже существует!'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassword })
    // const admins = await Admins.create({ userId: user.id })
    const token = generatejwt(user.id, user.email, user.role)

    return res.json({ token })
  }
  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return next(ApiError.internal('пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Пароль не верный'))
    }
    const token = generatejwt(user.id, user.email, user.role)
    return res.json({ token })
  }
  async check(req, res) {
    const token = generatejwt(req.user.id, req.user.email, req.user.role)
    return res.json({ token })
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params // id ожидают в params, например /user/123
      const deletedCount = await User.destroy({ where: { id } })
      if (deletedCount === 0) {
        return res.status(404).json({ message: 'Пользователь не найден' })
      }
      return res.json({ message: 'Пользователь удалён' })
    } catch (e) {
      next(e)
    }
  }

  async fetchUzers(req, res) {
    const users = await User.findAll()
    return res.json(users)
  }
}

module.exports = new UserController()
