<script setup lang="ts">
import './style.scss'
import { ref, watch } from 'vue'
import {useCounterStore} from '../../stores/counter'
const store = useCounterStore()

const form = ref({
    username: '',
    email: '',
    password: '',
    password2: ''
});

const errors = ref({
    username: '',
    email: '',
    password: '',
    password2: ''
});

watch(() => [form.value.username, form.value.email, form.value.password, form.value.password2], () => {
    if (form.value.username != '') {
        errors.value.username = ''
        checkLength('username', form.value.username, 3, 15);
    }
    if (form.value.email != '') {
        checkEmail(form.value.email)
    }
    if (form.value.password) {
        checkLength('password', form.value.password, 1, 15);
    }
    if (form.value.password2 !== form.value.password) {
        errors.value.password2 = 'Пароль не совподает'
    } else {
        errors.value.password2 = ''
    }
})

function checkLength(err: any, input: any, min: any, max: any) {
    if (input.length < min) {
        if (err == 'username') {
            errors.value.username = 'меньше чем надо'
        } else if (err == 'password') {
            errors.value.password = 'меньше чем надо'
        }
    } else if (input.length > max) {
        if (err == 'username') {
            errors.value.username = 'Больше чем надо'
        } else if (err == 'password') {
            errors.value.password = 'Больше чем надо'
        }
    } else {
        if (err == 'username') {
            errors.value.username = ''
        } else if (err == 'password') {
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
    if (!form.value.username) {
        errors.value.username = 'Имя обязательно';
    }
    if (!form.value.email) {
        errors.value.email = 'Email обязательно';
    }
    if (!form.value.password) {
        errors.value.password = 'Пароль обязателен';
    }
    if (form.value.password !== form.value.password2) {
        errors.value.password2 = 'Пароль не совпадает';
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
            <div class="form-control" :class="{ 'error': errors.username }">
                <label for="username">Имя</label>
                <input type="text" v-model="form.username" id="username" placeholder="Введите имя">
                <small v-if="errors.username">{{ errors.username }}</small>
            </div>

            <div class="form-control" :class="{ 'error': errors.email }">
                <label for="email">Email</label>
                <input type="text" v-model="form.email" id="email" placeholder="Введите email">
                <small v-if="errors.email">{{ errors.email }}</small>
            </div>

            <div class="form-control" :class="{ 'error': errors.password }">
                <label for="password">Пароль</label>
                <input type="password" v-model="form.password" id="password" placeholder="Введите пароль">
                <small v-if="errors.password">{{ errors.password }}</small>
            </div>

            <div class="form-control" :class="{ 'error': errors.password2 }">
                <label for="password2">Повторите пароль</label>
                <input type="password" v-model="form.password2" id="password2" placeholder="Повторите пароль">
                <small v-if="errors.password2">{{ errors.password2 }}</small>
            </div>

            <button type="submit" >Отправить</button>
        </form>
    </div>
</template>

<style scoped lang="scss">


</style>