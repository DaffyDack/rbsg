/* eslint-disable @typescript-eslint/no-require-imports */
const { Department } = require('../models/models')

class DepartmentController {
  async creadetDepartment(req, res) {
    try {
      const { fullname, department, post, department_description, department_affiliation } =
        req.body
      const type = await Department.create({
        fullname,
        department,
        post,
        department_description,
        department_affiliation,
      })
      return res.json(type)
    } catch (error) {
      console.log('что то с департаментом не то')
    }
  }
}

module.exports = new DepartmentController()
