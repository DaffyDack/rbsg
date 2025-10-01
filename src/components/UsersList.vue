<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
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
import Select from 'primevue/select'
import Password from 'primevue/password'
import Calendar from 'primevue/calendar'
import InputMask from 'primevue/inputmask'

import { fetchDepartment, fetchPosts, changeInfoUser } from '../http/userAPI.js'
import { checkEmail, checkLength } from '../utils/helper.js'
const store = useUsersStore()
const storeUser = useCounterStore()
const usersString = ref()
const name = ref(JSON.parse(localStorage.getItem('role') || ''))
const currentDate = new Date();
const year90YearsAgo = currentDate.getFullYear() - 90;
const date90YearsAgo = new Date(year90YearsAgo, currentDate.getMonth(), currentDate.getDate());
const minDate = ref(date90YearsAgo)
const maxDate = ref(new Date())
const imgW = ref({
  imgUrl: import.meta.env.VITE_API_URL,
})

interface ItemPosts {
  post: string
}
interface Email {
  email: string;
}
interface Errors {
  password: string
  password2: string
}
interface comb {
  id: number
  post: string
  company: string
  department: string
  brand: string
  dataCombining: string
}
interface Form {
  department: ''
  positions: ''
  firstname: string
  lastname: string
  patronymic: string
  email: string
  locations: string
  mobilephone: string
  workphone: string
  datebirth: any
  password: string
  password2: string
  file: string
  role: string
  rating: string
  gender: string
  jobfunctions: string
}
const messageCondition = ref<string>('')
const condition = ref<boolean>(false)
const product = ref()
const jobfunctions = ref(null)
const departments = ref()
const posts = ref<ItemPosts[]>([])

const cities = ref([
  { name: 'USER', code: 'USER' },
  { name: 'ADMIN', code: 'ADMIN' },
])
const gender = ref([
  { name: 'М', code: 'М' },
  { name: 'Ж', code: 'Ж' },
])
const rating = ref([
  { name: '1', value: 1 },
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
  { name: '5', value: 5 },
  { name: '6', value: 6 },
  { name: '7', value: 7 },
  { name: '8', value: 8 },
  { name: '9', value: 9 },
  { name: '10', value: 10 },
])


const deleteUserDialog = ref(false)
const editUserDialog = ref(false)
const infoJobfunctionsDialog = ref(false)
const infoDialogUser = ref(false)
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const form = ref<Form>({
  department: '',
  positions: '',
  firstname: '',
  lastname: '',
  patronymic: '',
  email: '',
  datebirth: '',
  mobilephone: '',
  workphone: '',
  password: '',
  password2: '',
  file: '',
  locations: '',
  role: '',
  rating: '',
  gender: '',
  jobfunctions: '',
})
const errors = ref<Errors>({
  password: '',
  password2: '',
})
const newPassword = ref({
  password: '',
  password2: ''
})
const newEmail = ref<Email>({
  email: ''
})
interface str {
  dataCombining: string
}
const combiningForm = ref({
  post: '',
  department: '',
  company: '',
  brand: '',
  dataCombining: ''
})
const kompany = ref([
  { name: 'РБС ГРУПП', code: 'РБС ГРУПП' },
  { name: 'КРАФТЕР', code: 'КРАФТЕР' },
  { name: 'РБС ГРУПП / КРАФТЕР', code: 'РБС ГРУПП / КРАФТЕР' },
])
const brand = ref([
  { name: 'КРАФТЕР', code: 'КРАФТЕР' },
  { name: 'АТЕРИ', code: 'АТЕРИ' },
])
const addCombining = () => {
  const newObject = {
    id: new Date().valueOf(),
    post: combiningForm.value.post,
    department: combiningForm.value.department,
    company: combiningForm.value.company,
    brand: combiningForm.value.brand,
    dataCombining: formatDate(combiningForm.value.dataCombining),
  }
  product.value.combining.push(newObject)
  Object.keys(combiningForm.value).forEach(key => {
    combiningForm.value[key as keyof typeof combiningForm.value] = '';
  });
}
onMounted(() => {
  usersString.value = JSON.parse(localStorage.getItem('users') ?? '[]')
  fetchDepartment().then((data) => {
    departments.value = data
  })
  fetchPosts().then((data) => {
    posts.value = data
  })
})

