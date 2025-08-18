/* eslint-disable @typescript-eslint/no-require-imports */
const { fn, col, where, Op } = require('sequelize')
const { Department } = require('../models/models')

let codeLength = 0
let minLength = 0
let maxLength = 0
let numberOfDashes = 0

// async function generateLenghtCode(parentCode) {
//   const existingDepartment = await Department.findAll({
//     where: {
//       [Op.and]: [
//         {
//           code: {
//             [Op.like]: `${parentCode}-%`,
//           },
//         },
//         {
//           [Op.and]: [
//             {
//               code: {
//                 [Op.regexp]: `^[^-]*(-[^-]*){${numberOfDashes}}[^-]*$`,
//               },
//             },
//           ],
//         },
//       ],
//     },
//     order: [['code', 'DESC']],
//   })
//   if (existingDepartment.length === 0) return '0-0'
//   const maxCode = existingDepartment
//     .map((record) => record.code) // Получаем массив кодов
//     .map((code) => {
//       const parts = code.split('-')
//       const lastPart = parts[parts.length - 1] // Извлекаем последнюю часть

//       // Проверяем, является ли последняя часть числом
//       return isNaN(lastPart) ? 0 : parseInt(lastPart, 10) // Если не число, возвращаем 0
//     })
//     .reduce((max, current) => Math.max(max, current), -Infinity) // Находим максимальное значение
//   let newCode
//   let newTest = (parentCode += `-${maxCode}`)
//   return newCode
// }

async function checkIfDepartmentExists(nameDepartment) {
  try {
    const existingDepartment = await Department.findOne({
      where: {
        department: {
          [Op.eq]: nameDepartment, // Проверка на равенство
        },
      },
    })
    return existingDepartment !== null // Возвращаем true, если запись найдена, иначе false
  } catch (error) {
    console.error('Ошибка при проверке существования "nameDepartment":', error)
    throw error // Обработка ошибки
  }
}

async function generateNewCode(parentCode) {
  const generateLenghtCode = await Department.findAll({
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
          ],
        },
      ],
    },
    order: [['code', 'DESC']],
  })

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
  let test = generateLenghtCode.map((record) => record.code)
  let maxCode = generateLenghtCode
    .map((record) => record.code) // Получаем массив кодов
    .map((code) => {
      const parts = code.split('-')
      const lastPart = parts[parts.length - 1] // Извлекаем последнюю часть

      // Проверяем, является ли последняя часть числом
      return isNaN(lastPart) ? 0 : parseInt(lastPart, 10) // Если не число, возвращаем 0
    })
    .reduce((max, current) => Math.max(max, current), -Infinity)
  if (maxCode === -Infinity) {
    maxCode = 0 // Или любое значение по умолчанию, которое Вы хотите использовать
  }
  let par = parentCode
  let newTest = (par += `-${maxCode}`)
  console.log(newTest, 'Узнаем само большое последнее число в 0-0-11', maxCode, test)
  let newCode
  console.log(numberOfDashes, 'смотрим длинну -')

  const lastCode = newTest
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
  // if (existingDepartment) {
  //   const lastCode = existingDepartment.code
  //   const parts = lastCode.split('-')
  //   const lastNumber = parseInt(parts.pop(), 10)
  //   const incrementedNumber = lastNumber + 1
  //   parts.push(incrementedNumber)
  //   newCode = parts.join('-')
  //   console.log(
  //     lastNumber,
  //     'Смотрим последнее число',
  //     lastCode,
  //     parts,
  //     newCode,
  //     'длинна',
  //     numberOfDashes,
  //   )
  // } else {
  //   newCode = `${parentCode}-0`
  // }
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
      const nameDepartment = await checkIfDepartmentExists(department)
      let type = null
      console.log(nameDepartment)
      if (nameDepartment) {
        type = { name: 'Такой отдел уже есть' }
      } else {
        const newCode = await generateNewCode(code)
        type = await Department.create({
          fullname,
          department,
          post,
          department_description,
          department_affiliation,
          code: newCode,
          participants,
        })
      }
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
