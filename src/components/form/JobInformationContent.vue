<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import { checkLength } from '../../utils/helper.js'

const emit = defineEmits();

interface Errors {
    startDate: string
}
interface Form {
    startDate: string
}

const form = ref<Form>({
    startDate: '',
})

const errors = ref<Errors>({
    startDate: '',
})
const CheckingJobInformationComponent = () => {
    validateForm()
    isEmpty(errors.value)
}

function isEmpty(obj: Record<string, string>) {
    const hasEmptyValue = Object.values(obj).every(value => value === '');
    if (hasEmptyValue) {
        emit('callParentMethod', 'test');
    } else {
        emit('callErrorProfile', 'JobInformationContent')
    }
}

const validateForm = () => {
    const validations: Array<{ field: keyof Form; message: string }> = [
        { field: 'startDate', message: 'Имя обязательно' },
    ];

    validations.forEach(({ field, message }) => {
        if (!form.value[field]) {
            errors.value[field as keyof Errors] = message;
        }
    });

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


defineExpose({ CheckingJobInformationComponent });
</script>
<template>
    <div>
        <div>
            <div class="group_form-control-four">
                <div class="form-control">
                    <label for="company">Компания</label>
                    <select name="pets" id="company">
                        <option value="ООО «РБС ГРУПП»">ООО «РБС ГРУПП»</option>
                        <option value="ООО «КРАФТЕР»">ООО «КРАФТЕР»</option>
                        <option value="ИП Т">ИП Т</option>
                        <option value="ИП К">ИП К</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="brand">Бренд</label>
                    <select name="pets" id="brand">
                        <option value="Генеральный директор">Генеральный директор</option>
                        <option value="Испольнительный директор">Испольнительный директор</option>
                        <option value="Финансовый директор">Финансовый директор</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="department">Отдел</label>
                    <select name="pets" id="department">
                        <option value="М">Муж</option>
                        <option value="Ж">Жен</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="post">Должность</label>
                    <select name="pets" id="post">
                        <option value="Генеральный директор">Генеральный директор</option>
                        <option value="Испольнительный директор">Испольнительный директор</option>
                        <option value="Финансовый директор">Финансовый директор</option>
                    </select>
                </div>
            </div>
            <div class="group_form-control-tree">
                <div class="form-control">
                    <label for="DateOfficialEmployment">Дата официального трудоустройства</label>
                    <input type="text" id="DateOfficialEmployment" placeholder="Дата официального трудоустройства" />
                </div>
                <div class="form-control"
                    :class="{ error: errors.startDate, success: !errors.startDate && form.startDate != '' }">
                    <label for="StartDate">Дата начала работы</label>
                    <input type="text" v-model="form.startDate" id="StartDate" placeholder="Дата начала работы" />
                    <small v-if="errors.startDate">{{ errors.startDate }}</small>
                </div>
                <div class="form-control">
                    <label for="ProbationPeriodUntil">Испытательный срок до</label>
                    <input type="text" id="ProbationPeriodUntil" placeholder="Испытательный срок до" />
                </div>
            </div>

        </div>
    </div>
</template>