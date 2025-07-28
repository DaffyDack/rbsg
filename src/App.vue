<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import Reg from './components/RegComponents.vue'
import LeftMenu from './components/LeftMenu.vue'
import { useCounterStore } from './stores/counter'
import { useUsersStore } from './stores/users'
import { check } from './http/userAPI'


import ProgressSpinner from 'primevue/progressspinner'

const store = useCounterStore()
const store1 = useUsersStore()

const componentKey = ref(0)
const loading = ref(true)

onMounted(() => {
  check()
    .then((data) => {
      if (localStorage.getItem('role')) {
        store.registrationCompleted()
        store.userInfo(data)
        localStorage.setItem('role', JSON.stringify(data))
      }
    })
    .finally(() => {
      loading.value = false
    })
})


function incrCounter() {
  componentKey.value++
}
</script>

<template>
  <header>
    <div class="card flex justify-center items-center h-screen" v-if="loading">
      <ProgressSpinner />
    </div>
    <div v-else>
      <div v-if="store.reg" class="wrapper flex items-center justify-center h-screen">
        <Reg />
      </div>
      <div v-else class="wrapper flex items-stretch">
        <div>
          <LeftMenu :key="componentKey" @counter-event="incrCounter" />
        </div>
        <div class="p-10 w-[100%] wrapperRouter">
          <RouterView />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use './assets/scss/colors' as clr;

.wrapperRouter {
  

width: 100vw;
height: 100vh;

}

.namePage {
  min-width: 100px;
}

.wrapper {
  background-color: #000;
  // background: linear-gradient(45deg,
  //     rgb(0, 0, 0)100%,
  //     // rgba(7, 62, 137, 1) 35%,
      
  //     #008AFB 100% );
}

$sidebar-width: 4rem;
$toggle-duration: 300ms;
$sidebar-padding-inline-start: 1rem;



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
