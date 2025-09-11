<script setup lang="ts">

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
 const n = {
        manufacturer:"Производитель",
        article: "Артикул",
        name:"Наименование",
        craft:"Крафт",
        texture:"Текстура",
        class: "Декор",
        type: "Назначение",
        size: "Формат листа",
        thickness: "Толщина",
        area: "Площадь"
        }

import { ref, type Ref,computed,watchEffect, watch} from 'vue';
import PriceList from '@/components/price/PriceList.vue';
import html2pdf from 'html2pdf.js'
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';

interface Currency {
    CharCode: string; 
    ID: string; 
    Name: string; 
    Nominal: number; 
    NumCode: string; 
    Previous: number;
    Value: number; 
}
interface Products {
    manufacturer: string,
        article: string,
        name: string,
        craft: string,
        texture: string,
        class: string,
        type: string,
        size: string,
        thickness: string,
        area: string,
        price: number
}
const exportToPDF = () => {

    const element = document.getElementById('pdf') as HTMLElement
    const options = {
      margin: [1, 0.47],
      filename: 'table.pdf',
      image: { type: 'pdf', quality: 2 },
      html2canvas: { scale: 5 },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'], before: '#page2el' },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    }

    html2pdf().set(options).from(element).save()
  }

// const name = ref(JSON.parse(localStorage.getItem('role') || ''))

const props = defineProps<{ 
    items: Array<Record<string, any>>,
    dataRatio: {inputConversion: number, inputOverheadCosts: number},
    initialPrice: Currency,
    curs:number }>();
    


const selectedValues = ref({});
const filteredOptions = ref({});
const selectedOptions = ref([]);
const filtredItemsOrder = ref([])

const product = ref({
  manufacturer: '',
  article: '',
  name: '',
  craft: '',
  texture: '',
  class: '',
  type: '',
  size: '',
  thickness: '',
  area: '',
  price: ''
});

const filteredArr = ref(props.items)
const smallWholesale = 10;
const wholesale = 20;
const dealersale = 30;




const getUniqueKeys = (items: Array<Record<string, number>>) => {
    if (items.length > 0) {
        return Object.keys(items[1]); 
    }
    return [];
};
const uniqueKeys = computed(()=> {
    return getUniqueKeys(props.items, n).slice(0, 9)
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
            const selectedKeys = Object.keys(selectedValues.value).filter(k => selectedValues.value[k]);
            
            filteredOptions.value[key] = [...new Set(props.items
                .filter(product => {
                    return selectedKeys.every(filterKey => 
                        product[filterKey] === selectedValues.value[filterKey]
                    );
                })
                .map(product => product[key]))];
        });
    };

    const summOptionsPrice = computed(() => {

      return selectedOptions.value.reduce((total, item) => {
       console.log(item.price)
        return total + Number(item.price);
    }, 0);
    });


console.log(summOptionsPrice.value)
     const getNamesString = computed(() => {
        if (selectedOptions.value && Array.isArray(selectedOptions.value)) {
            return selectedOptions.value.map(type => type.name).join(', ');
        }
        return ''; 
    });

    const filteredProducts = computed(() => {
       filteredArr.value = filteredArr.value.filter(product => {
            return Object.keys(selectedValues.value).every(key => {
                    return !selectedValues.value[key] || product[key] === selectedValues.value[key];
                });
            });
            
            filteredArr.value.forEach(product => {
                const price = Number(product.price) + Number(summOptionsPrice.value);
                const totalCost = props.initialPrice.CharCode!== 'EUR' ? price * props.curs  * props.dataRatio.inputOverheadCosts * props.dataRatio.inputConversion:  price * props.curs * props.dataRatio.inputOverheadCosts;
                product.options = getNamesString.value
                product.totalCost = totalCost.toFixed(2);
                product.calculateSmallWholesalePrice = (totalCost * (1 - smallWholesale / 100)).toFixed(2);
                product.calculateWholesalePrice = (totalCost * (1 - wholesale / 100)).toFixed(2);
                product.calculateDealerPrice = (totalCost * (1 - dealersale / 100)).toFixed(2);
            });
            
            return filteredArr.value;
    });
        
;
        
        const deleteProduct = (index) => {
             filteredArr.value.splice(index, 1);
        };
      
        watchEffect(() => {
           filteredArr.value = props.items
            updateFilteredOptions();
            selectedValues.value = {};
            filteredOptions.value = {}
        });


    const clearSelect = () => {
    selectedOptions.value = []
    selectedValues.value = {};
    filteredOptions.value = {}
    filteredArr.value = props.items
    }

    const hasSelectedValues = computed(() => {
    return Object.values(selectedValues.value).some(value => value !== null && value !== '');
    });

    const addPositionOnOrder =() =>{
  filtredItemsOrder.value = products.value
}

</script>


<template>
   
    <div class="table_select">
        <Button @click="clearSelect">Очистить выбор</Button>
        <Button @click="exportToPDF">Скачать PDF</Button>
         <Button type="submit" label="Сохранить" />
    </div>
    <div class="grid-container">
        <div class="table_select" v-for="(key, index) in uniqueKeys" :key="index">
            <label :for="key">{{ n[key] }}</label>
            <select :id="key" v-model="selectedValues[key]">
                <option v-for="value in filteredOptions[key]" :key="value" :value="value">{{ value }}</option>
            </select>
        </div>
        <div class="card flex justify-content-center">
          <MultiSelect v-model="selectedOptions" variant="filled" :options="additionally" optionLabel="name" placeholder="Дополнительно"
            :maxSelectedLabels="1" class="w-full md:w-20rem" />
        </div>
    </div>
   
    <div v-if="hasSelectedValues">
        <PriceList :items="filteredProducts" @remove="deleteProduct"/>
    </div>
   
</template>

<style lang="scss">
th,
td {
    background: white;
    // border: 1px solid #ddd;
    padding: 8px;
    font-size: smaller;
    height: 50px;
    font-weight: initial;
}

.container_selected {
    padding: 20px;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    background-color: none;

    padding: 10px;
}
 .p-multiselect-label.p-placeholder {
    color: #000000;
    display: flex;
    justify-content: center;
 }

.grid-header {
    border-radius: 10px;
    font-weight: bold;
    background-color: #f0f0f0;
    padding: 10px;
    text-align: center;


    .p-select-label {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        flex: 1 1 auto;
        width: 1%;
        padding: var(--p-select-padding-y) var(--p-select-padding-x);
        text-overflow: ellipsis;
        cursor: pointer;
        color: white;
        background: transparent;
        border: 0 none;
        outline: 0 none;
        font-size: 1rem;
    }
}

.grid-item {
    padding: 10px;

    text-align: center;
}

.buttonAdd {
    display: flex;
    justify-content: center;
    align-items: center;

}

.logo {
    margin-top: 20px;
    text-align: center;
    /* Центрирование логотипа */
}

.table_string {
    margin-top: 20px;
    width: 100%;
}

.api {
    margin: 20px;
    color: white;
}

</style>
