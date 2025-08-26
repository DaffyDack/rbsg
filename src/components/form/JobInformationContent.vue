<script setup lang="ts">
import { ref, watch, defineEmits, onMounted } from 'vue'
import { checkLength } from '../../utils/helper.js'
import Select from 'primevue/select'
import Calendar from 'primevue/calendar';

import { fetchDepartment, fetchPosts } from '../../http/userAPI.js'
interface ItemPosts {
    post: string;
}

const props = defineProps(['check'])
const departments = ref()
const posts = ref<ItemPosts[]>([]);

onMounted(() => {
    // usersString.value = JSON.parse(localStorage.getItem('users') ?? '[]')
    fetchDepartment().then((data) => {
        departments.value = data
    })
    fetchPosts().then((data) => {
        posts.value = data
    })
})
const test = ref()
const emit = defineEmits()
interface Company {
    name: string
    code: string
}
interface Errors {
    startDate: string
}
interface Form {
    company: Company
    brand: Company
    department: Company
    positions: Company
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
}


const form = ref<Form>({
    company: { name: 'TOYOTA', code: 'BMW' },
    brand: { name: 'Land Cruiser', code: 'Land Cruiser' },
    department: { name: 'IT отдел', code: 'IT отдел' },
    positions: { name: 'Генеральный директор', code: 'Генеральный директор' },
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
                    <Select v-model="form.department" id="jobInformationPost" :options="departments"
                        optionLabel="department" placeholder="Отдел" class="w-full" />
                </div>
                <div class="form-control">
                    <label for="jobInformationPost">Должность</label>
                    <Select v-model="form.positions" id="jobInformationPost" :options="posts" optionLabel="post"
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
                    <Calendar type="text" v-modal="form.probationPeriod" style="width: 100%"
                        id="jobInformationProbationPeriodUntil" placeholder="Испытательный срок до"
                        dateFormat="dd/mm/yy" />
                </div>
            </div>
            <div class="italic">Совмещение</div>
            <div class="special">
                <div class="group_form-control-five-evenly">
                    <div class="form-control">
                        <label for="jobInformationPostCombining">Должность</label>
                        <select name="pets" id="jobInformationPostCombining">
                            <option value="ООО «РБС ГРУПП»">Директор</option>
                            <option value="ООО «КРАФТЕР»">Художник</option>
                            <option value="ИП Т">Программист</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label for="jobInformationCompanyCombining">Компания</label>
                        <select name="pets" id="jobInformationCompanyCombining">
                            <option value="Генеральный директор">Ozon</option>
                            <option value="Испольнительный директор">Яндекс</option>
                            <option value="Финансовый директор">Ламода</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label for="jobInformationBrandCombining">Бренд</label>
                        <select name="pets" id="jobInformationBrandCombining">
                            <option value="Nike">Nike</option>
                            <option value="IKEA">IKEA</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label for="jobInformationDepartmentCombining">Отдел</label>
                        <select name="pets" id="jobInformationDepartmentCombining">
                            <option value="Генеральный директор">Следственные подразделения и дознание</option>
                            <option value="Испольнительный директор">Криминальная полиция</option>
                            <option value="Финансовый директор">Полиция общественной безопасности</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label for="jobInformationStartDateCombination">Дата начала совмещения</label>
                        <Calendar type="text" style="width: 100%" id="jobInformationStartDateCombination"
                            placeholder="dd/mm/yy" />
                    </div>
                </div>
                <div class="group_form-control-four">
                    <div class="form-control">
                        <label for="jobInformationCompanyCombining2">Компания</label>
                        <select name="pets" id="jobInformationCompanyCombining2">
                            <option value="BMW">BMW</option>
                            <option value="AUDI">AUDI</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label for="jobInformationBrandCombining2">Бренд</label>
                        <select name="pets" id="jobInformationBrandCombining2">
                            <option value="Nike">Nike</option>
                            <option value="IKEA">IKEA</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label for="jobInformationDepartmentCombining2">Отдел</label>
                        <select name="pets" id="jobInformationDepartmentCombining2">
                            <option value="Убойный">Убойный</option>
                            <option value="Оперативный">Оперативный</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label for="jobInformationProbationPeriod">Испытательный срок до</label>
                        <input type="text" id="jobInformationProbationPeriod" placeholder="Испытательный срок до" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.special {
    padding-left: 10px;
    border-left: 2px solid #000;
}

.italic {
    font-style: italic;
}
</style>
