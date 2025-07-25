
<script setup lang="ts">
import { shallowRef, ref } from 'vue'
import { RouterLink } from 'vue-router'
import IconAngle from '../components/icons/IconAngle.vue'
import Button from 'primevue/button'
import  {  Slide  }  from  'vue3-burger-menu'
import { useCounterStore } from '../stores/counter'
import { useRouter } from 'vue-router'


const emit = defineEmits(['counterEvent'])
const router = useRouter()
const store = useCounterStore()
const isSidebarOpen = shallowRef(false)
const name = ref(JSON.parse(localStorage.getItem('role') || ''))


const imgW = ref({
  imgUrl: import.meta.env.VITE_API_URL,
})

const infoProfile = ref({
  img: store.info.img,
  firstname: store.info.firstname,
  lastname: store.info.lastname,
})


function ExitStatus() {
  emit('counterEvent')
  store.registrationCompleted()
  localStorage.removeItem('role')
  localStorage.removeItem('token')
  router.push({ path: '/' })
}
</script>

<template>
  <Slide :closeOnNavigation="true" class="aside" style="border-radius: 0 36px 36 px 0;">
   <div class="background_style">
    <div class="avatar" :style="{ backgroundImage: 'url(' + imgW.imgUrl + '/' + infoProfile.img + ')' }">
     
    </div>

    <ul>
      <li>
        <RouterLink to="/">
          <div class="flex items-center justify-center">
            Мои проекты
          </div>
       </RouterLink>
      </li>
      <li>
        <RouterLink to="/MyTasks">
          <div class="flex items-center justify-center">
           Мои задачи
          </div>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/SettingProfile">
          <div class="flex items-center justify-center">
           Профиль
          </div>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/PyramidManagement">
          <div class="flex items-center justify-center">
            Пирамида управления
          </div>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/PyramidTree">
          <div class="flex items-center justify-center">
           Пирамида древом
          </div>
         </RouterLink>
      </li>
      <li v-if="name.role === 'ADMIN'">
        <RouterLink to="/UsersList">
          <div class="flex items-center justify-center">
            Пользователи
          </div>
         </RouterLink>
      </li>
      <li v-if="name.role === 'ADMIN'">
        <RouterLink to="/PageTest">
          <div class="flex items-center justify-center">
          Для тестов
          </div>
         </RouterLink>
      </li>
    </ul>
    <div class="mt-auto flex justify-center">
      <button @click="ExitStatus()"><i class="pi pi-sign-in"></i></button>
    </div>
    </div>
  </Slide>
</template>
<style lang="scss">
.aside  {

  .background_style>* {
   height: 650px;
    width: 100%;
  
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bm-item-list>*{
    color: #b8b7ad;
   
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
  
    flex-direction: column;
    /* align-content: flex-start; */
    align-items: center;
  }
  .bm-cross {
    background: white;
  }
  .line-style {
    background-color: rgb(255, 255, 255);
    position: absolute;
    height: 20%;
    left: 0;
    right: 0;

  }
  .bm-menu {
    border-radius: 36px;
    height: 100%;
    width: 0;
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 0;
    background-color: black;
    
  

    overflow: hidden;
    padding-top: 60px;
    -webkit-transition: .5s;
    transition: .5s;
  }
  .bm-burger-button {
      
        width: 20px;
         height: 20px;
       left :  36 px ;
      //  top :  50 px ;
       color: #ffffff;
       cursor : pointer; 
    } 

  position: relative;
  top:36px;
  background-color: black;
  color: #ffffff;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
               linear-gradient(270deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
               linear-gradient(90deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
               linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
               linear-gradient(0deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%);
  // filter: blur(2px);
  z-index: 9999;
  height: 650px;
  display: flex;
}


</style>
<style scoped lang="scss">
@use '../assets/scss/colors' as clr;
.avatar {
  height: 96px;
  width: 96px;
  border-radius: 50%;
  -webkit-background-size: cover;
}

.bm-burger-button {
       position : fixed;
       width :  30 px ;
       height :  30 px ;
       left :  36 px ;
       top :  50 px ;
       cursor : pointer; 
    } 

ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-block-end: 1rem;
}

img {
  object-fit: contain;
}

li {
  min-width: fit-content;
  cursor: pointer;
  // padding-inline-start: $sidebar-padding-inline-start;

  &:hover {
    color: #fffbfb;
  }

  & a {
    display: flex;
    align-items: center;
    column-gap: 0.75rem;
    position: relative;
    padding-block: 0.5rem;
    min-height: 40px;
  }

  a.router-link-exact-active::after {
    content: '';
    transform: rotate(90deg);
    position: absolute;
    right: -20px;
    width: 0.1rem;
    height: 50%;
    background-color: hsl(0, 0%, 100%);
  }
}

.sidebar-head {
  position: relative;
}

.sidebar-toggle {
  // padding-inline-start: $sidebar-padding-inline-start;
}

h4 {
  padding-block-end: 1rem;
  // padding-inline-start: $sidebar-padding-inline-start;
  user-select: none;
  pointer-events: none;
  opacity: 0.5;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.125ch;
  // transition: opacity $toggle-duration;
}

h4[transparent='true'] {
  opacity: 0;
}






</style>