function confirmDeleteUser(e: any) {
  product.value = store.user?.find((x: any) => x.id === e.id) ?? null
  deleteUserDialog.value = true
}
function confirmInfoPositions(e: any) {
  console.log(e, 'Находим сведения о работе')
  jobfunctions.value = e.jobfunctions
  infoJobfunctionsDialog.value = true
}
function confirmInfoUser(e: any) {
  product.value = JSON.parse(JSON.stringify(store.user?.find((x: any) => x.id === e.id) ?? null))
  product.value.combining = JSON.parse(product.value.combining)
  infoDialogUser.value = true
}

const deleteUser = async () => {
  const response = await deleleUser(product.value.id)
  fetchUzers().then((data) => store.registrationCompleted(data))
  deleteUserDialog.value = false
  product.value = {}
}

const editUser = async () => {
  const newObject = new FormData()
  newObject.append('id', product.value.id,)
  newObject.append('firstname', product.value.firstname,)
  newObject.append('lastname', product.value.lastname,)
  newObject.append('patronymic', product.value.patronymic,)
  newObject.append('gender', product.value.gender.name ?? product.value.gender)
  newObject.append('datebirth', product.value.datebirth,)
  newObject.append('mobilephone', product.value.mobilephone,)
  newObject.append('workphone', product.value.workphone,)
  newObject.append('department', product.value.department.department ?? product.value.department,)
  newObject.append('positions', product.value.positions.post ?? product.value.positions,)
  newObject.append('role', product.value.role.name ?? product.value.role,)
  newObject.append('img', product.value.img,)
  newObject.append('rating', product.value.rating.name ?? product.value.rating,)
  newObject.append('email', newEmail.value.email == product.value.email ? '' : newEmail.value.email,)
  newObject.append('password', newPassword.value.password,)
  newObject.append('director', product.value.director.fullname ?? product.value.director,)
  newObject.append('combining', JSON.stringify(product.value.combining),)
  newObject.append('fullname', product.value.firstname + ' ' + product.value.lastname + ' ' + product.value.patronymic)
  try {
    const response = await changeInfoUser(newObject)
    fetchUzers().then((data) => store.registrationCompleted(data))
    editUserDialog.value = false
    product.value = {}
    newEmail.value.email = ''
  } catch (error: any) {
    console.log(error.response.data, '!!!!')
    messageCondition.value = error.response.data.message
    condition.value = true
    console.log(error.response.data.message)
  }
}
function confirmEditUser(e: any) {
  product.value = JSON.parse(JSON.stringify(store.user?.find((x: any) => x.id === e.id) ?? null))
  product.value.combining = JSON.parse(product.value.combining)
  editUserDialog.value = true
}
function previewFiles(event: any) {
  product.value.img = event.target.files[0]
}
// function set() {
//   setTimeout(() => {
//     addeduser.value = false
//   }, 2000)
// }
function formatDate(dateString: any) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}.${day}.${year}`;
}
const deleteCombining = (id: any) => {
  product.value.combining = product.value.combining.filter((x: { id: any }) => x.id != id)
}
watch(
  () => [
    newPassword.value.password,
    newPassword.value.password2
  ],
  () => {
    if (newPassword.value.password) {
      errors.value['password'] = checkLength('password', newPassword.value.password, 1, 15)
    }
    if (newPassword.value.password2 !== newPassword.value.password) {
      errors.value.password2 = 'Пароль не совподает'
    } else {
      errors.value.password2 = ''
    }
  },
)
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
          <Column field="department" header="Отдел" sortable></Column>
          <Column field="fullname" header="Имя" sortable>
            <template #body="slotProps">
              <div @click="confirmInfoUser(slotProps.data)">
                {{ slotProps.data.fullname }}
              </div>
            </template>
          </Column>
          <Column field="email" header="Email" sortable></Column>
          <Column field="role" header="Роль" sortable></Column>
          <Column field="positions" header="Должность" sortable>
            <template #body="slotProps">
              <div @click="confirmInfoPositions(slotProps.data)">
                {{ slotProps.data.positions }}
              </div>
            </template>
          </Column>
          <Column v-if="name.role === 'ADMIN'" header="Действие" :exportable="false">
            <template #body="slotProps">
              <Button class="mr-2" icon="pi pi-pencil" outlined rounded severity="warn"
                @click="confirmEditUser(slotProps.data)" />
              <Button v-if="storeUser.info.id !== slotProps.data.id" icon="pi pi-trash" outlined rounded
                severity="danger" @click="confirmDeleteUser(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </div>

      <Dialog v-model:visible="deleteUserDialog" :style="{ width: '450px' }" header="Вы уверены?" :modal="true">
        <div class="flex items-center gap-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span v-if="product">Удалить пользователя <b>{{ product.email }}</b> ?</span>
        </div>
        <template #footer>
          <Button label="Отмена" icon="pi pi-times" text @click="deleteUserDialog = false" />
          <Button label="Удалить" icon="pi pi-check" @click="deleteUser" />
        </template>
      </Dialog>
      <Dialog v-model:visible="editUserDialog" :style="{ width: '80%' }" header="Редактирование пользователя"
        :modal="true">
        <div class="">
          <div>
            <div class="group_form-control-five">
              <div class="form-control">
                <label for="last_name">Фамилия</label>
                <input type="text" v-model="product.lastname" id="last_name" placeholder="Фамилия" />
              </div>
              <div class="form-control">
                <label for="firstname">Имя</label>
                <input type="text" v-model="product.firstname" id="firstname" placeholder="Имя" />
              </div>
              <div class="form-control">
                <label for="middle_name">Отчество</label>
                <input type="text" v-model="product.patronymic" id="middle_name" placeholder="Отчество" />
              </div>
              <div class="form-control">
                <label for="middle_name">Пол</label>
                <Select v-model="product.gender" id="middle_name" :options="gender" optionLabel="name"
                  :placeholder="product.gender" class="w-full" />
              </div>
              <div class="form-control">
                <label for="birth_day">Дата рождения</label>
                <Calendar v-model="product.datebirth" style="width: 100%" id="birth_day" placeholder="День рождения"
                  dateFormat="dd/mm/yy" :minDate="minDate" :maxDate="maxDate" :manualInput="false" />
              </div>
            </div>
          </div>
          <div class="group_form-control-four">
            <div class="form-control">
              <label for="mobile_self">Мобильный телефон (личный)</label>
              <InputMask type="text" mask="+7 999-999-9999" id="mobile_self" v-model="product.mobilephone"
                placeholder="Мобильный телефон (личный)" />
            </div>
            <div class="form-control">
              <label for="mobile_work">Мобильный телефон (рабчий)</label>
              <InputMask type="text" mask="+7 999-999-9999" id="mobile_work" v-model="product.workphone"
                placeholder="Мобильный телефон (рабочий)" />
            </div>
            <div class="form-control">
              <label for="jobInformationDepartment">Отдел</label>
              <Select v-model="product.department" filter id="jobInformationPost" :options="departments"
                optionLabel="department" :placeholder="product.department" class="w-full" />
            </div>
            <div class="form-control">
              <label for="jobInformationPost">Должность</label>
              <Select v-model="product.positions" filter id="jobInformationPost" :options="posts" optionLabel="post"
                :placeholder="product.positions" class="w-full" />
            </div>

          </div>
          <div class="group_form-control-four">
            <div class="form-control">
              <label for="email_self">E-mail личный</label>
              <input type="text" id="email_self" placeholder="E-mail личный" />
            </div>
            <div class="form-control">
              <label for="email">Email</label>
              <input type="email" v-model="newEmail.email" id="email" :placeholder="product.email" />
            </div>
            <div class="form-control">
              <label for="work_location">Рабочее место</label>
              <input type="text" id="work_location" v-model="product.locations"
                placeholder="Расположение рабочего места" />
            </div>
            <div class="form-control">
              <label for="director">Руководитель</label>
              <Select v-model="product.director" id="director" filter :options="usersString" optionLabel="fullname"
                :placeholder="product.director" class="w-full" />
            </div>
          </div>
          <div class="group_form-control-four">
            <div class="form-control"
              :class="{ error: errors.password, success: !errors.password && form.password != '' }">
              <label for="passwordEdit">Пароль</label>
              <div id="passwordEdit">
                <Password class="w-[100%]" v-model="newPassword.password" variant="filled" placeholder="Введите пароль"
                  toggleMask />
                <small v-if="errors.password">{{ errors.password }}</small>
              </div>
            </div>

            <div class="form-control"
              :class="{ error: errors.password2, success: !errors.password2 && form.password2 != '' }">
              <label for="password2">Повторите пароль</label>
              <input type="password" v-model="newPassword.password2" id="password2" placeholder="Повторите пароль" />
              <small v-if="errors.password2">{{ errors.password2 }}</small>
            </div>

            <div class="form-control">
              <label for="selctRole">Роль пользователя</label>
              <div id="selctRole">
                <Select v-model="product.role" :options="cities" optionLabel="name" :placeholder="product.role"
                  class="w-full" />
              </div>
            </div>
            <div class="form-control">
              <label for="assignRating">Присвоить рейтинг</label>
              <Select v-model="product.rating" id="assignRating" :options="rating" optionLabel="name"
                :placeholder="product.rating" class="w-full" />
            </div>
          </div>
          <div>
            <div class="form-control">
              <div v-if="condition" class="text-red-600 mb-5">{{ messageCondition }}</div>
            </div>
          </div>
          <div class="form-control">
            <label for="selctFile">Загрузить фото</label>
            <input type="file" ref="upload" id="selctFile" @change="previewFiles" />
          </div>

          <div class="form-control">
            <label for="selctFile">Совмещение</label>
            <div class="special">
              <div class="group_form-control-five-evenly">
                <div class="form-control">
                  <label for="jobInformationPostCombining" id="posts">Должность</label>
                  <Select v-model="combiningForm.post" placeholder="Должность" id="posts" :options="posts"
                    optionLabel="post" class="w-full" />
                </div>
                <div class="form-control">
                  <label for="jobInformationCompanyCombining">Компания</label>
                  <Select v-model="combiningForm.company" id="jobInformationCompanyCombining" :options="kompany"
                    optionLabel="name" placeholder="Компания" class="w-full" />
                </div>
                <div class="form-control">
                  <label for="jobInformationBrandCombining">Бренд</label>
                  <Select v-model="combiningForm.brand" id="jobInformationBrandCombining" :options="brand"
                    optionLabel="name" placeholder="Бренд" class="w-full" />
                </div>
                <div class="form-control">
                  <label for="jobInformationDepartmentCombining">Отдел</label>
                  <Select v-model="combiningForm.department" filter id="jobInformationDepartmentCombining"
                    :options="departments" optionLabel="department" placeholder="Отдел" class="w-full" />
                </div>
                <div class="form-control">
                  <label for="jobInformationStartDateCombination">Дата начала совмещения</label>
                  <Calendar v-model="combiningForm.dataCombining as any" style="width: 100%"
                    id="jobInformationStartDateCombination" dateFormat="dd.mm.yy"
                    placeholder="Дата начала совмещения" />
                </div>
              </div>
            </div>
            <button class="saveButton m-3 text-white" @click="addCombining">Добавить совмещение</button>
            <ul class="combining">
              <li v-for="(item, i) in product.combining" :key="i">
                <div>Должность: {{ item.post.post }}</div>
                <div>Отдел: {{ item.department.department }}</div>
                <div>Компания: {{ item.company.name }}</div>
                <div>Бренд: {{ item.brand.name }}</div>
                <div>Дата начала совмещение: {{ item.dataCombining }}</div>
                <div>
                  <button @click="deleteCombining(item.id)">X</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <template #footer>
          <Button label="Отмена" icon="pi pi-times" text @click="editUserDialog = false" />
          <Button label="Изменить" icon="pi pi-check" @click="editUser" />
        </template>
      </Dialog>

      <Dialog v-model:visible="infoDialogUser" header="Инфа о пользователе" :style="{ width: '763px', height: '100vh' }"
        position="right" :modal="true" :draggable="false">
        <div class="wrapperFromInfoUser">

          <div class="namePage flex">
            <div class="photoWrapper">
              <div>
                <div class="img" :style="{ backgroundImage: 'url(' + imgW.imgUrl + '/' + product.img + ')' }">
                  <div v-if="product.role === 'ADMIN'" class="admin">Администратор</div>
                </div>
              </div>
              <div class="buttonFromPhoto">
                <button>Чат</button>
                <button>Совещание</button>
              </div>
            </div>
            <div>
              <div>ФИО: {{ product.fullname }}</div>
              <div>День рждения: {{ formatDate(product.datebirth) }}</div>
              <div>Почта: {{ product.email }}</div>
              <div>Номер телфона: {{ product.workphone }}</div>
              <div>Номер телфона личный: {{ product.mobilephone }}</div>
              <div>Должность: {{ product.positions }}</div>
              <div>Отдел: {{ product.department }}</div>
              <div>Руководитель: {{ product.director }}</div>
              <div>Рейтинг: {{ product.rating }}</div>
            </div>
          </div>
          <div class="additionalInformation">
            <h1 class="mb-4">Дополнительная информация</h1>
            <div>
              <div>Совмещение:
                <ul>
                  <li v-for="(item, index) in product.combining" :key="index">
                    <div>Должность: {{ item.post.post }}</div>
                    <div>Отдел: {{ item.department.department }}</div>
                    <div>Компания: {{ item.company.name }}</div>
                    <div>Бренд: {{ item.brand.name }}</div>
                    <div>Дата начала совмещение: {{ item.dataCombining }}</div>
                  </li>
                </ul>
              </div>
              <div>Рабочее место: {{ product.locations }}</div>
              <div>Рабочая группа: {{ product.brand }}</div>
            </div>
          </div>
          <div class="jobfunctions">
            <h1 class="mb-4">Должностные обязанности</h1>
            <p>{{ product.jobfunctions }}</p>
          </div>
        </div>
        <!-- <div class="flex justify-end gap-2">
          <Button type="button" label="Закрыть" @click="infoDialogUser = false"></Button>
        </div> -->
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
<style scoped lang="scss">
.combining {
  & li {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #555;
    border-radius: 5px;
    margin: 5px 0;
    position: relative;

    & button {
      position: absolute;
      top: 5px;
      right: 5px;
      padding: 10px 30px;
      background: #ee4d4d;
      border-radius: 5px;
    }
  }
}

.wrapperFromInfoUser {
  color: #fff;

  .namePage,
  .additionalInformation,
  .jobfunctions {
    background: #5c5b5b;
    padding: 15px;
    border-radius: 16px;
    margin-bottom: 10px;

    li {
      padding: 5px;
      margin: 3px;
      border: 1px solid #fff;
    }

    .photoWrapper {
      display: flex;
      flex-direction: column;
      margin-right: 10px;

      .buttonFromPhoto {
        display: flex;
        justify-content: space-around;

        button {
          padding: 10px;
          margin: 10px;
          background: #ccc;
          border-radius: 16px;
          width: 100%;
        }
      }

      .img {
        border-radius: 16px;
        min-height: 227px;
        min-width: 227px;
        background-size: cover;
        position: relative;

        .admin {
          position: absolute;
          bottom: 0;
          left: 0;
          display: block;
          background: #178FFF;
          background: linear-gradient(45deg, rgba(23, 143, 255, 1) 0%, rgba(255, 51, 228, 1) 100%);
          padding: 3px 20px;
          border-radius: 16px;
          color: #fff;
        }
      }
    }
  }
}
</style>
