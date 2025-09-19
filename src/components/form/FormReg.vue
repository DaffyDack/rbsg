<script setup lang="ts">
import './style.scss'
import { ref, type Ref, nextTick } from 'vue'
import { useUsersStore } from '../../stores/users'
import { registration, fetchUzers } from '../../http/userAPI.js'

import ProfileContact from './ProfileContent.vue'
import JobInformationContentfrom from './JobInformationContent.vue'
import JobContactComponent from './JobContactComponent.vue'
import PersonalContactsComponent from './PersonalContactsComponent.vue'
import PassportData from './PassportData.vue'

import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
const AllowCleaning = ref(false)
const RequestProfileComponent = ref()
const RequestJobInformationComponent = ref()

const store = useUsersStore()

interface UserTab {
  component: string
  title: string
  errors: boolean
}
interface formDataTest {
  firstname?: string
  lastname?: string
  patronymic?: string
  email?: string
  datebirth?: string
  mobilephone?: string
  gender?: string
  password?: string
  role?: string
  img?: File | null
  workphone?: string
  positions?: string
  department?: string
  locations?: string
  code?: string
  jobfunctions?: string
  fullname?: string
}

const userTabs: Ref<UserTab[]> = ref([
  { component: 'ProfileContent', title: 'Профиль', errors: false },
  { component: 'JobInformationContent', title: 'Данные о работе', errors: false },
  { component: '', title: 'Контакты рабочие', errors: false },
  { component: '', title: 'Личные контакты', errors: false },
  { component: '', title: 'Паспортные данные', errors: false },
  { component: '', title: 'Прочие личные данные', errors: false },
  { component: '', title: 'Кадровые данные', errors: false },
  { component: '', title: 'Эффективность работы', errors: false },
  { component: '', title: 'Знания и аттестация', errors: false },
  { component: '', title: 'HR профиль', errors: false },
  { component: '', title: 'Материальная ответственность', errors: false },
  { component: '', title: 'Заработная плата', errors: false },
])
const formDataTest = ref<formDataTest>({
  firstname: '',
  lastname: '',
  patronymic: '',
  email: '',
  datebirth: '',
  mobilephone: '',
  gender: '',
  password: '',
  role: '',
  img: null,
  workphone: '',
  positions: '',
  department: '',
  locations: '',
  code: '',
  jobfunctions: '',
  fullname: '',
})
const messageCondition = ref<string>('')
const condition = ref<boolean>(false)
const addeduser = ref<boolean>(false)

const working_contact = ref({
  working_contact_workphone: '111!!',
})

function set() {
  setTimeout(() => {
    addeduser.value = false
  }, 2000)
}
const RegistrationUser = async (formData: any) => {
  try {
    const response = await registration(formData)
    condition.value = false
    addeduser.value = true
    set()
    fetchUzers().then((data) => store.registrationCompleted(data))
    fetchUzers().then((data) => localStorage.setItem('users', JSON.stringify(data)))
    AllowCleaning.value = false
  } catch (e: any) {
    messageCondition.value = e.response.data.message
    condition.value = true
  }
}
const handleParentMethod = (e: any, tr: boolean) => {
  errorProfile('ProfileContent', true)
  formDataTest.value.firstname = e.firstname
  formDataTest.value.lastname = e.lastname
  formDataTest.value.patronymic = e.patronymic
  formDataTest.value.email = e.email
  formDataTest.value.mobilephone = e.mobilephone
  formDataTest.value.gender = e.gender.name
  formDataTest.value.datebirth = String(e.datebirth)
  formDataTest.value.password = e.password
  formDataTest.value.role = e.choosing_role.name
  formDataTest.value.img = e.file
  formDataTest.value.locations = e.locations
  formDataTest.value.fullname = e.firstname + ' ' + e.lastname + ' ' + e.patronymic
  // formDataTest.value.workphone = working_contact.value.working_contact_workphone
  formDataTest.value.workphone = e.workphone
  formDataTest.value.jobfunctions = e.jobfunctions
}
const JobInformationMethod = (e: any) => {
  errorProfile('JobInformationContent', true)
  console.log(e, 'JobInformationMethod')
  formDataTest.value.positions = e.positions.post
  formDataTest.value.jobfunctions = e.positions.description
  formDataTest.value.department = e.department.department
  formDataTest.value.code = e.department.code
}

