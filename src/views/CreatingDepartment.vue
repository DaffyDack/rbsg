<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Select from 'primevue/select'
import { creadetDepartment } from '../http/userAPI.js'

const usersString = ref()
interface Form {
    fullname: string,
    department: string,
    post: string
    department_description: string,
    department_affiliation: string
}
const form = ref<Form>({
    fullname: '',
    department: '',
    post: '',
    department_description: '',
    department_affiliation: ''
})
const messageCondition = ref<string>('')
const condition = ref<boolean>(false)
const addeduser = ref<boolean>(false)

const existingDepartments = ref([
    { name: 'Администрация', code: '0' },
    { name: 'Тендерный отдел', code: '0-0' }
])

onMounted(() => {
    usersString.value = JSON.parse(localStorage.getItem('users') ?? '[]')
})

const RegistrationDepartment = async (formDepartment: any) => {
    try {
        const formData = new FormData()
        formData.append('fullname', form.value.fullname.firstname)
        formData.append('department', form.value.department)
        formData.append('post', form.value.post)
        formData.append('department_description', form.value.department_description)
        formData.append('department_affiliation', form.value.department_affiliation.name)
        const response = await creadetDepartment(formData)
        condition.value = false
        addeduser.value = true
    } catch (e: any) {
        messageCondition.value = e.response.data.message
        condition.value = true
    }
}

const creadetDepartmentForm = () => {
    RegistrationDepartment(form.value)

}

</script>
<template>
    <div>
        <div>
            <div class="group_form-control-four">
                <div class="form-control">
                    <label for="jobContactTel" style="color: #fff;">Название отдела</label>
                    <input v-model="form.department" type="text" id="jobContactTel" placeholder="Название отдела" />
                </div>
                <div class="form-control">
                    <label for="participant" style="color: #fff;">Участник</label>
                    <Select v-model="form.fullname" id="Participant" :options="usersString" optionLabel="firstname"
                        placeholder="Участник" class="w-full" />
                </div>
                <div class="form-control">
                    <label for="post" style="color: #fff;">Должность</label>
                    <input v-model="form.post" type="text" id="post" placeholder="Должность" />
                </div>
                <div class="form-control">
                    <label for="participant" style="color: #fff;">Пренадлежность к отделу</label>
                    <Select v-model="form.department_affiliation" id="Participant" :options="existingDepartments"
                        optionLabel="name" placeholder="Участник" class="w-full" />
                </div>
            </div>
            <div class="group_form-control">
                <div class="form-control">
                    <label for="department_description" style="color: #fff;">Описание обязаностей</label>
                    <textarea v-model="form.department_description" type="text" id="department_description"
                        placeholder="Описание обязаностей"></textarea>
                </div>
            </div>
            <div class="group_form-control">
                <div>
                    <div v-if="addeduser" class="text-green-600 mb-5">Пользователь добавлен!</div>
                    <div v-if="condition" class="text-red-600 mb-5">{{ messageCondition }}</div>
                </div>
                <button class="saveButton" @click="creadetDepartmentForm">Сохранить</button>
            </div>
        </div>
        <div>
            <h1 style="color: #fff;">
                Тут рисуем древо отделова
            </h1>
        </div>
    </div>
</template>
<style lang="scss">
.saveButton {
    background: #06a80b;
    min-height: 42px;
    min-width: 280px;
    border-radius: 16px;
    margin-right: 15px;
}
</style>