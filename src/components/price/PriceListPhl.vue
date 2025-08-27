<script setup lang="ts">
import { ref, type Ref,computed,watchEffect} from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps<{ items: Array<Record<string, any>> }>();
const selectedValues = ref({});
const filteredOptions = ref({});
// const uniqueKeys = ref<string[]>([]);





const getUniqueKeys = (items: Array<Record<string, any>>) => {
    if (items.length > 0) {
        return Object.keys(items[1]); 
    }
    return [];
};
const uniqueKeys = computed(()=> {
    return getUniqueKeys(props.items).slice(0, -4)
})
   watchEffect(() => {
         uniqueKeys.value.forEach(key => {
             filteredOptions.value[key] = [...new Set(props.items
                 .filter(product => {
                     return Object.keys(selectedValues.value).every(filterKey => 
                         !selectedValues.value[filterKey] || product[filterKey] === selectedValues.value[filterKey]
                     );
                 })
                 .map(product => product[key]))];
         });
     });

    uniqueKeys.value.forEach(key => {
        filteredOptions.value[key] = [...new Set(props.items.map(product => product[key]))];
    });

    const updateFilteredOptions = () => {
    uniqueKeys.value.forEach(key => {
        filteredOptions.value[key] = [...new Set(props.items.map(product => product[key]))];
    });
};

//     const filterOptions = (changedKey) => {
//         const selectedFilters = Object.keys(selectedValues.value)
//         .filter(key => selectedValues.value[key])
//         .reduce((acc, key) => {
//         acc[key] = selectedValues.value[key];
//         return acc;
//         }, {});


//      uniqueKeys.forEach(key => {
//             filteredOptions.value[key] = [...new Set(props.items
//             .filter(product => {
//                 return Object.keys(selectedFilters).every(filterKey => product[filterKey] === selectedFilters[filterKey]);
//             })
//             .map(product => product[key]))];
//         });
// };

    const filteredProducts = computed(() => {
        return props.items.filter(product => {
            return Object.keys(selectedValues.value).every(key => {
            return !selectedValues.value[key] || product[key] === selectedValues.value[key];
            });
        });
    });

    console.log(filteredProducts.value)
</script>





<template lang="">
    <div>форма для листового</div>

    <div class="grid-container">
        <div class="table_select" v-for="(key, index) in uniqueKeys" :key="index">
            <label :for="key">{{ key }}</label>
            <select :id="key" v-model="selectedValues[key]" @change="filterOptions(key)">
               
                <option v-for="value in filteredOptions[key]" :key="value" :value="value">{{ value }}</option>
            </select>
        </div>
     </div>
     <DataTable :value="filteredProducts" class="p-datatable-striped">
        <Column v-for="(key, index) in uniqueKeys" :key="index" :field="key" :header="key"></Column>
    </DataTable>
</template>


<style lang="scss">
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
    gap: 16px;
}

.table_select {
    text-align: center;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}


label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px; 
    appearance: none; 
    background-color: white;
}
</style>