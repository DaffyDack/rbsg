<script setup lang="ts">
// import { ref } from 'vue';
// import { ProductService } from '../service/ProductService.js';
import { useUsersStore } from '../stores/users'

const store = useUsersStore()

import FormReg from '../components/form/FormReg.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

</script>

<template>
  <div class="container">
    <div>
      <FormReg />
    </div>
    <div class="wrapperTable">
      <h1>Список пользователей</h1>
      <div class="card">
        <DataTable :value="store.user" tableStyle="min-width: 50rem">
            <Column field="email" header="Email" sortable style="width: 25%"></Column>
            <Column field="password" header="Пароль" sortable style="width: 25%"></Column>
            <Column field="role" header="Роль" sortable style="width: 25%"></Column>
        </DataTable>
    </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .container {
    & .wrapperTable {
      & h1 {
        padding: 10px 0;
        color: #fff;
      }
    }
  }
</style>