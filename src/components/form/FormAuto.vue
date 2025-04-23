<script setup lang="ts">
import './style.scss'
import { ref, watch } from 'vue'
import { useCounterStore } from '../../stores/counter'
const store = useCounterStore()

const form = ref({
    email: '',
    password: ''
});

const errors = ref({
    email: '',
    password: ''
});

watch(() => [form.value.email, form.value.password], () => {
    if (form.value.email != '') {
        checkEmail(form.value.email)
    }
    if (form.value.password) {
        checkLength('password', form.value.password, 1, 15);
    }
})

function checkLength(err: any, input: any, min: any, max: any) {
    if (input.length < min) {
        if (err == 'password') {
            errors.value.password = 'меньше чем надо'
        }
    } else if (input.length > max) {
        if (err == 'password') {
            errors.value.password = 'Больше чем надо'
        }
    } else {
        if (err == 'password') {
            errors.value.password = ''
        }
    }
}
function checkEmail(input: any) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.trim())) {
        errors.value.email = ''
    } else {
        errors.value.email = 'Не корректный Email'
    }
}

const validateForm = () => {
    if (!form.value.email) {
        errors.value.email = 'Email обязательно';
    }
    if (!form.value.password) {
        errors.value.password = 'Пароль обязателен';
    }
};

function isEmpty(obj: any) {
    let a = true
    for (const [key, value] of Object.entries(obj)) {
        console.log(value, value == '')
        if (value == '') {
            a = true
        } else {
            a = false
            break
        }
    }
    if (a) toggleFavorite()
}
const handleSubmit = () => {
    validateForm()
    isEmpty(errors.value)
};

const toggleFavorite = () => {
    localStorage.setItem('test', 'value');
    store.registrationCompleted()
}

</script>

<template>
    <div>
        <form @submit.prevent="handleSubmit" class="form">
            <div class="form-control" :class="{ 'error': errors.email }">
                <label for="emailAuto">Email</label>
                <input type="text" v-model="form.email" id="emailAuto" placeholder="Введите email">
                <small v-if="errors.email">{{ errors.email }}</small>
            </div>
            <div class="form-control" :class="{ 'error': errors.password }">
                <label for="passwordAuto">Пароль</label>
                <input type="password" v-model="form.password" id="passwordAuto" placeholder="Введите пароль">
                <small v-if="errors.password">{{ errors.password }}</small>
            </div>
            <button type="submit">Отправить</button>
        </form>
    </div>
</template>