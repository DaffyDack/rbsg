<script setup lang="ts">
import './style.scss'
import { ref, watch, onMounted } from 'vue'
import { useCounterStore } from '../../stores/counter'
import { useUsersStore } from '../../stores/users'
const storeUsers = useUsersStore()
const store = useCounterStore()

onMounted(() => {
  console.log(storeUsers.user, form.value)
})

interface Form {
  email: string
  password: string
}

interface Errors {
  email: string
  password: string
}
const registeredUser = ref<boolean>(false)
const form = ref<Form>({
  email: '',
  password: '',
})

const errors = ref<Errors>({
  email: '',
  password: '',
})

watch(
  () => [form.value.email, form.value.password],
  () => {
    if (form.value.email != '') {
      checkEmail(form.value.email)
    }
    if (form.value.password) {
      checkLength('password', form.value.password, 1, 15)
    }
  },
)

function checkLength(err: 'password', input: string, min: number, max: number) {
  if (input.length < min) {
    if (err == 'password') {
      errors.value.password = 'меньше чем надо'
    }
  } else if (input.length > max) {
    if (err == 'password') {
      errors.value.password = 'Больше чем надо'
    }
  } else {
    if (err == 'password') {
      errors.value.password = ''
    }
  }
}
function checkEmail(input: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (re.test(input.trim())) {
    errors.value.email = ''
  } else {
    errors.value.email = 'Не корректный Email'
  }
}

const validateForm = () => {
  if (!form.value.email) {
    errors.value.email = 'Email обязательно'
  }
  if (!form.value.password) {
    errors.value.password = 'Пароль обязателен'
  }
}

function isEmpty(obj: Record<string, string>) {
  let a = true
  for (const [key, value] of Object.entries(obj)) {
    console.log(value, value == '', key)
    if (value == '') {
      a = true
    } else {
      a = false
      break
    }
  }
  if (a) toggleFavorite()
}
const handleSubmit = () => {
  validateForm()
  isEmpty(errors.value)
}

const toggleFavorite = () => {
  for (let index = 0; index < storeUsers.user.length; index++) {
    if (storeUsers.user[index].email === form.value.email && storeUsers.user[index].password === form.value.password) {
      registeredUser.value = false
      localStorage.setItem('test', JSON.stringify({ email: storeUsers.user[index].email, role: storeUsers.user[index].role }));
      store.registrationCompleted()
    } else {
      registeredUser.value = true
    }
  }

}
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-control" :class="{ error: errors.email, success: !errors.email && form.email != '' }">
        <label for="emailAuto">Email</label>
        <input type="email" v-model="form.email" id="emailAuto" placeholder="Введите email" />
        <small v-if="errors.email">{{ errors.email }}</small>
      </div>
      <div class="form-control" :class="{ error: errors.password, success: !errors.password && form.password != '' }">
        <label for="passwordAuto">Пароль</label>
        <input type="password" v-model="form.password" id="passwordAuto" placeholder="Введите пароль" />
        <small v-if="errors.password">{{ errors.password }}</small>
      </div>
      <div v-if="registeredUser" class="text-red-600">Не правельный email или пароль</div>
      <button type="submit">Отправить</button>
    </form>
  </div>
</template>
