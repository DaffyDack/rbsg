<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from 'primevue/button'
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

import { FilterMatchMode } from '@primevue/core/api';

import { useUsersStore } from '../stores/users'
import { useCounterStore } from '../stores/counter'
import { fetchUzers, deleleUser } from '@/http/userAPI';

const store = useUsersStore()
const storeUser = useCounterStore()

import FormReg from '../components/form/FormReg.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog';

const deleteProductDialog = ref(false)
const product = ref()
const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

onMounted(() => {
  fetchUzers().then(data => store.registrationCompleted(data))
  console.log(storeUser.info.id, 'под кем я зарегался')
})


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function confirmDeleteProduct(e: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product.value = store.user?.find((x: any) => x.id === e.id) ?? null;
  deleteProductDialog.value = true;
}

const deleteUser = async () => {
  const response = await deleleUser(product.value.id)
  fetchUzers().then(data => store.registrationCompleted(data))
  console.log(response, 'что удалили?')
  deleteProductDialog.value = false;
  product.value = {};
}
</script>

<template>
  <div class="container">
    <div>
      <FormReg />
    </div>
    <div class="wrapperTable mt-5">
      <div class="card">
        <DataTable ref="dt" :value="store.user" dataKey="id" :paginator="true" :rows="10" :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Показать от {first} до {last} из {totalRecords} пользователей">
          <template #header>
            <div class="flex flex-wrap gap-2 items-center justify-between">
              <h4 class="m-0">Список пользователей</h4>
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Поиск..." />
              </IconField>
            </div>
          </template>
          <Column field="id" header="ID" sortable style="min-width: 25%"></Column>
          <Column field="email" header="Email" sortable style="min-width: 25%"></Column>
          <Column field="role" header="Role" sortable style="min-width: 25%"></Column>

          <Column header="Действие" :exportable="false" style="min-width: 25%">
            <template #body="slotProps">
              <Button v-if="storeUser.info.id !== slotProps.data.id" icon="pi pi-trash" outlined rounded
                severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </div>

      <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Вы уверены?" :modal="true">
        <div class="flex items-center gap-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span v-if="product">Удалить пользователя <b>{{ product.email }}</b> ?</span>
        </div>
        <template #footer>
          <Button label="Отмена" icon="pi pi-times" text @click="deleteProductDialog = false" />
          <Button label="Удалить" icon="pi pi-check" @click="deleteUser" />
        </template>
      </Dialog>

    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  max-height: 100vh;

  & .wrapperTable {
    & h1 {
      padding: 10px 0;
      color: #fff;
    }
  }
}
</style>
