<script setup lang="ts">
import './style.scss'
import { ref, type Ref } from 'vue'
import { useUsersStore } from '../../stores/users'
import { registration, fetchUzers } from '../../http/userAPI.js'

import ProfileContact from './tabsContent/ProfileContent.vue'


import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';


const myChild = ref()

const store = useUsersStore()


interface Form {
  username: string
  email: string
  password: string
  password2: string
  role: string
  file: string
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

const messageCondition = ref<string>('')
const condition = ref<boolean>(false)
const addeduser = ref<boolean>(false)

const working_contact = ref({
  working_contact_workphone: ''
})


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
    formData.append('working_contact_workphone', working_contact.value.working_contact_workphone)


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

const handleSubmit = () => {
  myChild.value.sayHello();

}

const handleParentMethod = () => {
  console.log('в дочернем елементе все впорядке')
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
                <Tab v-for="(tab, i) in userTabs" :key="i" :value="String(i)" class="toster">
                  {{ tab.title }}
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel value="0">
                  <ProfileContact ref="myChild" @callParentMethod="handleParentMethod" />
                  <div v-if="addeduser" class="text-green-600">Пользователь добавлен!</div>
                  <div v-if="condition" class="text-red-600">{{ messageCondition }}</div>

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
