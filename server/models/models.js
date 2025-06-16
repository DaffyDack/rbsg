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

const OtherPersonalInformation = sequelize.define('other_personal_information', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  marital_status: {
    type: DataTypes.STRING,
    defaultValue: 'marital_status',
  },
  children: {
    type: DataTypes.STRING,
    defaultValue: 'Children',
  },
  contacts_relatives: {
    type: DataTypes.STRING,
    defaultValue: 'Contacts of relatives',
  },
  change_last_names: {
    type: DataTypes.STRING,
    defaultValue: 'Change of last names (if any)',
  },
  actual_address_residence: {
    type: DataTypes.STRING,
    defaultValue: 'Actual address of residence',
  },
  index: {
    type: DataTypes.STRING,
    defaultValue: 'Children',
  },
  metro: {
    type: DataTypes.STRING,
    defaultValue: 'metro station',
  },
  inn: {
    type: DataTypes.STRING,
    defaultValue: 'inn',
  },
  snils: {
    type: DataTypes.STRING,
    defaultValue: 'snils',
  },
  dms: {
    type: DataTypes.STRING,
    defaultValue: 'dms',
  },
  driving_license: {
    type: DataTypes.STRING,
    defaultValue: 'driving_license',
  },
  education_advanced_training_courses: {
    type: DataTypes.STRING,
    defaultValue: 'Education and advanced training courses',
  },
  knowledge_languages_level: {
    type: DataTypes.STRING,
    defaultValue: 'Knowledge of languages with a level of',
  },
})

const PersonnelData = sequelize.define('personnel_data', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  personnel_documents: {
    type: DataTypes.STRING,
    defaultValue: 'Personnel documents',
  },
  signed_provisions: {
    type: DataTypes.STRING,
    defaultValue: 'Signed provisions',
  },
  employee_business_trips: {
    type: DataTypes.STRING,
    defaultValue: 'Employee business trips',
  },
  social_benefits: {
    type: DataTypes.STRING,
    defaultValue: 'Social benefits',
  },
  briefings: {
    type: DataTypes.STRING,
    defaultValue: 'Briefings',
  },
  ot_and_ob: {
    type: DataTypes.STRING,
    defaultValue: 'OT и ТБ документы',
  },
  military_registration: {
    type: DataTypes.STRING,
    defaultValue: 'Military registration',
  },
  vacations_absences: {
    type: DataTypes.STRING,
    defaultValue: 'Vacations and absences',
  },
  time_table: {
    type: DataTypes.STRING,
    defaultValue: 'Time table',
  },
})

const WorkEfficiency = sequelize.define('work_efficiency', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  kpi: {
    type: DataTypes.STRING,
    defaultValue: 'kpi',
  },
  efficiency_counter: {
    type: DataTypes.STRING,
    defaultValue: 'Efficiency Counter',
  },
  reporting: {
    type: DataTypes.STRING,
    defaultValue: 'Reporting',
  },
  violation_labor_discipline: {
    type: DataTypes.STRING,
    defaultValue: 'Violation of labor discipline',
  },
  list_explanatory_notes: {
    type: DataTypes.STRING,
    defaultValue: 'List of explanatory notes',
  },
  list_reprimands: {
    type: DataTypes.STRING,
    defaultValue: 'List of reprimands',
  },
  thanks: {
    type: DataTypes.STRING,
    defaultValue: 'Thanks',
  },
  awards_and_incentives: {
    type: DataTypes.STRING,
    defaultValue: 'Awards and incentives',
  },
  intangible_motivation: {
    type: DataTypes.STRING,
    defaultValue: 'Intangible motivation',
  },
  ratings: {
    type: DataTypes.STRING,
    defaultValue: 'Ratings',
  },
})

