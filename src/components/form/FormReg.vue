<script setup lang="ts">
import './style.scss'
import { ref, watch, type Ref } from 'vue'
import Select from 'primevue/select';
import { useUsersStore } from '../../stores/users'
import { registration, fetchUzers } from '../../http/userAPI.js'


import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';


const store = useUsersStore()

interface Form {
  username: string
  email: string
  password: string
  password2: string
  role: string
  file: string
}

interface Errors {
  username: string
  email: string
  password: string
  password2: string
}
interface UserTab {
  title: string;
}

const form = ref<Form>({
  username: '',
  email: '',
  password: '',
  password2: '',
  role: '',
  file: ''
})

const userTabs: Ref<UserTab[]> = ref([
  { title: 'Профиль' },
  { title: 'Контакты рабочие' },
  { title: 'Данные о работе' },
  { title: 'Личные контакты' },
  { title: 'Паспортные данные' },
  { title: 'Прочие личные данные' },
  { title: 'Кадровые данные' },
  { title: 'Эффективность работы' },
  { title: 'Знания и аттестация' },
  { title: 'HR профиль' },
  { title: 'Материальная ответственность' },
  { title: 'Заработная плата' }
])

const errors = ref<Errors>({
  username: '',
  email: '',
  password: '',
  password2: '',
})

const messageCondition = ref<string>('')
const condition = ref<boolean>(false)
const addeduser = ref<boolean>(false)

const selectedRole = ref({ name: 'USER', code: 'USER' });
const cities = ref([
  { name: 'USER', code: 'USER' },
  { name: 'ADMIN', code: 'ADMIN' }
]);