const handleSubmit = () => {
  RequestProfileComponent.value.CheckingProfileComponent()
  RequestJobInformationComponent.value.CheckingJobInformationComponent()
  const hasErrorValue = Object.values(userTabs.value).every((value) => value.errors === false)
  if (hasErrorValue) {
    const formData = new FormData()
    Object.entries(formDataTest.value).forEach(([key, value]) => {
      if (value instanceof Blob) {
        formData.append(key, value)
      } else if (typeof value === 'string') {
        formData.append(key, value)
      } else {
        console.warn(`Неподдерживаемый тип для ключа ${key}:`, value)
      }
    })
    RegistrationUser(formData)
  } else {
    console.log('Есть ошибки', hasErrorValue)
  }
}
function updateErrors(componentName: string) {
  const tab = userTabs.value.find((tab) => tab.component === componentName[0])
  if (tab) tab.errors = false
}
const errorProfile = (e: any, tr: boolean) => {
  const profileTab = userTabs.value.find((tab) => tab.component === e)
  if (profileTab) profileTab.errors = !tr
}
</script>

<template>
  <div>
    <div class="title_setting_profile">Регистрация нового сотрудника</div>
    <div class="wrapper_setting_profile">
      <div class="card">
        <Tabs value="0" scrollable>
          <TabList>
            <Tab v-for="(tab, i) in userTabs" :key="i" :value="String(i)" class="tag_error">
              <span class="tag" :class="{ error: tab.errors }"></span>
              {{ tab.title }}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <ProfileContact ref="RequestProfileComponent" @callParentMethod="handleParentMethod"
                @callErrorProfile="errorProfile" @callNormComponent="updateErrors" />
            </TabPanel>
            <TabPanel value="1">
              <JobInformationContentfrom ref="RequestJobInformationComponent" @callParentMethod="JobInformationMethod"
                @callErrorProfile="errorProfile" @callNormComponent="updateErrors" />
            </TabPanel>
            <TabPanel value="2">
              <JobContactComponent />
            </TabPanel>
            <TabPanel value="3">
              <PersonalContactsComponent />
            </TabPanel>
            <TabPanel value="4">
              <PassportData />
            </TabPanel>
            <TabPanel value="5">
              <p class="m-0">At vero eos et accusamus</p>
            </TabPanel>
            <TabPanel value="6">
              <p class="m-0">At vero eos et accusamus</p>
            </TabPanel>
            <TabPanel value="7">
              <p class="m-0">At vero eos et accusamus</p>
            </TabPanel>
            <TabPanel value="8">
              <p class="m-0">At vero eos et accusamus</p>
            </TabPanel>
            <TabPanel value="9">
              <p class="m-0">At vero eos et accusamus</p>
            </TabPanel>
            <TabPanel value="10">
              <p class="m-0">At vero eos et accusamus</p>
            </TabPanel>
            <TabPanel value="11">
              <p class="m-0">At vero eos et accusamus</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <div class="buttonWrapper form-control">
        <div>
          <div v-if="addeduser" class="text-green-600 mb-5">Пользователь добавлен!</div>
          <div v-if="condition" class="text-red-600 mb-5">{{ messageCondition }}</div>
        </div>
        <button class="saveButton" @click="handleSubmit">Сохранить</button>
        <button class="cancelButton">Отмена</button>
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

    .tag_error {
      position: relative;

      .tag {
        display: block;
        opacity: 0;
        width: 10px;
        height: 10px;
        background: red;
        position: absolute;
        right: 8px;
        top: 16px;
        border-radius: 100%;

        &.error {
          opacity: 1;
        }
      }
    }
  }

  .buttonWrapper {
    color: #fff;
    font-size: 14px;
    margin: 0;
    padding: 0;

    .saveButton {
      background: #06a80b;
      min-height: 42px;
      min-width: 280px;
      border-radius: 16px;
      margin-right: 15px;
    }

    .cancelButton {
      background: #37382d;
      border-radius: 16px;
      margin-right: 15px;
      min-height: 42px;
      min-width: 95px;
    }
  }
}
</style>
