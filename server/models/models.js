/* eslint-disable @typescript-eslint/no-require-imports */

const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
  firstname: { type: DataTypes.STRING, defaultValue: 'firstName' },
  lastname: { type: DataTypes.STRING, defaultValue: 'lastName' },
  patronymic: { type: DataTypes.STRING, defaultValue: 'patronymic' },
  gender: { type: DataTypes.STRING, defaultValue: 'gender' },
  department: { type: DataTypes.STRING, defaultValue: 'department' },
  company: { type: DataTypes.STRING, defaultValue: 'company' },
  positions: { type: DataTypes.STRING, defaultValue: 'position' },
  locations: { type: DataTypes.STRING, defaultValue: 'location' },
  jobfunctions: { type: DataTypes.STRING, defaultValue: 'JobFunctions' },
  mobilephone: { type: DataTypes.STRING, defaultValue: 'mobilePhone' },
  workphone: { type: DataTypes.STRING, defaultValue: 'workPhone' },
  telegram: { type: DataTypes.STRING, defaultValue: 'telegram' },
  datebirth: { type: DataTypes.STRING, defaultValue: 'dateBirth' },
  img: { type: DataTypes.STRING, allowNull: false },
})

const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Admins = sequelize.define('admins', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Admins)
Admins.belongsTo(User)

module.exports = { User, Type, Admins }
