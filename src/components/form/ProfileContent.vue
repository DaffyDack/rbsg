<script setup lang="ts">
import { ref, watch, defineEmits, computed } from 'vue'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import Password from 'primevue/password'
import Calendar from 'primevue/calendar'
import InputMask from 'primevue/inputmask'

import { checkEmail, checkLength } from '../../utils/helper.js'
const props = defineProps(['check'])
const upload = ref()
const date = ref()
const minDate = ref(new Date())
const maxDate = ref(new Date())

type ErrorType = 'firstname' | 'password'

interface ChoosingRole {
  name: string
  code: string
}

interface Rating {
  name: string
  value: string
}
interface Gender {
  name: string
  value: string
}

interface Form {
  firstname: string
  lastname: string
  patronymic: string
  email: string
  locations: string
  mobilephone: string
  workphone: string
  datebirth: string
  password: string
  password2: string
  file: string
  choosing_role: ChoosingRole
  rating: Rating
  gender: Gender
  jobfunctions: string
}

interface Errors {
  lastname: string
  firstname: string
  email: string
  password: string
  password2: string
  file: string
}

const form = ref<Form>({
  firstname: '',
  lastname: '',
  patronymic: '',
  email: '',
  datebirth: '',
  mobilephone: '',
  workphone: '',
  password: '',
  password2: '',
  file: '',
  locations: '',
  choosing_role: { name: 'USER', code: 'USER' },
  rating: { name: '1', value: '1' },
  gender: { name: 'М', value: 'М' },
  jobfunctions: '',
})

const errors = ref<Errors>({
  lastname: '',
  firstname: '',
  email: '',
  password: '',
  password2: '',
  file: '',
})

const cities = ref([
  { name: 'USER', code: 'USER' },
  { name: 'ADMIN', code: 'ADMIN' },
])
const gender = ref([
  { name: 'М', code: 'М' },
  { name: 'Ж', code: 'Ж' },
])
const rating = ref([
  { name: '1', value: 1 },
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
  { name: '5', value: 5 },
  { name: '6', value: 6 },
  { name: '7', value: 7 },
  { name: '8', value: 8 },
  { name: '9', value: 9 },
  { name: '10', value: 10 },
])

const emit = defineEmits()

const callParent = () => {
  emit('callParentMethod', form.value)
  clearForm()
}

type FilterKeysByValue<O, V> = keyof { [K in keyof O as O[K] extends V ? K : never]: O[K] }

function isKeyForValue<T, O>(
  key: PropertyKey,
  obj: O,
  guard: (v: unknown) => v is T,
): key is FilterKeysByValue<O, T> {
  return obj != null && guard(obj[key as keyof O])
}

function clearForm() {
  upload.value.value = null
  Object.keys(form.value).forEach((key) => {
    if (isKeyForValue(key, form.value, (v) => typeof v === 'string')) {
      form.value[key] = ''
    } else if (key === 'choosing_role') {
      form.value[key] = { name: 'USER', code: 'USER' }
    } else if (key === 'rating') {
      form.value[key] = { name: '1', value: '1' }
    }
  })
}

const validateForm = () => {
  const validations: Array<{ field: keyof Form; message: string }> = [
    { field: 'lastname', message: 'Фамилия обязательно' },
    { field: 'firstname', message: 'Имя обязательно' },
    { field: 'email', message: 'Email обязательно' },
    { field: 'password', message: 'Пароль обязателен' },
    { field: 'file', message: 'Фото обязательно' },
  ]

  validations.forEach(({ field, message }) => {
    if (!form.value[field]) {
      errors.value[field as keyof Errors] = message
    }
  })

  if (form.value.password !== form.value.password2) {
    errors.value.password2 = 'Пароль не совпадает'
  }
}

function isEmpty(obj: Record<string, string>) {
  const hasEmptyValue = Object.values(obj).every((value) => value === '')

  if (hasEmptyValue) {
    callParent()
    emit('callNormComponent', ['ProfileContent', false])
  } else {
    emit('callErrorProfile', 'ProfileContent')
  }
}
function previewFiles(event: any) {
  console.log(event.target.files[0])
  form.value.file = event.target.files[0]
}

const CheckingProfileComponent = () => {
  validateForm()
  isEmpty(errors.value)
}
defineExpose({ CheckingProfileComponent })
watch(
  () => [
    form.value.lastname,
    form.value.firstname,
    form.value.email,
    form.value.password,
    form.value.password2,
    form.value.file,
  ],
  () => {
    if (form.value.file != '') {
      errors.value.file = ''
    }
    if (form.value.lastname != '') {
      errors.value.lastname = ''
      errors.value['lastname'] = checkLength('username', form.value.lastname, 3, 15)
    }
    if (form.value.firstname != '') {
      errors.value.firstname = ''
      errors.value['firstname'] = checkLength('username', form.value.firstname, 3, 15)
    }
    if (form.value.email != '') {
      errors.value.email = checkEmail(form.value.email)
    }
    if (form.value.password) {
      errors.value['password'] = checkLength('password', form.value.password, 1, 15)
    }
    if (form.value.password2 !== form.value.password) {
      errors.value.password2 = 'Пароль не совподает'
    } else {
      errors.value.password2 = ''
    }
  },
)

