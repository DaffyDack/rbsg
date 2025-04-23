<script setup lang="ts">
import FormAuto from './form/FormAuto.vue';
import FormReg from './form/FormReg.vue';

</script>

<template>
    <div class="container">
        <div class="tabs">
            <div class="tab-2">
                <label for="tab2-1" class="tabsLab">Регистрация</label>
                <input id="tab2-1" name="tabs-two" type="radio" checked>
                <div>
                    <FormReg />
                </div>
            </div>
            <div class="tab-2">
                <label for="tab2-2" class="tabsLab">Авторизация</label>
                <input id="tab2-2" name="tabs-two" type="radio">
                <div>
                    <FormAuto/>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

.container {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    width: 400px;
}




// форма валидации

.form {
    padding: 30px 40px;
}

.form-control {
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
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    overflow: hidden;
}

.tabs [class^="tab"] label.tabsLab,
.tabs [class*=" tab"] label.tabsLab {
    color: #ad998b;
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
    border-bottom: 2px solid rgba(239, 237, 239, 0.5);
    cursor: pointer;
    appearance: none;
    display: block;
    width: 100%;
    transition: all 0.3s ease-in-out;
}

.tabs [class^="tab"] [type="radio"]:hover,
.tabs [class^="tab"] [type="radio"]:focus,
.tabs [class*=" tab"] [type="radio"]:hover,
.tabs [class*=" tab"] [type="radio"]:focus {
    border-bottom: 2px solid #ad998b;
}

.tabs [class^="tab"] [type="radio"]:checked,
.tabs [class*=" tab"] [type="radio"]:checked {
    border-bottom: 2px solid #fd264f;
}
.tabs [class^="tab"] [type="radio"]:checked ~ label,
.tabs [class*=" tab"] [type="radio"]:checked ~ label {
    color: #2ecc71;
}   

.tabs [class^="tab"] [type="radio"]:checked+div,
.tabs [class*=" tab"] [type="radio"]:checked+div {
    opacity: 1;
}

.tabs [class^="tab"] [type="radio"]+div,
.tabs [class*=" tab"] [type="radio"]+div {
    display: block;
    opacity: 0;
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