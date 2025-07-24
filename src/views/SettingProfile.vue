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
import DescriptionProfile from '@/components/projectsListElements/DescriptionProfile.vue'

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
  firstname: store.info.firstname,
  lastname: store.info.lastname,
  patronymic: store.info.patronymic,
  department: store.info.department,
  positions: store.info.positions
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
        <TabPanels>
          <TabPanel value="0">
         
            <div class="wrapper_setting_profile">
              <div class="group_form-control-two">
                <div class="profile_section">

                    <DescriptionProfile/>
                    <div class="social_tab">

                      <a href="tg://msg?to={{ infoProfile.telegram }}">
                        <div class="social_button">
                            <img src="../assets/telegram.svg" alt="telegram" width="46px" />
                        </div>
                      </a>
                    

                    <a href="" >
                         <div class="social_button">
                            <img src="../assets/email.svg" alt="email" width="46px" />
                         </div>
                    </a>
                     
                    <a href="" >
                        <div class="social_button">
                          <img src="../assets/SMS.svg" alt="SMS" width="46px" />
                       </div>
                    </a>
                      
                    <a href="">
                       <div class="social_button">
                          <img src="../assets/whatsapp.svg" alt="whatsapp" width="46px" />
                      </div>
                    </a>
                     
                    </div> 
                  <HeaderSettingProfile class="HeaderSettingProfile" />
                  </div>
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
  border-radius: 36px;
  border: rgba(57, 111, 116, 1);
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
linear-gradient(270deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
linear-gradient(90deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
linear-gradient(0deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%);

  
  .nano {
    
   .profile_section {

      display: grid
;
    grid-template-columns: 1fr 100px 1fr;
    height: 100%;
}

    .p-tablist-tab-list {
      background: none ;
      border: none;
      display: flex;
      justify-content: center;
      
    }
    .social_tab {
      padding: 18px;
      display: flex;
      flex-direction: column;
      height: 328 px;
      
      gap: 24px

    }

    .social_button {
      padding: 18px;
      height: 64 px;
      width: 64px;
      gap: 10px; border-radius: 36px;
      background:
            linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
            linear-gradient(270deg, rgba(6, 75, 131, 0.15) 14.42%, rgba(0, 138, 251, 0.15) 100%);
    }


    .social_button:hover {
      background-color: rgba(6, 75, 131, 0.4); 
      box-shadow: 0 0 10px rgba(0, 138, 251, 0.8);
      transition-delay:0s

    }

    .p-tabpanels {
      background: none;
      padding: 0;
      
    }

    .p-tab-active {
      color: #fff;
    }

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
  
  .HeaderSettingProfile {
    width: 100%;
    display: flex;
    padding: 12px;
    border-radius: 36px;
    margin: 0;
  }

  .nameTab {
    color: #fff;
    font-size: 24px;
    margin: 12px 0;
  }

  .wrapper_setting_profile {
    max-height: 100%;
    min-height: auto;
   
    
  

    .group_form-control-two,
    .group_form-control-tree {
      // display: grid;
      // grid-template-columns: 1fr 46px 1fr ;
      height: 100%;
      margin-bottom: 10px;
      color: #fff;
      width: 100%;

      >div {
      
        border-radius: 15px;
           
      }
  
    }

    .group_form-control-tree {
      >div {
        border-radius: 15px;
      }
    }

    & .container {
      display: flex;
      height: 100%;
    

      >div {
       
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
      display: flex;
      
    }

    

    // & .title {
    //   grid-area: title;
    // }

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
    border-radius: 36px;
    min-height: 90vh;

    
  }
}


</style>