let today = new Date()
let month = today.getMonth()
let year = today.getFullYear()
let prevYear = year - 65
let nextYear = year - 18
minDate.value.setFullYear(prevYear)
maxDate.value.setFullYear(nextYear)
</script>

<template>
  <div>
    <div>
      <div class="group_form-control-five">
        <div class="form-control" :class="{ error: errors.lastname, success: !errors.lastname && form.lastname != '' }">
          <label for="last_name">Фамилия</label>
          <input type="text" v-model="form.lastname" id="last_name" placeholder="Фамилия" />
          <small v-if="errors.lastname">{{ errors.lastname }}</small>
        </div>
        <div class="form-control"
          :class="{ error: errors.firstname, success: !errors.firstname && form.firstname != '' }">
          <label for="firstname">Имя</label>
          <input type="text" v-model="form.firstname" id="firstname" placeholder="Имя" />
          <small v-if="errors.firstname">{{ errors.firstname }}</small>
        </div>

        <div class="form-control">
          <label for="middle_name">Отчество</label>
          <input type="text" v-model="form.patronymic" id="middle_name" placeholder="Отчество" />
        </div>
        <div class="form-control">
          <label for="middle_name">Пол</label>
          <Select v-model="form.gender" id="middle_name" :options="gender" optionLabel="name" placeholder="М"
            class="w-full" />
        </div>
        <div class="form-control">
          <label for="birth_day">Дата рождения</label>
          <Calendar v-model="form.datebirth" style="width: 100%" id="birth_day" placeholder="День рождения"
            dateFormat="dd/mm/yy" :minDate="minDate" :maxDate="maxDate" :manualInput="false" />
        </div>
      </div>
    </div>
    <div class="group_form-control-four">
      <div class="form-control">
        <label for="mobile_self">Мобильный телефон (личный)</label>
        <InputMask type="text" mask="+7 999-999-9999" id="mobile_self" v-model="form.mobilephone"
          placeholder="Мобильный телефон (личный)" />
      </div>
      <div class="form-control">
        <label for="mobile_work">Мобильный телефон (рабчий)</label>
        <InputMask type="text" mask="+7 999-999-9999" id="mobile_work" v-model="form.workphone"
          placeholder="Мобильный телефон (рабочий)" />
      </div>
      <div class="form-control">
        <label for="link_whatsapp">Ссылка на ватсам</label>
        <input type="text" id="link_whatsapp" placeholder="Ссылка на ватсам" />
      </div>
      <div class="form-control">
        <label for="link_telegram">Ссылка на телеграм</label>
        <input type="text" id="link_telegram" placeholder="Ссылка на телеграм" />
      </div>
    </div>
    <div class="group_form-control-tree">
      <div class="form-control">
        <label for="email_self">E-mail личный</label>
        <input type="text" id="email_self" placeholder="E-mail личный" />
      </div>
      <div class="form-control" :class="{ error: errors.email, success: !errors.email && form.email != '' }">
        <label for="email">Email</label>
        <input type="email" v-model="form.email" id="email" placeholder="Введите email" />
        <small v-if="errors.email">{{ errors.email }}</small>
      </div>
      <div class="form-control">
        <label for="work_location">Расположение рабочего места</label>
        <input type="text" id="work_location" v-model="form.locations" placeholder="Расположение рабочего места" />
      </div>
    </div>
    <div class="group_form-control-four">
      <div class="form-control" :class="{ error: errors.password, success: !errors.password && form.password != '' }">
        <label for="password">Пароль</label>
        <Password v-model="form.password" id="password" variant="filled" placeholder="Введите пароль" toggleMask />
        <small v-if="errors.password">{{ errors.password }}</small>
      </div>

      <div class="form-control"
        :class="{ error: errors.password2, success: !errors.password2 && form.password2 != '' }">
        <label for="password2">Повторите пароль</label>
        <input type="password" v-model="form.password2" id="password2" placeholder="Повторите пароль" />
        <small v-if="errors.password2">{{ errors.password2 }}</small>
      </div>

      <div class="form-control">
        <label for="selctRole">Роль пользователя</label>
        <Select v-model="form.choosing_role" id="selctRole" :options="cities" optionLabel="name" placeholder="USER"
          class="w-full" />
      </div>
      <div class="form-control">
        <label for="assignRating">Присвоить рейтинг</label>
        <Select v-model="form.rating" id="assignRating" :options="rating" optionLabel="name" placeholder="1"
          class="w-full" />
      </div>
    </div>
    <!-- Должностые обязанности, будут браться исходя из должности -->
    <!-- <div class="form-control">
      <label for="jobfunctions">Должностные обязанности</label>
      <textarea type="text" v-model="form.jobfunctions" id="jobfunctions"
        placeholder="Должностные обязанности"></textarea>
    </div> -->
    <div class="form-control" :class="{ error: errors.file, success: !errors.file && form.file != '' }">
      <label for="selctFile">Загрузить фото</label>
      <input type="file" ref="upload" id="selctFile" @change="previewFiles" />
      <small v-if="errors.file">{{ errors.file }}</small>
    </div>
  </div>
</template>

<style scoped>
.p-password {
  width: 100%;
  display: inline-flex;
  position: relative;
}

.p-inputtext.p-variant-filled {
  background: none;
}
</style>
