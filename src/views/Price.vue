<script setup>
import InputNumber from 'primevue/inputnumber';
import Dropdown  from 'primevue/dropdown';
import { ref, computed, watch } from "vue";
import PriceList from '../components/price/PriceList.vue';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const selectedName = ref(null)
const selectedSize = ref(null);
const selectedPurpose = ref(null);
const selectedTexture = ref(null);
const selectedThickness = ref(null);
const selectedAdditional = ref(null);
const addedProducts = ref([])
const answerApi = ref('')


const token = "0f54e5e6b25475a140f44143c70830db"
const urlAPpi = "https://currate.ru/api/?get=rates&pairs=USDRUB,&key=0f54e5e6b25475a140f44143c70830db";
 const query = ref("");


watch(query, async () => { 
    try {
        const res = await fetch("https://currate.ru/api/?get=rates&pairs=USDRUB,&key=0f54e5e6b25475a140f44143c70830db");
        const data = await res.json();
        console.log(data)
        answerApi.value = data.answer;
        console.log(answerApi.value);
    } catch (error) {
        answerApi.value = 'Ошибка! Нет доступа к API. ' + error.message;  
        console.error(error);
    }
});
    console.log(answerApi.value)

const products = [
    {name: 'Белый Холодный (Cold White)', size:'1840х3670мм', thickness:'12мм', article: 'RC851XL', kraft:'Черный', texture:'SF (шагрень)', purposes:'Интерьерный стандартный', additional:'Защитная пленка'},
    {name: 'Белый Холодный (Cold White)', size:'1860х4300мм', thickness:'12мм', article: 'RC851XL', kraft:'Черный', texture:'SF (шагрень)', purposes:'Интерьерный стандартный', additional:'Защитная пленка'},
    {name: 'Белый Холодный (Cold White)', size:'1300х3050мм', thickness:'6мм', article: 'RC851XL', kraft:'Черный', texture:'SF (шагрень)', purposes:'Интерьерный стандартный', additional:'Защитная пленка'},
    {name: 'Слоновая кость (IVORY)', size:'1840х3670мм', thickness:'12мм', article: 'RC855XL', kraft:'Черный', texture:'SF (шагрень)', purposes:'Интерьерный стандартный', additional:'Защитная пленка'},
    {name: 'Графит (Dark Grey)', size:'1860х4300мм', thickness:'12мм', article: 'RC811111XL', kraft:'Черный', texture:'SF (шагрень)', purposes:'Интерьерный стандартный', additional:'Защитная пленка Overlay с двух стороyн'}
];
const area = [
    { name: '1840х3670мм', area: '6.753 м2' },
    { name: '1300х3050мм', area: '3.965 м2' },
    { name: '1220х3050мм', area: '3.721 м2' },
    { name: '1220х2440мм', area: '2.976 м2' },
    { name: '1860х4300мм', area: '7.998 м2' }
];

const thickness = [
    { name: '4мм', price: '22.11' },
    { name: '6мм', price: '30.54' },
    { name: '8мм', price: '38.96' },
    { name: '10мм', price: '49.49' },
    { name: '12мм', price: '57.92' },
    { name: '14мм', price: '67.58' },
    { name: '16мм', price: '77.25' }
];
const smallWholesale = 10;
const wholesale = 20;
const dealersale = 30;

const getUniqueValues = (key) => {
    return [...new Set(products.map(product => product[key]))].map(value => ({name: value}))
}


const filteredNames = computed(() => {
       
    if (!selectedSize.value && !selectedThickness.value && !selectedPurpose.value && !selectedTexture.value && !selectedAdditional.value) {
        return getUniqueValues('name')
    }
   return getUniqueValues('name').filter(name => 
        products.some(product => 
            product.name === name.name &&
            (!selectedSize.value || product.size === selectedSize.value.name) &&
            (!selectedThickness.value || product.thickness === selectedThickness.value.name) &&
            (!selectedPurpose.value || product.purposes === selectedPurpose.value.name) &&
            (!selectedTexture.value || product.texture === selectedTexture.value.name) &&
            (!selectedAdditional.value || product.additional === selectedAdditional.value.name)
        )
    );
});



const filteredSizes = computed(() => {
    if(!selectedName.value && !selectedAdditional.value && !selectedPurpose.value && !selectedThickness.value && selectedTexture.value) {
        return getUniqueValues('size')
    }
    return getUniqueValues('size').filter(size => 
        products.some(product =>
            product.size === size.name && 
            (!selectedThickness.value || product.thickness === selectedThickness.value.name) &&
            (!selectedPurpose.value || product.purposes === selectedPurpose.value.name) &&
            (!selectedAdditional.value || product.additional === selectedAdditional.value.name) &&
            (!selectedName.value || product.name ===selectedName.value.name)&&
            (!selectedTexture.value || product.texture === selectedTexture.value.name)
        )
    )
})


