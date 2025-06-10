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

const Admins = sequelize.define('admin', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const WorkingContacts = sequelize.define('working_contact', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  workphone: { type: DataTypes.STRING, defaultValue: 'workPhone' },
  workphone2: { type: DataTypes.STRING, defaultValue: 'workPhone2' },
  email: { type: DataTypes.STRING, defaultValue: 'email' },
  email2: { type: DataTypes.STRING, defaultValue: 'email2' },
})

const PersonalContacts = sequelize.define('personal_contact', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  workphone: { type: DataTypes.STRING, defaultValue: 'workPhone' },
  workphone2: { type: DataTypes.STRING, defaultValue: 'workPhone2' },
  homephone: { type: DataTypes.STRING, defaultValue: 'homephone' },
  email: { type: DataTypes.STRING, defaultValue: 'email' },
  email2: { type: DataTypes.STRING, defaultValue: 'email2' },
})

const JobInformation = sequelize.define('job_information', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  company: { type: DataTypes.STRING, defaultValue: 'ООО «РБС ГРУПП»' },
  post: { type: DataTypes.STRING, defaultValue: 'Генеральный директор' },
  structural_division: { type: DataTypes.STRING, defaultValue: 'Администрация' },
  company_official_combination: {
    type: DataTypes.STRING,
    defaultValue: 'The company is an official combination',
  },
  position_official_combination: {
    type: DataTypes.STRING,
    defaultValue: 'The position is an official combination',
  },
  structural_division_combination: {
    type: DataTypes.STRING,
    defaultValue: 'Structural division combination',
  },
  start_date: {
    type: DataTypes.STRING,
    defaultValue: 'Start date',
  },
  date_official_registration_company: {
    type: DataTypes.STRING,
    defaultValue: 'date_official_registration_company',
  },
})

const KnowledgeAndCertification = sequelize.define('knowledge_and_certification', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  probation_results: {
    type: DataTypes.STRING,
    defaultValue: 'Probation results',
  },
  attestation_results: {
    type: DataTypes.STRING,
    defaultValue: 'Attestation results',
  },
  test_results: {
    type: DataTypes.STRING,
    defaultValue: 'Test results',
  },
  grades_and_ranks: {
    type: DataTypes.STRING,
    defaultValue: 'Grades and ranks',
  },
})

const PassportData = sequelize.define('passport_data', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gender: {
    type: DataTypes.STRING,
    defaultValue: 'gender',
  },
  citizenship: {
    type: DataTypes.STRING,
    defaultValue: 'Citizenship',
  },
  resident_russian_ederation: {
    type: DataTypes.STRING,
    defaultValue: 'Citizenship',
  },
  passport_series_number: {
    type: DataTypes.STRING,
    defaultValue: 'passport_series_number',
  },
  unit_code: {
    type: DataTypes.STRING,
    defaultValue: 'Unit code',
  },
  date_birth: {
    type: DataTypes.STRING,
    defaultValue: 'Date of birth',
  },
  fio: {
    type: DataTypes.STRING,
    defaultValue: 'fio',
  },
  place_birth: {
    type: DataTypes.STRING,
    defaultValue: 'Place of birth',
  },
  registration_address: {
    type: DataTypes.STRING,
    defaultValue: 'Registration address',
  },
  passport_scan: {
    type: DataTypes.STRING,
    defaultValue: 'Passport scan',
  },
  history_passport_data_changes: {
    type: DataTypes.STRING,
    defaultValue: 'history_passport_data_changes',
  },
})
User.hasOne(Admins)
Admins.belongsTo(User)

module.exports = {
  User,
  Type,
  Admins,
  WorkingContacts,
  PersonalContacts,
  JobInformation,
  KnowledgeAndCertification,
  PassportData,
}
