/* eslint-disable @typescript-eslint/no-require-imports */
const { fn, col, where, Op } = require('sequelize')
const { Department } = require('../models/models')

let codeLength = 0
let minLength = 0
let maxLength = 0

async function fetchAllCodesWithLength() {
  try {
    const codesWithLength = await Department.findAll({
      attributes: [
        'code', // Получаем поле code
        [fn('LENGTH', col('code')), 'length'], // Вычисляем длину и присваиваем ей алиас 'length'
      ],
    })

    return codesWithLength
  } catch (error) {
    console.error('Ошибка при получении кодов:', error)
    throw error // Можно выбросить ошибку дальше для обработки
  }
}

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
        where(fn('LENGTH', col('code')), {
          [Op.eq]: codeLength,
          //   [Op.gte]: 6,
          //   [Op.lte]: 7,
        }),
      ],
    },
    order: [['code', 'DESC']],
  })
  let newCode

  if (existingDepartment) {
    // const lastCode = existingDepartment.code
    // const parts = lastCode.split('-')
    // const lastNumber = parseInt(parts.pop(), 10) + 1
    // parts.push(lastNumber)
    // newCode = parts.join('-')
    // console.log(newCode, 'то что получилось')
    const lastCode = existingDepartment.code
    const parts = lastCode.split('-')
    const lastNumber = parseInt(parts[parts.length - 1], 10) + 1 // Получаем последнее число без удаления из массива
    parts.pop() // Убираем последнее число из массива
    parts.push(lastNumber) // Добавляем увеличенное число обратно в массив
    newCode = parts.join('-')
    console.log(lastNumber, 'Смотрим последнее число', lastCode, parts, newCode)
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
      codeLength = code.length + 3
      minLength = code.length
      maxLength = code.length
      const nameDepartment = await checkIfDepartmentExists(department_affiliation)
      //   if (nameDepartment)
      console.log(nameDepartment)
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
