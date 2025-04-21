<script setup lang="ts">

import { ref, watch } from 'vue'
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
        errors.value.email = 'Email is not invalid'
    }
}

const validateForm = () => {
    if (!form.value.username) {
        errors.value.username = 'Username is required';
    }
    if (!form.value.email) {
        errors.value.email = 'Email is required';
    }
    if (!form.value.password) {
        errors.value.password = 'Password is required';
    }
    if (form.value.password !== form.value.password2) {
        errors.value.password2 = 'Passwords do not match';
    }
    // return Object.keys(errors.value).length === 0;
};

function isEmpty(obj: any) {
    let a = true
    for (const [key, value] of Object.entries(obj)) {
        if (value == '') {
            a = true
        } else {
            a = false
        }
    }
    localStorage.setItem('test', 'value');
    localStorage.getItem('test')
    console.log(a)
}


const handleSubmit = () => {
    validateForm()
    isEmpty(errors.value)
};
</script>

<template>
    <div class="container">
        <form @submit.prevent="handleSubmit" class="form">
            <h2>Register With Us</h2>

            <div class="form-control" :class="{ 'error': errors.username }">
                <label for="username">Username</label>
                <input type="text" v-model="form.username" id="username" placeholder="Enter Username">
                <small v-if="errors.username">{{ errors.username }}</small>
            </div>

            <div class="form-control" :class="{ 'error': errors.email }">
                <label for="email">Email</label>
                <input type="text" v-model="form.email" id="email" placeholder="Enter email">
                <small v-if="errors.email">{{ errors.email }}</small>
            </div>

            <div class="form-control" :class="{ 'error': errors.password }">
                <label for="password">Password</label>
                <input type="password" v-model="form.password" id="password" placeholder="Enter password">
                <small v-if="errors.password">{{ errors.password }}</small>
            </div>

            <div class="form-control" :class="{ 'error': errors.password2 }">
                <label for="password2">Confirm Password</label>
                <input type="password" v-model="form.password2" id="password2" placeholder="Enter password again">
                <small v-if="errors.password2">{{ errors.password2 }}</small>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

:root {
    --succes-color: #2ecc71;
    ;
    --error-color: #e74c3c;
}


* {
    box-sizing: border-box;
}

body {

    background-color: #f9fafb;
    font-family: 'Open Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
}

.container {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    width: 400px;
}

h2 {
    text-align: center;
    margin: 0 0 20px;
}

.form {
    padding: 30px 40px;
}

.form-control {
    margin-bottom: 10px;
    padding-bottom: 20px;
    position: relative;
}

.form-control label {
    color: #777;
    display: block;
    margin-bottom: 5px;
}

.form-control input {
    border: 2px solid #f0f0f0;
    border-radius: 4px;
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 14px;
}

.form-control input:focus {
    outline: 0;
    border-color: #777;

}

.form-control.success input {
    border-color: #2ecc71;
}

.form-control.error input {
    border-color: #e74c3c;
}

.form-control small {
    color: #e74c3c;
    position: absolute;
    bottom: 0;
    left: 0;
    visibility: hidden;
}

.form-control.error small {
    visibility: visible;
}

.form button {
    cursor: pointer;
    background-color: #3498db;
    border: 2px solid #3498db;
    border-radius: 4px;
    color: #fff;
    display: block;
    padding: 10px;
    font-size: 16px;
    margin-top: 20px;
    width: 100%;
}
</style>