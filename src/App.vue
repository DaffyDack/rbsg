<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import Reg from './components/RegComponents.vue'
import LeftMenu from './components/LeftMenu.vue'
import { useCounterStore } from './stores/counter'
const store = useCounterStore()

import { useRouter } from 'vue-router'



const router = useRouter()

const componentKey = ref(0)


onMounted(() => {
  console.log('name', JSON.parse(localStorage.getItem('test') || '""'))
  router.push({ path: '/' })
  if (localStorage.getItem('test')) {
    store.registrationCompleted()
  }
})

function incrCounter () {
  componentKey.value++
}



</script>

<template>
  <header>
    <div v-if="store.reg" class="wrapper flex items-center justify-center h-screen">
      <Reg />
    </div>
    <div v-else class="wrapper flex items-stretch">
      <div>
        <LeftMenu :key="componentKey" @counter-event="incrCounter"/>
        
      </div>
      <div class="p-10">
        <RouterView />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use './assets/scss/colors' as clr;

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

//form</style>
