/* eslint-disable @typescript-eslint/no-require-imports */
const { Op } = require('sequelize')
const { Department } = require('../models/models')

async function generateNewCode(parentCode) {
  // Проверяем, существует ли код
  const existingUser = await Department.findOne({
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

class DepartmentController {
  async creadetDepartment(req, res) {
    try {
      const { fullname, department, post, department_description, department_affiliation, code } =
        req.body
      const newCode = await generateNewCode(code)
      const type = await Department.create({
        fullname,
        department,
        post,
        department_description,
        department_affiliation,
        code: newCode,
      })
      return res.json(type)
    } catch (error) {
      console.log('что то с департаментом не то')
    }
  }
  async fetchDepartment(req, res) {
    const department = await Department.findAll()
    return res.json(department)
  }
}

module.exports = new DepartmentController()
