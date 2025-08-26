<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import { useUsersStore } from '../stores/users'
import { useCounterStore } from '../stores/counter'
import { fetchUzers, deleleUser } from '@/http/userAPI'
const name = ref(JSON.parse(localStorage.getItem('role') || ''))

const store = useUsersStore()
const storeUser = useCounterStore()
const deleteProductDialog = ref(false)
const infoJobfunctionsDialog = ref(false)
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
const product = ref()
const jobfunctions = ref(null)

function confirmDeleteProduct(e: any) {
  product.value = store.user?.find((x: any) => x.id === e.id) ?? null
  deleteProductDialog.value = true
}
function confirmInfoPositions(e: any) {
  console.log(e, 'Находим сведения о работе')
  jobfunctions.value = e.jobfunctions
  infoJobfunctionsDialog.value = true
}

const deleteUser = async () => {
  const response = await deleleUser(product.value.id)
  fetchUzers().then((data) => store.registrationCompleted(data))
  deleteProductDialog.value = false
  product.value = {}
}
console.log(store.user, 'смотрим всех юзеров')
</script>

<template>
  <div>
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
          <Column field="id" header="ID" sortable></Column>
          <Column field="department" header="Department"></Column>
          <Column field="fullname" header="Full Name" sortable></Column>
          <Column field="email" header="Email" sortable></Column>
          <Column field="role" header="Role" sortable></Column>
          <Column field="positions" header="Positions" sortable>
            <template #body="slotProps">
              <div @click="confirmInfoPositions(slotProps.data)">
                {{ slotProps.data.positions }}
              </div>
            </template>
          </Column>
          <Column v-if="name.role === 'ADMIN'" header="Действие" :exportable="false">
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

      <Dialog v-model:visible="infoJobfunctionsDialog" :style="{ width: '50%' }" header="Должностные обязанности"
        :modal="true">
        <div class="flex items-center gap-4">
          {{ jobfunctions }}
        </div>
      </Dialog>
    </div>
  </div>
</template>
