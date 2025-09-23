<script setup lang="ts">

import MultiSelect from 'primevue/multiselect';
import {ref} from 'vue';

const {items} = defineProps(['items']);


const selectedOptions = ref()
const SelectedForm = ref()

</script>
<template >

         <select  v-model="SelectedForm">
                <option  placeholder="выбор формы ">{{ }}</option>
            </select>
         <div class="card flex justify-content-center">
          <MultiSelect v-model="selectedOptions" variant="filled" optionLabel="name" placeholder="выбор обработки "
            :maxSelectedLabels="1" class="w-full md:w-20rem" />
        </div>
     <div class="card flex justify-content-center">
          <MultiSelect v-model="selectedOptions" variant="filled" optionLabel="name" placeholder="выбор упаковки и доставки"
            :maxSelectedLabels="1" class="w-full md:w-20rem" />
        </div>
</template>
<style lang="scss">
    
</style>