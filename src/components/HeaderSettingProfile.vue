<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'
const store = useCounterStore()

const infoProfile = ref({
  firstname: store.info.firstname,
  lastname: store.info.lastname,
  patronymic: store.info.patronymic,
  department: store.info.department,
  positions: store.info.positions,
})
</script>
<template>
  <div class="title">
    <div class="mr-10">
      <p>{{ infoProfile.lastname }} {{ infoProfile.firstname }} {{ infoProfile.patronymic }}</p>
      <p class="descriptions">{{ infoProfile.positions }}, {{ infoProfile.department }}</p>
    </div>
    <div class="logo">
      <img src="../assets/Ateri.png" alt="logo" width="195" height="64" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.title {
  margin-top: 10px;
  margin-bottom: 15px;
  color: #fff;
  font-size: 24px;
  display: flex;
  width: 100%;
  justify-content: space-between;

  & .descriptions {
    font-size: 14px;
  }
}
</style>
