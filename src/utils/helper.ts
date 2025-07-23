type ErrorType = 'username' | 'password' | 'email' | 'startDate'
export function checkEmail(e: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (re.test(e.trim())) {
    console.log('email пустой')
    return ''
  } else {
    return 'Не корректный Email'
  }
}

export function checkLength(err: ErrorType, input: string, min: number, max: number) {
  const messages = {
    username: {
      tooShort: 'меньше чем надо',
      tooLong: 'Больше чем надо',
      valid: '',
    },
    password: {
      tooShort: 'меньше чем надо',
      tooLong: 'Больше чем надо',
      valid: '',
    },
    email: {
      tooShort: 'меньше чем надо',
      tooLong: 'Больше чем надо',
      valid: '',
    },
    startDate: {
      tooShort: 'меньше чем надо',
      tooLong: 'Больше чем надо',
      valid: '',
    },
  }

  if (input.length < min) {
    return messages[err].tooShort
  } else if (input.length > max) {
    return messages[err].tooLong
  } else {
    return messages[err].valid
  }
}

const department = [
  { name: 'Администрация', code: '0' },

  { name: 'Административный отдел', code: '0-0' },
  { name: 'Финансовый отдел', code: '0-1' },
  { name: 'Маркетинговый отдел', code: '0-2' },
  { name: 'Коммерческий отдел', code: '0-3' },

  { name: 'Отдел кадров', code: '0-0-0' },
  { name: 'Юридический отдел', code: '0-0-1' },
  { name: 'Отдел АХО', code: '0-0-2' },

  { name: 'Бухгалтерия', code: '0-1-0' },

  { name: 'IT отдел', code: '0-2-0' },
  { name: 'Отдел маркетинго', code: '0-2-1' },

  { name: 'Отдел развития', code: '0-3-0' },
  { name: 'Отдел продаж KRAFTER', code: '0-3-1' },
  { name: 'Отдел продаж листовой HPL', code: '0-3-2' },
  { name: 'Отдел продаж KRAFTER Мебель', code: '0-3-3' },
  { name: 'Отдел продаж Атэри', code: '0-3-4' },
  { name: 'Отдел продаж фурнитура', code: '0-3-5' },
  { name: 'Тендерный отдел', code: '0-3-6' },
  { name: 'Сметно-договорной отдел', code: '0-3-7' },
]
export default department
