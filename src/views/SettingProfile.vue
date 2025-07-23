<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useCounterStore } from '../stores/counter'

import Button from 'primevue/button'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'

import HeaderSettingProfile from '@/components/HeaderSettingProfile.vue'
const store = useCounterStore()

const imgW = ref({
  imgUrl: import.meta.env.VITE_API_URL,
})

interface UserTab {
  component: string
  title: string
  errors: boolean
}
const infoProfile = ref({
  id: store.info.id,
  email: store.info.email,
  role: store.info.role,
  gender: store.info.gender,
  company: store.info.company,
  locations: store.info.locations,
  jobfunctions: store.info.jobfunctions,
  mobilephone: store.info.mobilephone,
  workphone: store.info.workphone,
  telegram: store.info.telegram,
  datebirth: store.info.datebirth,
})

const userTabs: Ref<UserTab[]> = ref([
  { component: 'ProfileContent', title: 'Профиль', errors: false },
  { component: '', title: 'Контакты рабочие', errors: false },
  { component: 'JobInformationContent', title: 'Данные о работе', errors: false },
])
</script>
<template>
  <div class="sidebar profile">
    <div class="nano">
      <Tabs value="0" scrollable>
        <TabList>
          <Tab v-for="(tab, i) in userTabs" :key="i" :value="String(i)" class="tag_error">
            <span class="tag" :class="{ error: tab.errors }"></span>
            {{ tab.title }}
          </Tab>
        </TabList>
        <HeaderSettingProfile class="HeaderSettingProfile" />
        <TabPanels>
          <TabPanel value="0">
            <h1 class="nameTab">Профиль</h1>
            <div class="wrapper_setting_profile">
              <div class="group_form-control-two">
                <div>
                  <div>Контакты</div>
                  <div class="labelContact">
                    <div>Мобильный телефон:</div>
                    <div>{{ infoProfile.mobilephone }}</div>
                    <div>Рабочий телефон:</div>
                    <div>{{ infoProfile.workphone }}</div>
                    <div>добавочный номер:</div>
                    <div>123</div>
                    <div>Почта:</div>
                    <div>{{ infoProfile.email }}</div>
                    <div>Локация:</div>
                    <div>{{ infoProfile.locations }}</div>
                  </div>
                </div>
                <div>
                  <div>Личные данные</div>
                </div>
              </div>
              <div class="group_form-control-tree">
                <div>
                  <div>Совмещение №1</div>
                  <div class="labelContact">
                    <div>Должность:</div>
                    <div>Курьер</div>
                    <div>Руководитель:</div>
                    <div>Сухов Даниил Иванович</div>
                    <div>Локация:</div>
                    <div>Центральный офис. ш. Энтузиастов 56с44 - 11</div>
                    <div>Должностные функции:</div>
                    <div>Делать хорошо, а плохо не надо делать</div>
                  </div>
                </div>
                <div>Совмещение №2</div>
                <div>Совмещение №3</div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <h1 class="nameTab">Контакты рабочие</h1>
          </TabPanel>
          <TabPanel value="2">
            <h1 class="nameTab">Данные о работе</h1>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>
<style lang="scss">
.sidebar.profile {
  .nano {
    .p-tablist-tab-list {
      background: none !important;
      border: none !important;
    }

    .p-tabpanels {
      background: none;
      padding: 0;
    }

    .p-tab-active {
      color: #fff;
    }

    // .p-tab {
    //   color: #fff;
    // }
    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
      color: #ccc !important;
    }
  }
}
</style>
<style scoped lang="scss">
.sidebar {
  width: -webkit-fill-available;
  transition: all 0.3s ease-in-out;
  z-index: 100;
  margin-right: 40px;

  .HeaderSettingProfile {
    display: flex;
    background: #fff;
    padding: 12px;
    border-radius: 12px;
    margin: 0;
  }

  .nameTab {
    color: #fff;
    font-size: 24px;
    margin: 12px 0;
  }

  .wrapper_setting_profile {
    max-height: 66vh;
    overflow: scroll;

    .group_form-control-two,
    .group_form-control-tree {
      margin-bottom: 10px;

      >div {
        background: #fff;
        border-radius: 15px;
        padding: 24px;
      }

      .labelContact {
        div:nth-child(odd) {
          color: #939393;
          font-size: 10px;
        }

        div:nth-child(even) {
          color: #202224;
          font-size: 14px;
        }
      }
    }

    .group_form-control-tree {
      >div {
        background: #fff;
        border-radius: 15px;
        padding: 24px;
      }
    }

    & .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 0.7fr 0.8fr 0.6fr 0.7fr;
      gap: 10px 10px;
      grid-auto-flow: row;
      grid-template-areas:
        'е1 е3'
        'е2 е3'
        'е4 е4'
        'е6 е6';

      >div {
        background: #fff;
        border-radius: 15px;
        padding: 24px;
      }
    }

    & .info {
      label {
        font-size: 14px;
      }

      p {
        font-size: 16px;
        font-weight: bold;
      }
    }

    & .е1 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 10px 10px;
      grid-auto-flow: row;
      grid-template-areas:
        'img des'
        'img des'
        'title des';
      grid-area: е1;
    }

    & .img {
      grid-area: img;
      border-radius: 15px;
      overflow: hidden;
    }

    & .title {
      grid-area: title;
    }

    & .des {
      grid-area: des;
    }

    & .е2 {
      grid-area: е2;
    }

    & .е3 {
      grid-area: е3;
    }

    & .е4 {
      grid-area: е4;
    }

    & .е6 {
      grid-area: е6;
    }
  }

  & .nano {
    padding: 24px;
    background: #44444482;
    border-radius: 10px;
    min-height: 90vh;
  }
}
</style>
