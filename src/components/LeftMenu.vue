<script setup lang="ts">
import { shallowRef, ref } from 'vue'
import { RouterLink } from 'vue-router'
import IconAngle from '../components/icons/IconAngle.vue'
import Button from 'primevue/button'
import { useCounterStore } from '../stores/counter'
import { useRouter } from 'vue-router'

const emit = defineEmits(['counterEvent'])
const router = useRouter()
const store = useCounterStore()
const isSidebarOpen = shallowRef(false)
const name = ref(JSON.parse(localStorage.getItem('role') || ''))
const avatar = ref({img:store.info.img})
console.log(avatar._rawValue.img) 

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function ExitStatus() {
  emit('counterEvent')
  store.registrationCompleted()
  localStorage.removeItem('role')
  localStorage.removeItem('token')
  localStorage.removeItem('users')
  router.push({ path: '/' })
}

const isActive = ref(false);


const toggleBurger = () => {
 
};
</script>

<template>
  <aside :vue:is-open="isSidebarOpen">
    <ul class="sidebar-head">
      <li>
        <img src = "../assets/logo.png" alt="logo" width="32" height="32" />
      </li>
      <li>
          
           <div class="burgerContener" @click="toggleSidebar">
               <button class="burger" :class="{ active: isSidebarOpen }"></button>
           </div>
        
        <!-- <button class="sidebar-toggle button" :class="isSidebarOpen ? 'toggle-button' : ''">
          <IconAngle @click="toggleSidebar" />
        </button> -->
      </li>
    </ul>
    <h4 :transparent="!isSidebarOpen">{{ name.role }}-{{ name.email }}</h4>
    <ul>
      <li>
        <RouterLink to="/">
          <div class="flex items-center justify-center">
            <i class="pi pi-list-check"></i>
          </div>
          <span v-show="isSidebarOpen" class="namePage">Мои проекты</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/MyTasks">
          <div class="flex items-center justify-center">
            <i class="pi pi-clipboard"></i>
          </div>
          <span v-show="isSidebarOpen" class="namePage">Мои задачи</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/SettingProfile">
          <div class="flex items-center justify-center">
            <i class="pi pi-user"></i>
          </div>
          <span v-show="isSidebarOpen" class="namePage">Профиль</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/PyramidManagement">
          <div class="flex items-center justify-center">
            <i class="pi pi-share-alt"></i>
          </div>
          <span v-show="isSidebarOpen" class="namePage">Пирамида управления</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/PyramidTree">
          <div class="flex items-center justify-center">
            <i class="pi pi-share-alt"></i>
          </div>
          <span v-show="isSidebarOpen" class="namePage">Пирамида древом</span>
        </RouterLink>
      </li>
      <li v-if="name.role === 'ADMIN'">
        <RouterLink to="/UsersList">
          <div class="flex items-center justify-center">
            <i class="pi pi-users"></i>
          </div>
          <span v-show="isSidebarOpen" class="namePage">Пользователи</span>
        </RouterLink>
      </li>
      <li v-if="name.role === 'ADMIN'">
        <RouterLink to="/PageTest">
          <div class="flex items-center justify-center">
            <i class="pi pi-cog"></i>
          </div>
          <span v-show="isSidebarOpen" class="namePage">Для тестов</span>
        </RouterLink>
      </li>
    </ul>
    <div class="mt-auto flex justify-center">
      <button @click="ExitStatus()"><i class="pi pi-sign-in"></i></button>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@use '../assets/scss/colors' as clr;

// .burgerContener{
//   position: absolute;
//   right: 1px;
//   height: 48px;
//   width: 48px;
//   border: solid 1px;
//   border-radius: 0 15px 15px 0;
//   display: flex; 
//   align-items: center
  
// }
.burger {
  cursor: pointer;
  display: block;
  position: absolute;
  right: 15px;
  border: none;
  background: transparent;
  width: 18px;
  height: 14px;
  margin: 30px auto;
}

.burger::before,
.burger::after {
  content: '';
  left: 0;
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  border-radius: 10px;
  background: white;
}

.burger::before {
  top: 0;
  box-shadow: 0 6px 0 white;
  transition: box-shadow .3s .15s, top .3s .15s, transform .3s;
}

.burger::after {
  bottom: 0;
  transition: bottom .3s .10s, transform .2s;
}

.burger.active::before {
  top: 11px;
  transform: rotate(45deg);
  box-shadow: 0 6px 0 rgba(0,0,0,0);
}

.burger.active::after {
  bottom: 1px;
  transform: rotate(-45deg);
}

.namePage {
  min-width: 100px;
}

.wrapper {
  overflow: scroll;
  background: linear-gradient(45deg,
      rgba(86, 0, 60, 1) 0%,
      rgba(7, 62, 137, 1) 35%,
      rgba(41, 182, 253, 1) 100%);
}

$sidebar-width: 4rem;
$sidebar-hidden-width: 0;
$toggle-duration: 300ms;
$sidebar-padding-inline-start: 1rem;

aside {
  position: absolute;
  z-index: 9999;
  color: #ffffff;
   background: linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
               linear-gradient(270deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
               linear-gradient(90deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
               linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
               linear-gradient(0deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-block: 1rem;
  transition: all $toggle-duration;
  width: $sidebar-width;
  overflow: hidden;
}

aside[vue\:is-open='true'] {
  width: 3 * $sidebar-width;
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
  padding-inline-start: $sidebar-padding-inline-start;

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
    position: absolute;
    right: 0;
    width: 0.25rem;
    height: 100%;
    background-color: #12d304;
  }
}

.sidebar-head {
  position: relative;
}

.sidebar-toggle {
  padding-inline-start: $sidebar-padding-inline-start;
}

h4 {
  padding-block-end: 1rem;
  padding-inline-start: $sidebar-padding-inline-start;
  user-select: none;
  pointer-events: none;
  opacity: 0.5;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.125ch;
  transition: opacity $toggle-duration;
}

h4[transparent='true'] {
  opacity: 0;
}

.button {
  cursor: pointer;
  position: absolute;
  transition-duration: $toggle-duration;
  transition-property: transform, left, top;
  left: 0;
  top: 0;
  transform: translateX(0%) translateY(2rem) rotateZ(0deg);

  &.toggle-button {
    left: 100%;
    top: 0;
    transform: translateX(-100%) translateY(0rem) rotateZ(180deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity, transform;
  transition-duration: $toggle-duration;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
