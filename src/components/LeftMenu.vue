<script setup lang="ts">
import { shallowRef, ref } from 'vue'
import { RouterLink, } from 'vue-router'
import IconAngle from '../components/icons/IconAngle.vue'
const isSidebarOpen = shallowRef(false)
const name = ref(JSON.parse(localStorage.getItem('test') || '""'))

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <aside :vue:is-open="isSidebarOpen">
    <ul class="sidebar-head">
      <li>
        <img src="../assets/logo.png" alt="logo" width="32" height="32" />
      </li>
      <li>
        <button class="sidebar-toggle button" :class="isSidebarOpen ? 'toggle-button' : ''">
          <IconAngle @click="toggleSidebar" />
        </button>
      </li>
    </ul>
    <h4 :transparent="!isSidebarOpen">{{ name.email }}-{{ name.role }}</h4>
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
      <li v-if="name.role === 'admin'">
        <RouterLink to="/UsersList">
          <div class="flex items-center justify-center">
            <i class="pi pi-clipboard"></i>
          </div>
          <span v-show="isSidebarOpen" class="namePage">Пользователи</span>
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>


<style scoped lang="scss">
@use '../assets/scss/colors' as clr;

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
$toggle-duration: 300ms;
$sidebar-padding-inline-start: 1rem;

aside {
  color: #e3e1e1;
  background: rgba(255, 255, 255, 0.2); // Make sure this color has an opacity of less than 1
  backdrop-filter: blur(1px);
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
