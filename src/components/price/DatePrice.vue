<script setup lang="ts">

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {ref, onMounted, computed,watchEffect} from 'vue';
const products = defineProps<{ items: Array<Record<string, any>> }>();

const area = [
    { size: '1840 x 3670', area: '6.753 м2' },
    { size: '1300 x 3050', area: '3.965 м2' },
    { size: '1220 x 3050', area: '3.721 м2' },
    { size: '1220 x 2440', area: '2.976 м2' },
    { size: '1860 x 4300', area: '7.998 м2' },
    { size: '1400 x 4300', area: '6.02 м2' }
];          

const priceLiner = [
    { name: '0.55мм', price: '1.65'},
    { name: '0.6мм', price: '1.75'},
    { name: '0.7мм', price: '2.00'},
    { name: '0.8мм', price: '2.25'},   
    { name: '0.9мм', price: '2.70'},
];
const priceThinPlastic = [
    { name: '0.6мм', price: '2.40',class: 'Однотонные (белый холодный)', type: "Тонкие HPL пластики. Односторонние" },
    { name: '0.7мм', price: '2.70',class: 'Однотонные (белый холодный)' , type: "Тонкие HPL пластики. Односторонние" },
    { name: '0.8мм', price: '3.00',class: 'Однотонные (белый холодный)' , type: "Тонкие HPL пластики. Односторонние" },   
    { name: '0.9мм', price: '3.40',class: 'Однотонные (белый холодный)' , type: "Тонкие HPL пластики. Односторонние" },
    { name: '0.6мм', price: '2.60',class: 'Однотонные' , type: "Тонкие HPL пластики. Односторонние"},
    { name: '0.7мм', price: '2.90',class: 'Однотонные' , type: "Тонкие HPL пластики. Односторонние" },
    { name: '0.8мм', price: '3.20',class: 'Однотонные' , type: "Тонкие HPL пластики. Односторонние" },   
    { name: '0.9мм', price: '3.50',class: 'Однотонные'  , type: "Тонкие HPL пластики. Односторонние"},
    { name: '0.6мм', price: '3.80',class: 'Фактурные (каменные, древесные и прочие)', type: "Тонкие HPL пластики. Односторонние"},
    { name: '0.7мм', price: '3.10',class: 'Фактурные (каменные, древесные и прочие)', type: "Тонкие HPL пластики. Односторонние"},
    { name: '0.8мм', price: '3.40',class: 'Фактурные (каменные, древесные и прочие)', type: "Тонкие HPL пластики. Односторонние"},   
    { name: '0.9мм', price: '3.70',class: 'Фактурные (каменные, древесные и прочие)', type: "Тонкие HPL пластики. Односторонние"},

    { name: '4мм', price: '10.50',class: 'Однотонные (белый холодный)', type: "HPL compact двсуторонний интерьерный"},
    { name: '6мм', price: '14.50',class: 'Однотонные (белый холодный)', type: "HPL compact двсуторонний интерьерный"},
    { name: '8мм', price: '18.50',class: 'Однотонные (белый холодный)', type: "HPL compact двсуторонний интерьерный"},   
    { name: '10мм', price: '23.50',class: 'Однотонные (белый холодный)', type: "HPL compact двсуторонний интерьерный"},
    { name: '12мм', price: '27.50',class: 'Однотонные (белый холодный)', type: "HPL compact двсуторонний интерьерный"},
    { name: '4мм', price: '11.50',class: 'Однотонные (цветные)', type: "HPL compact двсуторонний интерьерный"},
    { name: '6мм', price: '15.50',class: 'Однотонные (цветные)', type: "HPL compact двсуторонний интерьерный"},
    { name: '8мм', price: '19.50',class: 'Однотонные (цветные)', type: "HPL compact двсуторонний интерьерный"},   
    { name: '10мм', price: '24.50',class: 'Однотонные (цветные)', type: "HPL compact двсуторонний интерьерный"},
    { name: '12мм', price: '28.50',class: 'Однотонные (цветные)', type: "HPL compact двсуторонний интерьерный"},
    { name: '4мм', price: '12.50',class: 'Фактурные (каменные, древесные и прочие)', type: "HPL compact двсуторонний интерьерный"},
    { name: '6мм', price: '16.50',class: 'Фактурные (каменные, древесные и прочие)', type: "HPL compact двсуторонний интерьерный"},
    { name: '8мм', price: '20.50',class: 'Фактурные (каменные, древесные и прочие)', type: "HPL compact двсуторонний интерьерный"},   
    { name: '10мм', price: '25.50',class: 'Фактурные (каменные, древесные и прочие)', type: "HPL compact двсуторонний интерьерный"},
    { name: '12мм', price: '29.50',class: 'Фактурные (каменные, древесные и прочие)', type: "HPL compact двсуторонний интерьерный"},

    { name: '4мм', price: '10.50',class: 'Однотонные (белый холодный)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},
    { name: '6мм', price: '14.50',class: 'Однотонные (белый холодный)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},
    { name: '8мм', price: '18.50',class: 'Однотонные (белый холодный)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},   
    { name: '10мм', price: '23.50',class: 'Однотонные (белый холодный)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},
    { name: '12мм', price: '27.50',class: 'Однотонные (белый холодный)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},
    { name: '4мм', price: '11.50',class: 'Однотонные (цветные)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},
    { name: '6мм', price: '15.50',class: 'Однотонные (цветные)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},
    { name: '8мм', price: '19.50',class: 'Однотонные (цветные)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},   
    { name: '10мм', price: '24.50',class: 'Однотонные (цветные)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},
    { name: '12мм', price: '28.50',class: 'Однотонные (цветные)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},
    { name: '4мм', price: '12.50',class: 'Фактурные (каменные, древесные и прочие)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},
    { name: '6мм', price: '16.50',class: 'Фактурные (каменные, древесные и прочие)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},
    { name: '8мм', price: '20.50',class: 'Фактурные (каменные, древесные и прочие)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},   
    { name: '10мм', price: '25.50',class: 'Фактурные (каменные, древесные и прочие)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},
    { name: '12мм', price: '29.50',class: 'Фактурные (каменные, древесные и прочие)', type: "HPL compact двсуторонний экстерьерный - УФ пленка с 1 стороны"},
];

const additionally = [ 
{name:'Tонкий HPL Постформируемый', price: '0.70' },
{name:'Защитная транспортная пленка', price:'0.30'},
{name:'Антимикробное покрытие', price: '0.40'},
{name:'Защитный слой OVERLAY с одной стороны', price: '1.00'},
{name:'Защитный слой OVERLAY с двух сторон', price: '2.00'},
{name:'Специальная текстура с одной стороны', price: '0.75'},
{name:'Специальная текстура с двух сторон', price: '1.50'},
{name:'дополнительная толщина к крафту 0.1мм', price: '0.30'},
{name:'дополнительная УФ пленка с одной стороны', price: '4.00'},
{name:'FR трудногорючий', price: '2.00'},
]

console.log(products)

const mergeProducts = (arr, products) => {
    const mergedArray = [];
    
    products.forEach(product => {
       
        const findItem = arr.find(i => i.size === product.size);


           
                const mergedObject = {
                    ...product,
                   area: findItem?.area
                };
             
                mergedArray.push(mergedObject);
           

     
    });

    return mergedArray;
}
    const newArrProducts = mergeProducts(area, products.items)

    console.log(newArrProducts)
    const getUniqueKeys = () => {
    if (newArrProducts.length > 0) {
        return Object.keys(newArrProducts[1]); 
    }
    return [];
};

const uniqueKeys = computed(()=> {
    return getUniqueKeys(newArrProducts)
})


 watchEffect(() => {
  
     newArrProducts
     });
</script>


<template>
        <div class="grid-container">
        
     </div>
     <DataTable :value="newArrProducts" class="p-datatable-striped">
        <Column v-for="(key, index) in uniqueKeys" :key="index" :field="key" :header="key"></Column>
    </DataTable>
</template>
