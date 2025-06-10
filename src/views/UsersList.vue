<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsersStore } from '../stores/users'
// import UsersList from '@/components/UsersList.vue';
import FormReg from '../components/form/FormReg.vue'
import { fetchUzers } from '@/http/userAPI';

const store = useUsersStore()

onMounted(() => {
  fetchUzers().then(data => store.registrationCompleted(data))
})
</script>

<template>
  <div class="containerUserList">
    <div>
      <FormReg />
    </div>
    <div>
      <!-- <UsersList /> -->
    </div>
  </div>
</template>
<style scoped lang="scss">
.containerUserList {
  max-height: 100vh;

  & .wrapperTable {
    & h1 {
      padding: 10px 0;
      color: #fff;
    }
  }
}
</style>
