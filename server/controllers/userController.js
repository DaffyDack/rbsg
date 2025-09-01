/* eslint-disable @typescript-eslint/no-require-imports */
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path')
const { User, Admins, WorkingContacts } = require('../models/models')

async function generateNewCode(parentCode) {
  // Проверяем, существует ли код
  const existingUser = await User.findOne({
    where: {
      code: {
        [Op.like]: `${parentCode}-%`,
      },
    },
    order: [['code', 'DESC']],
  })

  let newCode

  if (existingUser) {
    const lastCode = existingUser.code
    const parts = lastCode.split('-')
    const lastNumber = parseInt(parts.pop(), 10) + 1
    parts.push(lastNumber)
    newCode = parts.join('-')
  } else {
    newCode = `${parentCode}-0`
  }

  return newCode
}
// (async () => {
//   const newCode = await generateNewCode(parentCode);
//   console.log('Сгенерированный новый код:', newCode);
// })();

const generatejwt = (
  id,
  email,
  role,
  firstname,
  lastname,
  patronymic,
  gender,
  department,
  company,
  positions,
  locations,
  jobfunctions,
  mobilephone,
  workphone,
  telegram,
  datebirth,
  img,
  fullname,
  working_contact_workphone,
  code,
) => {
  return jwt.sign(
    {
      id,
      email,
      role,
      firstname,
      lastname,
      patronymic,
      gender,
      department,
      company,
      positions,
      locations,
      jobfunctions,
      mobilephone,
      workphone,
      telegram,
      datebirth,
      img,
      fullname,
      working_contact_workphone,
      code,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    },
  )
}

class UserController {
  async registration(req, res, next) {
    try {
      const {
        email,
        password,
        role,
        firstname,
        lastname,
        patronymic,
        gender,
        department,
        company,
        positions,
        locations,
        jobfunctions,
        mobilephone,
        workphone,
        telegram,
        datebirth,
        fullname,
        code,
      } = req.body

      const { img } = req.files // Дефолтное значение для img
      // if (!img) {
      //   return next(ApiError.badRequest('Файл не был загружен!'))
      // }

      let fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      if (!email || !password) {
        return next(ApiError.badRequest('не верный логин или пароль!'))
      }
      const candidate = await User.findOne({ where: { email } })
      if (candidate) {
        return next(ApiError.badRequest('Такой пользователь уже существует!'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const parentCode = '0-0-3'
      const newCode = await generateNewCode(code)

      const user = await User.create({
        email,
        role,
        password: hashPassword,
        firstname,
        lastname,
        patronymic,
        gender,
        department,
        company,
        positions,
        locations,
        jobfunctions,
        mobilephone,
        workphone,
        telegram,
        datebirth,
        img: fileName,
        fullname,
        code: newCode,
        jobfunctions,
      })
      await Admins.create({ userId: user.id })
      // const WC = await WorkingContacts.create({
      //   userId: user.id,
      //   workphone: workphone,
      // })
      const token = generatejwt(
        user.id,
        user.email,
        user.role,
        user.firstname,
        user.lastname,
        user.patronymic,
        user.gender,
        user.department,
        user.company,
        user.positions,
        user.locations,
        user.jobfunctions,
        user.mobilephone,
        user.workphone,
        user.telegram,
        user.datebirth,
        user.img,
        user.fullname,
        user.code,
        // WC?.workphone,
      )

      return res.json({ token })
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }
  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    const WC = await WorkingContacts.findOne({ where: { userId: user.id } })
    if (!user) {
      return next(ApiError.internal('пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Пароль не верный'))
    }
    const token = generatejwt(
      user.id,
      user.email,
      user.role,
      user.firstname,
      user.lastname,
      user.patronymic,
      user.gender,
      user.department,
      user.company,
      user.positions,
      user.locations,
      user.jobfunctions,
      user.mobilephone,
      user.workphone,
      user.telegram,
      user.datebirth,
      user.img,
      user.fullname,
      user.code,
      // WC?.workphone,
    )
    return res.json({ token })
  }
  async check(req, res) {
    const token = generatejwt(
      req.user.id,
      req.user.email,
      req.user.role,
      req.user.firstname,
      req.user.lastname,
      req.user.patronymic,
      req.user.gender,
      req.user.department,
      req.user.company,
      req.user.positions,
      req.user.locations,
      req.user.jobfunctions,
      req.user.mobilephone,
      req.user.workphone,
      req.user.telegram,
      req.user.datebirth,
      req.user.img,
      req.user.fullname,
      req.user.code,
      // req.WC?.workphone,
    )
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
