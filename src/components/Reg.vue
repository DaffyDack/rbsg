<script setup lang="ts">
import { ref, watch } from 'vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
const checked = ref<Boolean>(true)
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

const emit = defineEmits(['toggleFavorite'])

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
    localStorage.setItem('test', 'value');
}


const handleSubmit = () => {
    validateForm()
    isEmpty(errors.value)
};

const toggleFavorite = () => {
    emit('toggleFavorite');
}
</script>

<template>
    <div class="container">
        <div class="tabs">
            <div class="tab-2">
                <label for="tab2-1" class="tabsLab">Регистрация</label>
                <input id="tab2-1" name="tabs-two" type="radio" checked>
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
                            <input type="password" v-model="form.password2" id="password2"
                                placeholder="Повторите пароль">
                            <small v-if="errors.password2">{{ errors.password2 }}</small>
                        </div>

                        <button type="submit" @click="toggleFavorite">Отправить</button>
                    </form>
                </div>
            </div>
            <div class="tab-2">
                <label for="tab2-2" class="tabsLab">Авторизация</label>
                <input id="tab2-2" name="tabs-two" type="radio">
                <div class="form">
                    <h4>Tab Two</h4>
                    <p>Quisque sit amet turpis leo. Maecenas sed dolor mi. Pellentesque varius elit in neque ornare
                        commodo ac non tellus. Mauris id iaculis quam. Donec eu felis quam. Morbi tristique lorem eget
                        iaculis consectetur. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                        inceptos himenaeos. Aenean at tellus eget risus tempus ultrices. Nam condimentum nisi enim,
                        scelerisque faucibus lectus sodales at.</p>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

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

.made-with {
    background: #fd264f;
    color: #fff;
    display: block;
    font-size: 12px;
    line-height: 1em;
    margin: 0;
    padding: 5px 110px;
    position: fixed;
    top: 20px;
    right: -100px;
    text-align: center;
    text-decoration: none;
    transform: rotate(45deg);
}

.documentation {
    color: #fd264f;
}

.tabs {
    display: block;
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: 0;
    overflow: hidden;
}

.tabs [class^="tab"] label.tabsLab,
.tabs [class*=" tab"] label.tabsLab {
    color: #fd264f;
    cursor: pointer;
    display: block;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1em;
    padding: 2rem 0;
    text-align: center;
}

.tabs [class^="tab"] [type="radio"],
.tabs [class*=" tab"] [type="radio"] {
    border-bottom: 1px solid rgba(239, 237, 239, 0.5);
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: block;
    width: 100%;

    transition: all 0.3s ease-in-out;
}

.tabs [class^="tab"] [type="radio"]:hover,
.tabs [class^="tab"] [type="radio"]:focus,
.tabs [class*=" tab"] [type="radio"]:hover,
.tabs [class*=" tab"] [type="radio"]:focus {
    border-bottom: 1px solid #fd264f;
}

.tabs [class^="tab"] [type="radio"]:checked,
.tabs [class*=" tab"] [type="radio"]:checked {
    border-bottom: 2px solid #fd264f;
}

.tabs [class^="tab"] [type="radio"]:checked+div,
.tabs [class*=" tab"] [type="radio"]:checked+div {
    opacity: 1;
}

.tabs [class^="tab"] [type="radio"]+div,
.tabs [class*=" tab"] [type="radio"]+div {
    display: block;
    opacity: 0;
    padding: 2rem 0;
    width: 90%;
    transition: all 0.3s ease-in-out;
}

.tabs .tab-2 {
    width: 50%;
}

.tabs .tab-2 [type="radio"]+div {
    width: 200%;
    margin-left: 200%;
}

.tabs .tab-2 [type="radio"]:checked+div {
    margin-left: 0;
}

.tabs .tab-2:last-child [type="radio"]+div {
    margin-left: 100%;
}

.tabs .tab-2:last-child [type="radio"]:checked+div {
    margin-left: -100%;
}
</style>