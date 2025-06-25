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
