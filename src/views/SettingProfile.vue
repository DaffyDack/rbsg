<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'

import Button from 'primevue/button';

import HeaderSettingProfile from '@/components/HeaderSettingProfile.vue'
const store = useCounterStore()



const imgW = ref({
    imgUrl: import.meta.env.VITE_API_URL
})
const infoProfile = ref({
    img: store.info.img,
    id: store.info.id,
    email: store.info.email,
    role: store.info.role,
    gender: store.info.gender,
    company: store.info.company,
    locations: store.info.locations,
    jobfunctions: store.info.jobfunctions,
    mobilephone: store.info.mobilephone,
    workphone: store.info.workphone,
    telegram: store.info.telegram,
    datebirth: store.info.datebirth,
})

</script>
<template>
    <div class="sidebar">
        <div class="nano">
            <HeaderSettingProfile />
            <div class="wrapper_setting_profile">
                <div class="container">
                    <div class="е1">
                        <div class="img">
                            <img :src='imgW.imgUrl + "/" + infoProfile.img'>
                        </div>
                        <div class="title">
                            Какие то данные
                        </div>
                        <div class="des">
                            <div>{{ infoProfile.gender }}</div>
                            <div>{{ infoProfile.company }}</div>
                        </div>
                    </div>
                    <div class="е2 info">
                        <label for="tel">Мобильный телефон</label>
                        <p>{{ infoProfile.mobilephone }}</p>
                        <label for="tel">Мобильный телефон (личный)</label>
                        <p>mabile</p>
                        <label for="tel">Рабочий телефон</label>
                        <p>{{ infoProfile.workphone }}</p>
                        <label for="tel">Почта</label>
                        <p>{{ infoProfile.email }}</p>
                        <label for="tel">Дата рождения</label>
                        <p>{{ infoProfile.datebirth }}</p>
                    </div>
                    <div class="е3">
                        Какие то данные
                    </div>
                    <div class="е4 info">
                        <label>Должностные функции</label>
                        <p>{{ infoProfile.jobfunctions }}</p>
                    </div>
                    <div class="е6">
                        <span>Личные данный:
                            <Button class="ml-2" label="паспорт.pdf" severity="secondary" icon="pi pi-check" />
                            <Button class="ml-2" label="Водительское удостоверение.pdf" severity="secondary"
                                icon="pi pi-check" />
                            <Button class="ml-2" label="СНИЛС.pdf" severity="secondary" icon="pi pi-check" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.sidebar {
    width: -webkit-fill-available;
    position: absolute;
    transition: all 0.3s ease-in-out;
    z-index: 100;
    margin-right: 40px;

    .wrapper_setting_profile {
        max-height: 66vh;
        overflow: scroll;
        display: flex;
        justify-content: center;

        & .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 0.7fr 0.8fr 0.6fr 0.7fr;
            gap: 10px 10px;
            grid-auto-flow: row;
            grid-template-areas:
                "е1 е3"
                "е2 е3"
                "е4 е4"
                "е6 е6";

            >div {
                background: #fff;
                border-radius: 15px;
                padding: 24px;
            }
        }

        & .info {
            label {
                font-size: 14px;
            }

            p {
                font-size: 16px;
                font-weight: bold;
            }
        }

        & .е1 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            gap: 10px 10px;
            grid-auto-flow: row;
            grid-template-areas:
                "img des"
                "img des"
                "title des";
            grid-area: е1;
        }

        & .img {
            grid-area: img;
            border-radius: 15px;
            overflow: hidden;
        }

        & .title {
            grid-area: title;
        }

        & .des {
            grid-area: des;
        }

        & .е2 {
            grid-area: е2;
        }

        & .е3 {
            grid-area: е3;
        }

        & .е4 {
            grid-area: е4;
        }

        & .е6 {
            grid-area: е6;
        }




    }

    & .nano {
        padding: 24px;
        background: #44444482;
        border-radius: 10px;
        min-height: 90vh;
    }


}
</style>