const filteredThicknesses = computed(() => {
    if (!selectedSize.value && !selectedPurpose.value && !selectedAdditional.value && !selectedName.value && selectedTexture.value) {
        return getUniqueValues('thickness');
    }
    return getUniqueValues('thickness').filter(thickness => 
        products.some(product => 
            product.thickness === thickness.name &&
            (!selectedSize.value || product.size === selectedSize.value.name) &&
            (!selectedPurpose.value || product.purposes === selectedPurpose.value.name) &&
            (!selectedAdditional.value || product.additional === selectedAdditional.value.name) &&
            (!selectedName.value || product.name ===selectedName.value.name) &&
            (!selectedTexture.value || product.texture === selectedTexture.value.name)
        )
    );
});


const filteredPurposes = computed(() => {
    if (!selectedSize.value && !selectedThickness.value && !selectedAdditional.value && !selectedName.value && selectedTexture.value) {
        return getUniqueValues('purposes');
    }
    return getUniqueValues('purposes').filter(purpose => 
        products.some(product => 
            product.purposes === purpose.name &&
            (!selectedSize.value || product.size === selectedSize.value.name) &&
            (!selectedThickness.value || product.thickness === selectedThickness.value.name) &&
            (!selectedAdditional.value || product.additional === selectedAdditional.value.name) &&
            (!selectedName.value || product.name ===selectedName.value.name) &&
            (!selectedTexture.value || product.texture === selectedTexture.value.name)
        )
    );
});

const filteredAdditionals = computed(() => {
    if (!selectedSize.value && !selectedThickness.value && !selectedPurpose.value && !selectedName.value && selectedTexture.value) {
        return getUniqueValues('additional');
    }
    return getUniqueValues('additional').filter(additional => 
        products.some(product => 
            product.additional === additional.name &&
            (!selectedSize.value || product.size === selectedSize.value.name) &&
            (!selectedThickness.value || product.thickness === selectedThickness.value.name) &&
            (!selectedPurpose.value || product.purposes === selectedPurpose.value.name) &&
            (!selectedName.value || product.name ===selectedName.value.name) &&
            (!selectedTexture.value || product.texture === selectedTexture.value.name)

    )
    );
});

const filteredTexture = computed(() => {
    if (!selectedSize.value && !selectedThickness.value && !selectedPurpose.value && !selectedName.value && !selectedAdditional.value) {
        return getUniqueValues('texture');
    }
    return getUniqueValues('texture').filter(texture => 
        products.some(product => 
            product.texture === texture.name &&
            (!selectedSize.value || product.size === selectedSize.value.name) &&
            (!selectedThickness.value || product.thickness === selectedThickness.value.name) &&
            (!selectedPurpose.value || product.purposes === selectedPurpose.value.name) &&
            (!selectedName.value || product.name === selectedName.value.name) &&
            (!selectedAdditional.value || product.additional === selectedAdditional.value.name)

        )
    );
});

const getItem = computed(() => {
    if(!selectedName.value) {
      return''
    }
    const selelectedNameProduct = selectedName.value ? selectedName.value.name : null
    const articleFoName = products.find(item  => item.name === selelectedNameProduct)
    return articleFoName
})

const purposes = ref([
    {name:'Интерьерный стандартный'}, 
    {name:'Экстерьерный и Специальный'}
])


const selectedItem = computed(() => {
    // if(selectedName.value) {
        const item = {
            kraft: getItem ? getItem.kraft : null,
            article: getItem ? getItem.article : null,
            name: selectedName.value ? selectedName.value.name : null,
            size:  selectedSize.value ? selectedSize.value.name : null,
            thickness:  selectedThickness.value ? selectedThickness.value.name : null,
            finishTexture: selectedTexture.value ? selectedTexture.value.name : null,
            purpose: selectedPurpose.value ? selectedPurpose.value.name : null,
            additional: selectedAdditional.value ? selectedAdditional.value.name : null
        }
    
        const matchedItem = products.find(product => 
           
            (!item.article || product.article === item.article) &&
            (!item.kraft || product.kraft === item.kraft) &&
            (!item.name || product.name === item.name) &&
            (!item.size || product.size === item.size) &&
            (!item.thickness || product.thickness === item.thickness) &&
            (!item.purpose || product.purposes === item.purpose) &&
            (!item.texture || product.texture === item.texture) &&
            (!item.additional || product.additional === item.additional)
        )
        
        return matchedItem ? matchedItem : null;
    // }
})


const calculateTotalPrice = (selectedItem) => {
  
    if(!selectedItem && !selectedItem.value.thickness && !selectedItem.value.size && selectedItem.value.name) {
        return 0.00
    }
     const  areaItem = area.find(item => item.name == selectedItem.size)  
    if(!areaItem) {  
        return 0.00
    }
    const areaInSquareMeters = parseFloat(areaItem.area)
    const pricePerSquareMeter = thickness.find(item => item.name === selectedItem.thickness) 
    if(!pricePerSquareMeter) return 0.00
    const totalPrice = areaInSquareMeters*pricePerSquareMeter.price
    if(!selectedName.value) return 0.00   
    return totalPrice

} 

const totalCost = computed(() => {
    return calculateTotalPrice(selectedItem.value).toFixed(2)
});

