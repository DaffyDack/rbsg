<script setup lang="ts">
import { ref, watch, defineEmits, onMounted } from 'vue'
import { checkLength } from '../../utils/helper.js'
import Select from 'primevue/select'
import Calendar from 'primevue/calendar'

import { fetchDepartment, fetchPosts } from '../../http/userAPI.js'
interface ItemPosts {
  post: string
}

const props = defineProps(['check'])
const departments = ref()
const posts = ref<ItemPosts[]>([])

onMounted(() => {
  fetchDepartment().then((data) => {
    departments.value = data
  })
  fetchPosts().then((data) => {
    posts.value = data
  })
})
const emit = defineEmits()
interface Errors {
  startDate: string
}
interface Form {
  company: string
  brand: string
  department: string
  positions: string
  dateEmployment: string
  startDate: string
  probationPeriod: string
  combiningPosition: string
  combiningCompfny: string
  combiningBrand: string
  combiningDepartment: string
  combiningStartDateOfCombination: string
  TwoCombiningPosition: string
  TwoCombiningCompfny: string
  TwoCombiningBrand: string
  TwoCombiningDepartment: string
  TwoCombiningStartDateOfCombination: string
  startDateCombination: string
}

const form = ref<Form>({
  company: '',
  brand: '',
  department: '',
  positions: '',
  dateEmployment: '',
  startDate: '',
  probationPeriod: '',
  combiningPosition: '',
  combiningCompfny: '',
  combiningBrand: '',
  combiningDepartment: '',
  combiningStartDateOfCombination: '',
  TwoCombiningPosition: '',
  TwoCombiningCompfny: '',
  TwoCombiningBrand: '',
  TwoCombiningDepartment: '',
  TwoCombiningStartDateOfCombination: '',
  startDateCombination: '',
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

const errors = ref<Errors>({
  startDate: '',
})

const combiningForm = ref({
  post: '',
  department: '',
  company: '',
  brand: '',
  dataCombining: ''
})
interface comb {
  id: number
  post: string
  company: string
  department: string
  brand: string
  dataCombining: string
}
const combining = ref<comb[]>([])


const CheckingJobInformationComponent = () => {
  validateForm()
  isEmpty(errors.value)
}

function isEmpty(obj: Record<string, string>) {
  const hasEmptyValue = Object.values(obj).every((value) => value === '')
  if (hasEmptyValue) {
    emit('callParentMethod', form.value)
  } else {
    emit('callErrorProfile', 'JobInformationContent')
  }
}

const validateForm = () => {
  const validations: Array<{ field: keyof Form; message: string }> = [
    { field: 'startDate', message: 'Имя обязательно' },
  ]

  validations.forEach(({ field, message }) => {
    if (!form.value[field]) {
      errors.value[field as keyof Errors] = message
    }
  })
}
const addCombining = () => {
  const newObject = {
    id: new Date().valueOf(),
    post: combiningForm.value.post,
    department: combiningForm.value.department,
    company: combiningForm.value.company,
    brand: combiningForm.value.brand,
    dataCombining: formatDate(combiningForm.value.dataCombining),
  }
  combining.value.push(newObject)
  Object.keys(combiningForm.value).forEach(key => {
    combiningForm.value[key as keyof typeof combiningForm.value] = '';
  });
}
const deleteCombining = (id: any) => {
  combining.value = combining.value.filter(x => x.id != id)
}
function formatDate(dateString: any) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}.${day}.${year}`;
}
watch(
  () => [form.value.startDate],
  () => {
    if (form.value.startDate != '') {
      errors.value.startDate = ''
      errors.value['startDate'] = checkLength('startDate', form.value.startDate, 3, 15)
    }
  },
)

defineExpose({ CheckingJobInformationComponent })
</script>
<template>
  <div>
    <div>
      <div class="group_form-control-four">
        <div class="form-control">
          <label for="jobInformationCompany">Компания</label>
          <Select v-model="form.company" id="jobInformationCompany" :options="kompany" optionLabel="name"
            placeholder="Компания" class="w-full" />
        </div>
        <div class="form-control">
          <label for="jobInformationBrand">Бренд</label>
          <Select v-model="form.brand" id="jobInformationBrand" :options="brand" optionLabel="name"
            placeholder="Компания" class="w-full" />
        </div>
        <div class="form-control">
          <label for="jobInformationDepartment">Отдел</label>
          <Select v-model="form.department" filter id="jobInformationPost" :options="departments"
            optionLabel="department" placeholder="Отдел" class="w-full" />
        </div>
        <div class="form-control">
          <label for="jobInformationPost">Должность</label>
          <Select v-model="form.positions" filter id="jobInformationPost" :options="posts" optionLabel="post"
            placeholder="Должность" class="w-full" />
        </div>
      </div>
      <div class="group_form-control-tree">
        <div class="form-control">
          <label for="jobInformationDateOfficialEmployment">Дата официального трудоустройства</label>
          <Calendar type="text" v-model="form.dateEmployment" style="width: 100%"
            id="jobInformationDateOfficialEmployment" placeholder="Дата официального трудоустройства" />
        </div>
        <div class="form-control"
          :class="{ error: errors.startDate, success: !errors.startDate && form.startDate != '' }">
          <label for="jobInformationStartDate">Дата начала работы</label>
          <Calendar v-model="form.startDate" style="width: 100%" id="jobInformationStartDate"
            placeholder="Дата начала работы" dateFormat="dd/mm/yy" />
          <small v-if="errors.startDate">{{ errors.startDate }}</small>
        </div>
        <div class="form-control">
          <label for="jobInformationProbationPeriodUntil">Испытательный срок до</label>
          <Calendar v-model="form.probationPeriod" style="width: 100%" id="jobInformationProbationPeriodUntil"
            placeholder="Испытательный срок до" dateFormat="dd/mm/yy" />
        </div>
      </div>
      <div class="italic">Совмещение</div>
      <div class="special">
        <div class="group_form-control-five-evenly">
          <div class="form-control">
            <label for="jobInformationPostCombining" id="posts">Должность</label>
            <Select v-model="combiningForm.post" placeholder="Должность" id="posts" :options="posts" optionLabel="post"
              class="w-full" />
          </div>
          <div class="form-control">
            <label for="jobInformationCompanyCombining">Компания</label>
            <Select v-model="combiningForm.company" id="jobInformationCompanyCombining" :options="kompany"
              optionLabel="name" placeholder="Компания" class="w-full" />
          </div>
          <div class="form-control">
            <label for="jobInformationBrandCombining">Бренд</label>
            <Select v-model="combiningForm.brand" id="jobInformationBrandCombining" :options="brand" optionLabel="name"
              placeholder="Бренд" class="w-full" />
          </div>
          <div class="form-control">
            <label for="jobInformationDepartmentCombining">Отдел</label>
            <Select v-model="combiningForm.department" filter id="jobInformationDepartmentCombining"
              :options="departments" optionLabel="department" placeholder="Отдел" class="w-full" />
          </div>
          <div class="form-control">
            <label for="jobInformationStartDateCombination">Дата начала совмещения</label>
            <Calendar v-model="combiningForm.dataCombining" style="width: 100%" id="jobInformationStartDateCombination"
              dateFormat="dd.mm.yy" placeholder="Дата начала совмещения" />
          </div>
        </div>
      </div>
      <button class="saveButton m-3" @click="addCombining">Добавить восмещение</button>
      <ul class="combining">
        <li v-for="(item, i) in combining" :key="i">
          <div>
            <div>Должность: {{ item.post.post }}</div>
            <div>Отдел: {{ item.department.department }}</div>
            <div>Компания: {{ item.company.name }}</div>
            <div>Бренд: {{ item.brand.name }}</div>
            <div>Дата начала совмещения: {{ item.dataCombining }}</div>
          </div>
          <div>
            <button @click="deleteCombining(item.id)">X</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
.combining {
  & li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #555;
    border-radius: 5px;
    margin: 5px 0;

    & button {
      padding: 10px 30px;
      background: #ee4d4d;
      border-radius: 5px;
    }
  }
}

.special {
  padding-left: 10px;
  border-left: 2px solid #000;
}

.italic {
  font-style: italic;
}
</style>
