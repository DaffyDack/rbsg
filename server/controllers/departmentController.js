/* eslint-disable @typescript-eslint/no-require-imports */
const { fn, col, where, Op } = require('sequelize')
const { Department, Posts } = require('../models/models')

let codeLength = 0
let numberOfDashes = 0

async function checkIfDepartmentExists(nameDepartment) {
  try {
    const existingDepartment = await Department.findOne({
      where: {
        department: {
          [Op.eq]: nameDepartment,
        },
      },
    })
    console.log(existingDepartment, 'Он же блять существует!!!!!!')
    if (existingDepartment) {
      return existingDepartment.id
    } else {
      return null
    }
  } catch (error) {
    console.error('Ошибка при проверке существования "nameDepartment":', error)
    throw error
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
  let test = generateLenghtCode.map((record) => record.code)
  let maxCode = generateLenghtCode
    .map((record) => record.code)
    .map((code) => {
      const parts = code.split('-')
      const lastPart = parts[parts.length - 1]
      return isNaN(lastPart) ? 0 : parseInt(lastPart, 10)
    })
    .reduce((max, current) => Math.max(max, current), -Infinity)
  if (maxCode === -Infinity) {
    maxCode = 0
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
  async fetchPosts(req, res) {
    const posts = await Posts.findAll()
    return res.json(posts)
  }
  async deleteDepartmentsByCode(req, res) {
    try {
      const { codeDelete } = req.body
      const deletedCount = await Department.destroy({
        where: {
          code: {
            [Op.like]: `${codeDelete}%`, // Условие для удаления
          },
        },
      })
      return res.json(deletedCount)
    } catch (error) {
      console.log('что то с удалением департаментом не то', error)
    }
  }

  async changeInfoDepartment(req, res) {
    try {
      const { id, fullname, department_description, participants, department } = req.body
      const nameDepartment = await checkIfDepartmentExists(department)
      console.log(nameDepartment, 'смена отдела', id, department)
      let updatedCount = null
      if (nameDepartment !== id && nameDepartment !== null) {
        updatedCount = { name: 'Такой отдел уже есть' }
      } else {
        updatedCount = await Department.update(
          {
            fullname: fullname, // Новое значение для колонки info
            department_description: department_description, // Новое значение для колонки code
            participants: participants, // Новое значение для колонки info
            department: department, // Новое значение для колонки info
          },
          {
            where: {
              id: id, // Условие для поиска записи по id
            },
          },
        )
      }

      return res.json(updatedCount)
    } catch (error) {
      console.error('Ошибка при обновлении записи:', error)
    }
  }
}

module.exports = new DepartmentController()
