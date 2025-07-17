<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import { checkLength } from '../../utils/helper.js'
import Select from 'primevue/select'
const props = defineProps(['check'])
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
    { name: 'ООО "NIKE"', code: 'ООО "NIKE"' },
    { name: 'ООО "IKEA"', code: 'ООО "IKEA"' },
])
const brand = ref([
    { name: 'NIKE', code: 'NIKE' },
    { name: 'IKEA', code: 'IKEA' },
])
const positions = ref([
    { name: 'Генеральный директор', code: 'Генеральный директор' },
    { name: 'Испольнительный директор', code: 'Испольнительный директор' },
    { name: 'Учредитель', code: 'Учредитель' },
    { name: 'Административный директор', code: 'Административный директор' },
    { name: 'Финансовый директор', code: 'Финансовый директор' },
    { name: 'Директор по маркетингу', code: 'Директор по маркетингу' },
    { name: 'Коммерческий директор', code: 'Коммерческий директор' },
    { name: 'Технический директор', code: 'Технический директор' },
    { name: 'Директор по строительству', code: 'Директор по строительству' },
    { name: 'Директор по персоналу', code: 'Директор по персоналу' },
    { name: 'Специалист по кадровому учету', code: 'Специалист по кадровому учету' },
    { name: 'HR менеджер', code: 'HR менеджер' },
    { name: 'Главный бухгалтер', code: 'Главный бухгалтер' },
])
const department = ref([
    { name: 'Администрация', code: '0' },

    { name: 'Административный отдел', code: '0-0' },
    { name: 'Финансовый отдел', code: '0-1' },
    { name: 'Маркетинговый отдел', code: '0-2' },
    { name: 'Коммерческий отдел', code: '0-3' },

    { name: 'Отдел кадров', code: '0-0-0' },
    { name: 'Юридический отдел', code: '0-0-1' },
    { name: 'Отдел АХО', code: '0-0-2' },


    { name: 'Бухгалтерия', code: '0-1-0' },

    { name: 'IT отдел', code: '0-2-0' },
    { name: 'Отдел маркетинго', code: '0-2-1' },

    { name: 'Отдел развития', code: '0-3-0' },
    { name: 'Отдел продаж KRAFTER', code: '0-3-1' },
    { name: 'Отдел продаж листовой HPL', code: '0-3-2' },
    { name: 'Отдел продаж KRAFTER Мебель', code: '0-3-3' },
    { name: 'Отдел продаж Атэри', code: '0-3-4' },
    { name: 'Отдел продаж фурнитура', code: '0-3-5' },
    { name: 'Тендерный отдел', code: '0-3-6' },
    { name: 'Сметно-договорной отдел', code: '0-3-7' },
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
                    <Select v-model="form.department" id="jobInformationPost" :options="department" optionLabel="name"
                        placeholder="Отдел" class="w-full" />
                </div>
                <div class="form-control">
                    <label for="jobInformationPost">Должность</label>
                    <Select v-model="form.positions" id="jobInformationPost" :options="positions" optionLabel="name"
                        placeholder="Должность" class="w-full" />
                </div>
            </div>
            <div class="group_form-control-tree">
                <div class="form-control">
                    <label for="jobInformationDateOfficialEmployment">Дата официального трудоустройства</label>
                    <input type="text" id="jobInformationDateOfficialEmployment"
                        placeholder="Дата официального трудоустройства" />
                </div>
                <div class="form-control"
                    :class="{ error: errors.startDate, success: !errors.startDate && form.startDate != '' }">
                    <label for="jobInformationStartDate">Дата начала работы</label>
                    <input type="text" v-model="form.startDate" id="jobInformationStartDate"
                        placeholder="Дата начала работы" />
                    <small v-if="errors.startDate">{{ errors.startDate }}</small>
                </div>
                <div class="form-control">
                    <label for="jobInformationProbationPeriodUntil">Испытательный срок до</label>
                    <input type="text" id="jobInformationProbationPeriodUntil" placeholder="Испытательный срок до" />
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
                        <input type="text" id="jobInformationStartDateCombination" placeholder="/ __ . __ . ____ /" />
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
