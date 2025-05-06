<script setup lang="ts">
// import { ref } from 'vue';
// import { ProductService } from '../service/ProductService.js';
import { useUsersStore } from '../stores/users'

const store = useUsersStore()

import FormReg from '../components/form/FormReg.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


// const products = ref([{
//     id: '1000',
//     code: 'f230fh0g3',
//     name: 'Bamboo Watch',
//     description: 'Product Description',
//     image: 'bamboo-watch.jpg',
//     price: 65,
//     category: 'Accessories',
//     quantity: 24,
//     inventoryStatus: 'INSTOCK',
//     rating: 5
// }]);
// onMounted(() => {
//   ProductService.getProducts().then((data:any) => (products.value = data));
// })
</script>

<template>
  <div>
    <div>
      <FormReg />
    </div>
    <div>
      <h1>Список пользователей</h1>
      <div class="card">
        <DataTable :value="store.user" tableStyle="min-width: 50rem">
            <Column field="email" header="Email" sortable style="width: 25%"></Column>
            <Column field="password" header="Password" sortable style="width: 25%"></Column>
            <Column field="role" header="Role" sortable style="width: 25%"></Column>
        </DataTable>
    </div>
    </div>
  </div>
</template>