<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import { checkLength } from '../../utils/helper.js'
import Select from 'primevue/select'
const props = defineProps(['check'])

const emit = defineEmits()

interface Errors {
    startDate: string
}
interface Form {
    startDate: string
}

const form = ref<Form>({
    company: { name: 'TOYOTA', code: 'BMW' },
    brand: { name: 'Land Cruiser', code: 'Land Cruiser' },
    department: { name: 'Убойный', code: 'Убойный' },
    position: { name: 'Гендир', code: 'Гендир' },
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
    TwoCombiningStartDateOfCombination: ''
})
const kompany = ref([
    { name: 'NIKE', code: 'NIKE' },
    { name: 'IKEA', code: 'IKEA' },
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
                    <select name="pets" id="jobInformationBrand">
                        <option value="Генеральный директор">Генеральный директор</option>
                        <option value="Испольнительный директор">Испольнительный директор</option>
                        <option value="Финансовый директор">Финансовый директор</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="jobInformationDepartment">Отдел</label>
                    <select name="pets" id="jobInformationDepartment">
                        <option value="М">Муж</option>
                        <option value="Ж">Жен</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="jobInformationPost">Должность</label>
                    <select name="pets" id="jobInformationPost">
                        <option value="Генеральный директор">Генеральный директор</option>
                        <option value="Испольнительный директор">Испольнительный директор</option>
                        <option value="Финансовый директор">Финансовый директор</option>
                    </select>
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
