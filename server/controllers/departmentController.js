/* eslint-disable @typescript-eslint/no-require-imports */
const { fn, col, where, Op } = require('sequelize')
const { Department } = require('../models/models')

let codeLength = 0
let minLength = 0
let maxLength = 0
let numberOfDashes = 0

async function checkIfDepartmentExists(nameDepartment) {
  try {
    const existingAdmin = await Department.findOne({
      where: {
        department_affiliation: {
          [Op.eq]: nameDepartment, // Проверка на равенство
        },
      },
    })
    return existingAdmin !== null // Возвращаем true, если запись найдена, иначе false
  } catch (error) {
    console.error('Ошибка при проверке существования "nameDepartment":', error)
    throw error // Обработка ошибки
  }
}

async function generateNewCode(parentCode) {
  const existingDepartment = await Department.findOne({
    where: {
      [Op.and]: [
        {
          code: {
            [Op.like]: `${parentCode}-%`,
          },
        },
        {
          [Op.and]: [
            {
              code: {
                [Op.regexp]: `^[^-]*(-[^-]*){${numberOfDashes}}[^-]*$`,
              },
            },
            where(fn('LENGTH', col('code')), {
              [Op.gte]: codeLength,
              [Op.lte]: codeLength,
            }),
          ],
        },
      ],
    },
    order: [['code', 'DESC']],
  })
  let newCode
  console.log(numberOfDashes, 'смотрим длинну -')
  if (existingDepartment) {
    const lastCode = existingDepartment.code
    const parts = lastCode.split('-')
    const lastNumber = parseInt(parts.pop(), 10)
    const incrementedNumber = lastNumber + 1
    parts.push(incrementedNumber)
    newCode = parts.join('-')
    console.log(
      lastNumber,
      'Смотрим последнее число',
      lastCode,
      parts,
      newCode,
      'длинна',
      numberOfDashes,
    )
  } else {
    newCode = `${parentCode}-0`
  }
  return newCode
}

class DepartmentController {
  async creadetDepartment(req, res) {
    try {
      const {
        fullname,
        department,
        post,
        department_description,
        department_affiliation,
        code,
        participants,
      } = req.body
      codeLength = code.length + 2
      minLength = code.length
      maxLength = code.length + 3
      numberOfDashes = code.split('-').length
      //   const nameDepartment = await checkIfDepartmentExists(department_affiliation)
      //   if (nameDepartment)
      //   console.log(nameDepartment)
      const newCode = await generateNewCode(code)
      const type = await Department.create({
        fullname,
        department,
        post,
        department_description,
        department_affiliation,
        code: newCode,
        participants,
      })
      return res.json(type)
    } catch (error) {
      console.log('что то с департаментом не то', error)
    }
  }
  async fetchDepartment(req, res) {
    const department = await Department.findAll()
    return res.json(department)
  }
}

module.exports = new DepartmentController()