function set() {
  setTimeout(() => {
    addeduser.value = false
  }, 2000)
}
function clearForm() {
  Object.keys(form.value).forEach(key => {
    form.value[key as keyof Form] = '';
  });
}
const RegistrationUser = async () => {
  try {
    const formData = new FormData()
    formData.append('email', form.value.email)
    formData.append('password', form.value.password)
    formData.append('role', selectedRole.value.name)
    formData.append('img', form.value.file)


    const response = await registration(formData)
    condition.value = false
    addeduser.value = true
    set()
    clearForm()
    fetchUzers().then(data => store.registrationCompleted(data))
    console.log(response)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    messageCondition.value = e.response.data.message
    condition.value = true
    console.log(e.response.data.message)
  }
}
function checkLength(err: string, input: string, min: number, max: number) {
  if (input.length < min) {
    if (err == 'username') {
      errors.value.username = 'меньше чем надо'
    } else if (err == 'password') {
      errors.value.password = 'меньше чем надо'
    }
  } else if (input.length > max) {
    if (err == 'username') {
      errors.value.username = 'Больше чем надо'
    } else if (err == 'password') {
      errors.value.password = 'Больше чем надо'
    }
  } else {
    if (err == 'username') {
      errors.value.username = ''
    } else if (err == 'password') {
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
  if (!form.value.username) {
    errors.value.username = 'Имя обязательно'
  }
  if (!form.value.email) {
    errors.value.email = 'Email обязательно'
  }
  if (!form.value.password) {
    errors.value.password = 'Пароль обязателен'
  }
  if (form.value.password !== form.value.password2) {
    errors.value.password2 = 'Пароль не совпадает'
  }
}

function isEmpty(obj: Record<string, string>) {
  let a = true
  for (const [key, value] of Object.entries(obj)) {
    console.log(value, key)
    if (value === '') {
      a = false
    } else {
      a = true
      break
    }
  }
  if (!a) RegistrationUser()
}
const handleSubmit = () => {
  validateForm()
  isEmpty(errors.value)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function previewFiles(e: any) {
  console.log(e.target.files[0])
  form.value.file = e.target.files[0]
}

watch(
  () => [form.value.username, form.value.email, form.value.password, form.value.password2],
  () => {
    if (form.value.username != '') {
      errors.value.username = ''
      checkLength('username', form.value.username, 3, 15)
    }
    if (form.value.email != '') {
      checkEmail(form.value.email)
    }
    if (form.value.password) {
      checkLength('password', form.value.password, 1, 15)
    }
    if (form.value.password2 !== form.value.password) {
      errors.value.password2 = 'Пароль не совподает'
    } else {
      errors.value.password2 = ''
    }
  },
)
</script>

<template>
  <div>
    <div class="sidebar">
      <div class="nano">
        <div class="title_setting_profile">
          Регистрация нового сотрудника
        </div>
        <div class="wrapper_setting_profile">
          <div class="card">
            <Tabs value="0" scrollable>
              <TabList>
                <Tab v-for="(tab, i) in userTabs" :key="i" :value="String(i)" class="toster">
                  {{ tab.title }}
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="0">
                  <div>
                    <div class="group_form-control">
                      <div class="form-control">
                        <label for="last_name">Фамилия</label>
                        <input type="text" id="last_name" placeholder="Фамилия" />
                      </div>
                      <div class="form-control"
                        :class="{ error: errors.username, success: !errors.username && form.username != '' }">
                        <label for="username">Имя</label>
                        <input type="text" v-model="form.username" id="username" placeholder="Имя" />
                        <small v-if="errors.username">{{ errors.username }}</small>
                      </div>

                      <div class="form-control">
                        <label for="middle_name">Отчество</label>
                        <input type="text" id="middle_name" placeholder="Отчество" />
                      </div>
                      <div class="form-control">
                        <label for="middle_name">Пол</label>
                        <select name="pets" id="middle_name">
                          <option value="М">Муж</option>
                          <option value="Ж">Жен</option>
                        </select>
                      </div>
                      <div class="form-control">
                        <label for="birth_day">День рождения</label>
                        <input type="text" id="birth_day" placeholder="Отчество" />
                      </div>
                    </div>

                    <div class="form-control"
                      :class="{ error: errors.email, success: !errors.email && form.email != '' }">
                      <label for="email">Email</label>
                      <input type="email" v-model="form.email" id="email" placeholder="Введите email" />
                      <small v-if="errors.email">{{ errors.email }}</small>
                    </div>

                    <div class="form-control"
                      :class="{ error: errors.password, success: !errors.password && form.password != '' }">
                      <label for="password">Пароль</label>
                      <input type="password" v-model="form.password" id="password" placeholder="Введите пароль" />
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
                      <Select v-model="selectedRole" id="selctRole" :options="cities" optionLabel="name"
                        placeholder="USER" class="w-full " />
                    </div>

                    <div class="form-control">
                      <label for="selctFile">Грузим фото</label>
                      <input type="file" id="selctFile" @change="previewFiles" multiple />
                    </div>
                    <div v-if="addeduser" class="text-green-600">Пользователь добавлен!</div>
                    <div v-if="condition" class="text-red-600">{{ messageCondition }}</div>
                  </div>
                </TabPanel>
                <TabPanel value="1">
                  <p class="m-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo. Nemo enim
                    ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                    dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam
                    eius modi.
                  </p>
                </TabPanel>
                <TabPanel value="2">
                  <p class="m-0">
                    At vero eos et accusamus
                  </p>
                </TabPanel>
                <TabPanel value="3">
                  <p class="m-0">
                    At vero eos et accusamus
                  </p>
                </TabPanel>
                <TabPanel value="4">
                  <p class="m-0">
                    At vero eos et accusamus
                  </p>
                </TabPanel>
                <TabPanel value="5">
                  <p class="m-0">
                    At vero eos et accusamus
                  </p>
                </TabPanel>
                <TabPanel value="6">
                  <p class="m-0">
                    At vero eos et accusamus
                  </p>
                </TabPanel>
                <TabPanel value="7">
                  <p class="m-0">
                    At vero eos et accusamus
                  </p>
                </TabPanel>
                <TabPanel value="8">
                  <p class="m-0">
                    At vero eos et accusamus
                  </p>
                </TabPanel>
                <TabPanel value="9">
                  <p class="m-0">
                    At vero eos et accusamus
                  </p>
                </TabPanel>
                <TabPanel value="10">
                  <p class="m-0">
                    At vero eos et accusamus
                  </p>
                </TabPanel>
                <TabPanel value="11">
                  <p class="m-0">
                    At vero eos et accusamus
                  </p>
                </TabPanel>

              </TabPanels>
            </Tabs>
          </div>
          <div class="buttonWrapper form-control">
            <button class="saveButton" @click="handleSubmit">Сохранить</button>
            <button class="cancelButton">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.wrapper_setting_profile {
  .p-tablist-tab-list {
    background: none !important;
  }
}
</style>
<style scoped lang="scss">
.title_setting_profile {
  font-size: 24px;
  color: #fff;
}

.wrapper_setting_profile {
  background: #ffffffe9;
  padding: 32px;
  border-radius: 24px;
  margin-top: 25px;

  .card {
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 16px;


  }

  .buttonWrapper {
    color: #fff;
    font-size: 14px;
    margin: 0;
    padding: 0;

    .saveButton {
      background: #06A80B;
      min-height: 42px;
      min-width: 280px;
      border-radius: 16px;
      margin-right: 15px;
    }

    .cancelButton {
      background: #37382D;
      border-radius: 16px;
      margin-right: 15px;
      min-height: 42px;
      min-width: 95px;
    }
  }
}
</style>