const calculateSmallWholesalePrice = computed(() => {
    if ( totalCost === 0) {
        return 0
    }
     const cost = totalCost.value* (1 - smallWholesale/100)
    return cost.toFixed(2)
})
const calculateWholesalePrice = computed(() => {
    if ( totalCost === 0) {
        return 0
    }
     const cost = totalCost.value* (1 - wholesale/100)
    return cost.toFixed(2)
})
const calculateDealerPrice = computed(() => {
    if ( totalCost === 0) {
        return 0
    }
     const cost = totalCost.value* (1 - dealersale/100)
    return cost.toFixed(2)
})



const addProductList = () => {
     const item = selectedItem.value; 
    if (item && totalCost.value && selectedName.value && selectedAdditional.value && selectedSize.value && selectedThickness.value && selectedPurpose.value) {
            const {
            kraft,
            article,
            name,
            size,
            thickness,
            texture,
            purposes,
            additional
        } = item;

        const newItem = {
            kraft:item.kraft ,
            article: item.article,
            name,
            size,
            thickness,
            texture,
            purposes,
            additional,
            photo: null, 
            totalCost: totalCost.value, 
            calculateDealerPrice: calculateDealerPrice.value,
            calculateWholesalePrice: calculateWholesalePrice.value,
            calculateSmallWholesalePrice: calculateSmallWholesalePrice.value,
        };
     
        addedProducts.value.push(newItem)
        

        clearSelections()
    }   
}

const clearSelections = () => {
    selectedName.value = null;
    selectedSize.value = null;
    selectedPurpose.value = null;
    selectedTexture.value = null;
    selectedThickness.value = null;
    selectedAdditional.value = null;
};

const deleteProduct = (index) => {
 addedProducts.value.splice(index, 1)
}

</script>

<template>
    <div class="container_selected">
        <!-- <div class="api">
            Выбрать курс
            <InputText v-model="query"></InputText>
            <span class="api">{{answerApi}} тут ответ</span>
        </div> -->
        <div class="grid-container">
            <FloatLabel class="grid-header">
                <Dropdown v-model="selectedName" :options="filteredNames" showClear optionLabel="name" invalid class="w-full md:w-14rem"/>
                <label for="ac">Наименование </label>
            </FloatLabel>
            <FloatLabel class="grid-header">
                <Dropdown v-model="selectedSize" :options="filteredSizes" showClear optionLabel="name"  invalid class="w-full md:w-14rem" />
                <label for="ac">Формат листа </label>
            </FloatLabel>
            <FloatLabel class="grid-header">
                <Dropdown v-model="selectedThickness" :options="filteredThicknesses" showClear optionLabel="name"  invalid class="w-full md:w-14rem" />
                <label for="ac">Толщина</label>
            </FloatLabel>
            <!-- <FloatLabel class="grid-header">Крафт (срез)</FloatLabel> -->
            <FloatLabel class="grid-header">
                <Dropdown v-model="selectedTexture" :options="filteredTexture" showClear optionLabel="name"  invalid class="w-full md:w-14rem" />
                <label for="ac">Финишная текстура</label>
            </FloatLabel>
            <FloatLabel class="grid-header">
                <Dropdown v-model="selectedPurpose" :options="filteredPurposes" showClear optionLabel="name"  invalid class="w-full md:w-14rem" />
                <label for="ac">Назначение</label>
                </FloatLabel>
            <FloatLabel class="grid-header">
                 <Dropdown v-model="selectedAdditional" :options="filteredAdditionals" showClear optionLabel="name"  invalid class="w-full md:w-14rem"/>
                <label for="ac">Дополнительно</label>
            </FloatLabel>    
        </div> 
        <div class="grid-container">   
                    <Button @click="addProductList">Добавить</Button>
          
        </div>

        <div class="logo">
            <img src="../assets/krafter.svg" alt="logo" width="128px" />
        </div>

        <div class="table_string">
            <PriceList :items="addedProducts" @remove="deleteProduct"/>
        </div>
    </div>
</template>
<style scoped>
.p-floatlabel:has(.p-invalid) label {
    color: white;
    padding: 0 10px;
}

.p-select {
    
    display: inline-flex;   
    cursor: pointer;
    position: relative;
    user-select: none;
    background:  black;
    border: 1px solid var(--p-select-border-color);
    transition: background var(--p-select-transition-duration), color var(--p-select-transition-duration), border-color var(--p-select-transition-duration), outline-color var(--p-select-transition-duration), box-shadow var(--p-select-transition-duration);
    border-radius: var(--p-select-border-radius);
    outline-color: transparent;
    box-shadow: var(--p-select-shadow);
}

</style>


<style lang="scss">

 th, td {
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
    color: white ;
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
    background-color: #f0f0f0 ;
}

.logo {
    margin-top: 20px;
    text-align: center; /* Центрирование логотипа */
}

.table_string {
    margin-top: 20px;
    width: 100%;
}

.api {
    margin: 20px 0
    ;
    color: white;
}
</style>

