<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'
import HeaderSettingProfile from '@/components/HeaderSettingProfile.vue'
const store = useCounterStore()



const imgW = ref({
    imgUrl: import.meta.env.VITE_API_URL
})

console.log(store.info.img, 'смотрим img')


</script>
<template>
    <div class="sidebar">
        <div class="nano">
            <HeaderSettingProfile />
            <div class="wrapper_setting_profile">
                <img :src='imgW.imgUrl + "/" + store.info.img' height="50" width="50">
            </div>
            <!-- <input type="file" @change="previewFiles" multiple /> -->

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
    }

    & .nano {
        padding: 24px;
        background: #44444482;
        border-radius: 10px;
        min-height: 90vh;
    }


}
</style>
