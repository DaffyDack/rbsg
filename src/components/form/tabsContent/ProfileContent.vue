<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import Select from 'primevue/select';


type ErrorType = 'username' | 'password';

interface Form {
    username: string
    email: string
    password: string
    password2: string
    role: string
    file: string
}

interface Errors {
    username: string
    email: string
    password: string
    password2: string
}

const form = ref<Form>({
    username: '',
    email: '',
    password: '',
    password2: '',
    role: '',
    file: ''
})
const errors = ref<Errors>({
    username: '',
    email: '',
    password: '',
    password2: '',
})

const selectedRole = ref({ name: 'USER', code: 'USER' });
const assignRating = ref(1)
const cities = ref([
    { name: 'USER', code: 'USER' },
    { name: 'ADMIN', code: 'ADMIN' }
]);
const rating = ref([
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
])

const sayHello = () => {
    console.log('hello')
    validateForm()
    isEmpty(errors.value)
}
defineExpose({ sayHello });

// eslint-disable-next-line vue/valid-define-emits
const emit = defineEmits();

const callParent = () => {
    emit('callParentMethod'); // Эмитируем событие
};

function checkLength(err: ErrorType, input: string, min: number, max: number) {
    const messages = {
        username: {
            tooShort: 'меньше чем надо',
            tooLong: 'Больше чем надо',
            valid: ''
        },
        password: {
            tooShort: 'меньше чем надо',
            tooLong: 'Больше чем надо',
            valid: ''
        }
    };

    if (input.length < min) {
        errors.value[err] = messages[err].tooShort;
    } else if (input.length > max) {
        errors.value[err] = messages[err].tooLong;
    } else {
        errors.value[err] = messages[err].valid;
    }
}
function checkEmail(input: string) {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(input.trim())) {
        errors.value.email = ''
    } else {
        errors.value.email = 'Не корректный Email'
    }
}

const validateForm = () => {
    const validations: Array<{ field: keyof Form; message: string }> = [
        { field: 'username', message: 'Имя обязательно' },
        { field: 'email', message: 'Email обязательно' },
        { field: 'password', message: 'Пароль обязателен' },
    ];

    validations.forEach(({ field, message }) => {
        if (!form.value[field]) {
            errors.value[field as keyof Errors] = message;
        }
    });

    if (form.value.password !== form.value.password2) {
        errors.value.password2 = 'Пароль не совпадает';
    }
}

function isEmpty(obj: Record<string, string>) {
    console.log(obj, 'что в обьекте')
    const hasEmptyValue = Object.values(obj).some(value => value === '');
    console.log(hasEmptyValue, 'смотрим что в errros');

    if (hasEmptyValue) {
        callParent()
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function previewFiles(e: any) {
    console.log(e.target.files[0], e.target.files.length)
    form.value.file = e.target.files[0]
}
watch(
    () => [form.value.username, form.value.email, form.value.password, form.value.password2],
    () => {
        if (form.value.username != '') {
            errors.value.username = ''
            checkLength('username', form.value.username, 3, 15)
        }
        if (form.value.email != '') {
            checkEmail(form.value.email)
        }
        if (form.value.password) {
            checkLength('password', form.value.password, 1, 15)
        }
        if (form.value.password2 !== form.value.password) {
            errors.value.password2 = 'Пароль не совподает'
        } else {
            errors.value.password2 = ''
        }
    },
)



</script>

<template>
    <div>
        <div>
            <div class="group_form-control-five">
                <div class="form-control">
                    <label for="last_name">Фамилия</label>
                    <input type="text" id="last_name" placeholder="Фамилия" />
                </div>
                <div class="form-control"
                    :class="{ error: errors.username, success: !errors.username && form.username != '' }">
                    <label for="username">Имя</label>
                    <input type="text" v-model="form.username" id="username" placeholder="Имя" />
                    <small v-if="errors.username">{{ errors.username }}</small>
                </div>

                <div class="form-control">
                    <label for="middle_name">Отчество</label>
                    <input type="text" id="middle_name" placeholder="Отчество" />
                </div>
                <div class="form-control">
                    <label for="middle_name">Пол</label>
                    <select name="pets" id="middle_name">
                        <option value="М">Муж</option>
                        <option value="Ж">Жен</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="birth_day">День рождения</label>
                    <input type="text" id="birth_day" placeholder="Отчество" />
                </div>
            </div>
        </div>
        <div class="group_form-control-four">
            <div class="form-control">
                <label for="mobile_self">Мобильный телефон (личный)</label>
                <input type="text" id="mobile_self" placeholder="Мобильный телефон (личный)" />
            </div>
            <div class="form-control">
                <label for="mobile_work">Мобильный телефон (рабчий)</label>
                <input type="text" id="mobile_work" placeholder="Мобильный телефон (рабочий)" />
            </div>
            <div class="form-control">
                <label for="link_whatsapp">Ссылка на ватсам</label>
                <input type="text" id="link_whatsapp" placeholder="Ссылка на ватсам" />
            </div>
            <div class="form-control">
                <label for="link_telegram">Ссылка на телеграм</label>
                <input type="text" id="link_telegram" placeholder="Ссылка на телеграм" />
            </div>
        </div>
        <div class="group_form-control-tree">
            <div class="form-control">
                <label for="email_self">E-mail личный</label>
                <input type="text" id="email_self" placeholder="E-mail личный" />
            </div>
            <div class="form-control" :class="{ error: errors.email, success: !errors.email && form.email != '' }">
                <label for="email">Email</label>
                <input type="email" v-model="form.email" id="email" placeholder="Введите email" />
                <small v-if="errors.email">{{ errors.email }}</small>
            </div>
            <div class="form-control">
                <label for="work_location">Расположение рабочего места</label>
                <input type="text" id="work_location" placeholder="Расположение рабочего места" />
            </div>
        </div>
        <div class="group_form-control-four">
            <div class="form-control"
                :class="{ error: errors.password, success: !errors.password && form.password != '' }">
                <label for="password">Пароль</label>
                <input type="password" v-model="form.password" id="password" placeholder="Введите пароль" />
                <small v-if="errors.password">{{ errors.password }}</small>
            </div>

            <div class="form-control"
                :class="{ error: errors.password2, success: !errors.password2 && form.password2 != '' }">
                <label for="password2">Повторите пароль</label>
                <input type="password" v-model="form.password2" id="password2" placeholder="Повторите пароль" />
                <small v-if="errors.password2">{{ errors.password2 }}</small>
            </div>

            <div class="form-control">
                <label for="selctRole">Роль пользователя</label>
                <Select v-model="selectedRole" id="selctRole" :options="cities" optionLabel="name" placeholder="USER"
                    class="w-full " />
            </div>
            <div class="form-control">
                <label for="assignRating">Присвоить рейтинг</label>
                <Select v-model="assignRating" id="assignRating" :options="rating" optionLabel="name" placeholder="1"
                    class="w-full " />
            </div>
        </div>

        <div class="form-control">
            <label for="selctFile">Грузим фото</label>
            <input type="file" id="selctFile" @change="previewFiles" multiple />
        </div>
    </div>
</template>