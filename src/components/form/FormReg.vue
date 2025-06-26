<script setup lang="ts">
import './style.scss'
import { ref, type Ref } from 'vue'
import { useUsersStore } from '../../stores/users'
import { registration, fetchUzers } from '../../http/userAPI.js'

import ProfileContact from './ProfileContent.vue'
import JobInformationContentfrom from './JobInformationContent.vue'


import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';


const RequestProfileComponent = ref()
const RequestJobInformationComponent = ref()

const store = useUsersStore()



interface UserTab {
  component: string
  title: string;
  errors: boolean;
}
interface formDataTest {
  email?: string,
  password?: string
  role?: string
  img?: File | null;
  workphone?: string
}

const userTabs: Ref<UserTab[]> = ref([
  { component: 'ProfileContent', title: 'Профиль', errors: false },
  { component: '', title: 'Контакты рабочие', errors: false },
  { component: 'JobInformationContent', title: 'Данные о работе', errors: false },
  { component: '', title: 'Личные контакты', errors: false },
  { component: '', title: 'Паспортные данные', errors: false },
  { component: '', title: 'Прочие личные данные', errors: false },
  { component: '', title: 'Кадровые данные', errors: false },
  { component: '', title: 'Эффективность работы', errors: false },
  { component: '', title: 'Знания и аттестация', errors: false },
  { component: '', title: 'HR профиль', errors: false },
  { component: '', title: 'Материальная ответственность', errors: false },
  { component: '', title: 'Заработная плата', errors: false }
])
const formDataTest = ref<formDataTest>({})
const messageCondition = ref<string>('')
const condition = ref<boolean>(false)
const addeduser = ref<boolean>(false)

const working_contact = ref({
  working_contact_workphone: '111'
})


function set() {
  setTimeout(() => {
    addeduser.value = false
  }, 2000)
}
const RegistrationUser = async (formData: any) => {
  console.log(formDataTest.value.img, 'При передаче в функцию файле есть!!!')
  try {
    const response = await registration(formData)
    condition.value = false
    addeduser.value = true
    set()
    fetchUzers().then(data => store.registrationCompleted(data))
    console.log(response)
  } catch (e: any) {
    messageCondition.value = e.response.data.message
    condition.value = true
    console.log(e.response.data.message)
  }
}

const handleSubmit = () => {
  RequestProfileComponent.value.CheckingProfileComponent()
  RequestJobInformationComponent.value.CheckingJobInformationComponent()
  const hasErrorValue = Object.values(userTabs.value).every(value => value.errors === false);
  if (hasErrorValue) {
    const formData = new FormData();
    formData.append('email', formDataTest.value.email || '');
    formData.append('password', formDataTest.value.password || '');
    formData.append('role', formDataTest.value.role || '');
    if (formDataTest.value.img) {
      formData.append('img', formDataTest.value.img);
    }
    formData.append('workphone', formDataTest.value.workphone || '');
    RegistrationUser(formData);
  } else {
    console.log('Есть ошибки', hasErrorValue)
  }

}
const handleParentMethod = (e: any, tr: boolean) => {
  errorProfile('ProfileContent', true)
  formDataTest.value.email = e.email;
  formDataTest.value.password = e.password;
  formDataTest.value.role = e.choosing_role.name;
  formDataTest.value.img = e.file;
  formDataTest.value.workphone = working_contact.value.working_contact_workphone;
}
const JobInformationMethod = (e: any) => {
  errorProfile('JobInformationContent', true)
  console.log(e, 'JobInformationMethod')
}
const errorProfile = (e: any, tr: boolean) => {
  const profileTab = userTabs.value.find(tab => tab.component === e);
  if (profileTab) profileTab.errors = !tr
}

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
                <Tab v-for="(tab, i) in userTabs" :key="i" :value="String(i)" class="tag_error">
                  <span class="tag" :class="{ 'error': tab.errors }"></span>
                  {{ tab.title }}
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="0">
                  <ProfileContact ref="RequestProfileComponent" @callParentMethod="handleParentMethod"
                    @callErrorProfile="errorProfile" />
                </TabPanel>
                <TabPanel value="1">
                  <div>
                    <div class="">
                      <div class="form-control">
                        <label for="working_contact-constact">working_contact</label>
                        <input v-model="working_contact.working_contact_workphone" type="text"
                          id="working_contact-constact" placeholder="working_contact" />
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <JobInformationContentfrom ref="RequestJobInformationComponent"
                    @callParentMethod="JobInformationMethod" @callErrorProfile="errorProfile" />
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
            <div>
              <div v-if="addeduser" class="text-green-600 mb-5">Пользователь добавлен!</div>
              <div v-if="condition" class="text-red-600 mb-5">{{ messageCondition }}</div>
            </div>
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