const HRProfile = sequelize.define('hr_profile', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  general_hr_characteristics: {
    type: DataTypes.STRING,
    defaultValue: 'general_hr_characteristics',
  },
  points_from_employees: {
    type: DataTypes.STRING,
    defaultValue: 'Points from employees',
  },
  reviews_other_employees_about_person: {
    type: DataTypes.STRING,
    defaultValue: 'Reviews of other employees about the person',
  },
  summaries_from_sites: {
    type: DataTypes.STRING,
    defaultValue: 'Summaries from the sites',
  },
  hobbies_and_interests: {
    type: DataTypes.STRING,
    defaultValue: 'Hobbies and interests',
  },
  matching_hobbies_with_employees: {
    type: DataTypes.STRING,
    defaultValue: 'Matching hobbies with employees',
  },
  personality_type: {
    type: DataTypes.STRING,
    defaultValue: 'Personality type',
  },
  psychotype: {
    type: DataTypes.STRING,
    defaultValue: 'Psychotype',
  },
  iq_test: {
    type: DataTypes.STRING,
    defaultValue: 'iq_test',
  },
  evaluation_360: {
    type: DataTypes.STRING,
    defaultValue: 'Evaluation 360',
  },
  myers_test: {
    type: DataTypes.STRING,
    defaultValue: 'The Myers Test',
  },
  professionalism: {
    type: DataTypes.STRING,
    defaultValue: 'Professionalism',
  },
  ipip_test: {
    type: DataTypes.STRING,
    defaultValue: 'test IPIP',
  },
  development_zones: {
    type: DataTypes.STRING,
    defaultValue: 'Development zones',
  },
  risks_for_company: {
    type: DataTypes.STRING,
    defaultValue: 'Risks for the company',
  },
  risks_for_employee: {
    type: DataTypes.STRING,
    defaultValue: 'Risks for the employee',
  },
  personnel_reserve: {
    type: DataTypes.STRING,
    defaultValue: 'Personnel reserve',
  },
  bad_habits: {
    type: DataTypes.STRING,
    defaultValue: 'Bad habits',
  },
  employee_feedback: {
    type: DataTypes.STRING,
    defaultValue: 'Employee feedback',
  },
})

const FinancialResponsibility = sequelize.define('financial_responsibility', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  counter_in_money_financial_responsibility: {
    type: DataTypes.STRING,
    defaultValue: 'The counter in the money of financial responsibility',
  },
  financial_responsibility_office: {
    type: DataTypes.STRING,
    defaultValue: 'Financial responsibility office',
  },
  financial_responsibility_office_equipment: {
    type: DataTypes.STRING,
    defaultValue: 'Financial responsibility office equipment',
  },
  financial_responsibility_tool: {
    type: DataTypes.STRING,
    defaultValue: 'Financial responsibility tool',
  },
  counter_in_money_financial_responsibility: {
    type: DataTypes.STRING,
    defaultValue: 'counter in money financial responsibility',
  },
  financial_responsibility_samples: {
    type: DataTypes.STRING,
    defaultValue: 'Financial responsibility samples',
  },
  corporate_taxi: {
    type: DataTypes.STRING,
    defaultValue: 'Corporate taxi',
  },
  accountable_funds: {
    type: DataTypes.STRING,
    defaultValue: 'Accountable funds',
  },
})

const SalariesAndPayments = sequelize.define('salaries_and_payments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  wages: {
    type: DataTypes.STRING,
    defaultValue: 'Wages',
  },
  recycling: {
    type: DataTypes.STRING,
    defaultValue: 'Recycling',
  },
  additional_bonuses: {
    type: DataTypes.STRING,
    defaultValue: 'Additional bonuses',
  },
  vacation_pay: {
    type: DataTypes.STRING,
    defaultValue: 'Vacation pay',
  },
  total_earnings_for_period: {
    type: DataTypes.STRING,
    defaultValue: 'Total earnings for the period',
  },
  average_earnings: {
    type: DataTypes.STRING,
    defaultValue: 'Average earnings',
  },
})

User.hasOne(Admins)
Admins.belongsTo(User)
WorkingContacts.belongsTo(User)

module.exports = {
  User,
  Type,
  Admins,
  WorkingContacts,
  PersonalContacts,
  JobInformation,
  KnowledgeAndCertification,
  PassportData,
  OtherPersonalInformation,
  PersonnelData,
  WorkEfficiency,
  HRProfile,
  FinancialResponsibility,
  SalariesAndPayments,
}
