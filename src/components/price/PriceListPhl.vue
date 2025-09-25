<script setup lang="ts">
import { ref, type Ref,computed,watchEffect, watch} from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { Products } from './DatePrice.vue';



const props = defineProps<{ 
     items:  Products[],
     curs: number|string;
     initialPrice: number|string}>();


const selectedValues = ref();
const filteredOptions = ref();
const smallWholesale = 10;
const wholesale = 20;
const dealersale = 30;




const getUniqueKeys = (items: Products[]) => {
    if (items.length > 0) {
        return Object.keys(items[1]); 
    }
    return [];
};
const uniqueKeys = computed(()=> {
    return getUniqueKeys(props.items).slice(0, 9)
})

const uniqueKeysTable = computed(()=> {
    return getUniqueKeys(props.items)
})

   watchEffect(() => {
         uniqueKeys.value.forEach(key => {
             filteredOptions.value[key] = [...new Set(props.items
                 .filter(product => {
                     return Object.keys(selectedValues.value).every(filterKey => 
                         !selectedValues.value[filterKey] || product[filterKey as keyof Products] === selectedValues.value[filterKey]
                     );
                 })
                 .map(product => product[key as keyof Products]))];
         });
     });

    uniqueKeys.value.forEach(key => {
        filteredOptions.value[key] = [...new Set(props.items.map(product => product[key as keyof Products]))];
    });

    const updateFilteredOptions = () => {
        uniqueKeys.value.forEach(key => {
            const selectedKeys = Object.keys(selectedValues.value).filter(k => selectedValues.value[k]);
            
            filteredOptions.value[key] = [...new Set(props.items
                .filter(product => {
                    return selectedKeys.every(filterKey => 
                        product[filterKey as keyof Products] === selectedValues.value[filterKey]
                    );
                })
                .map(product => product[key as keyof Products ]))];
        });
    };


    watchEffect(() => {
        updateFilteredOptions();
        selectedValues.value = {};
        filteredOptions.value = {}
    });


    const filteredProducts = computed(() => {
    const filtered = props.items.filter(product => {
        return Object.keys(selectedValues.value).every(key => {
            return !selectedValues.value[key] || product[key as keyof Products] === selectedValues.value[key];
        });
    });

    
    filtered.forEach(product => {
        const initiolPrice = props.initialPrice
        const selectCours = Number(initiolPrice)/Number(props.curs)
       
        const price = product.price ;
        const areaInSquareMeters = parseFloat(product.area)

        const totalCost = (Number(price) * selectCours * Number(props.curs)  * areaInSquareMeters) || 0; 
        product.totalCost = totalCost.toFixed(2);
        product.calculateSmallWholesalePrice = (totalCost * (1 - smallWholesale / 100)).toFixed(2);
        product.calculateWholesalePrice = (totalCost * (1 - wholesale / 100)).toFixed(2);
        product.calculateDealerPrice = (totalCost * (1 - dealersale / 100)).toFixed(2);
    });

    return filtered;

    });
     const hasSelectedValues = computed(() => {
    return Object.values(selectedValues.value).some(value => value !== null && value !== '');
    });
    
</script>



<template>
    <div class="grid-container">
        <div class="table_select" v-for="(key, index) in uniqueKeys" :key="index">
            <label :for="key">{{ key }}</label>
            <select :id="key" v-model="selectedValues[key]">
                <option v-for="value in filteredOptions[key]" :key="value" :value="value">{{ value }}</option>
            </select>
        </div>
    </div>
   
    <DataTable v-if="hasSelectedValues" :value="filteredProducts" class="p-datatable-striped">
        <Column v-for="(key, index) in uniqueKeysTable" :key="index" :field="key" :header="key"></Column>
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