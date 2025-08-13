<script setup>
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import { ref, computed } from "vue";
import PriceList from '../components/price/PriceList.vue';


const selectedName = ref(null)
const selectedSize = ref(null);
const selectedPurpose = ref(null);
const selectedTexture = ref(null);
const selectedThickness = ref(null);
const selectedAdditional = ref(null);
const addedProducts = ref([])


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
console.log(addedProducts)
</script>

<template>
    <div class="container_selected">

             <table> 
                  <thead>
                    <tr>
                        <th>№</th>
                        <th>Фото</th>
                        <th>Артикул</th>
                        <th>Наименование декора</th>
                        <th>Формат листа</th>
                        <th>Толщина</th>
                        <th>Крафт (срез)</th>
                        <th>Финишная текстура</th>
                        <th>Назначение</th>
                        <th>Дополнительно</th>
                        <th>Розница (до 5 листов)</th>
                        <th>Мелкий опт (6 листов) скидка 10%</th>
                        <th>Опт (от 30 листов) Скидка 20%</th>
                        <th>Дилер Скидка 30%</th>
                        <th></th>
                    </tr>
                 </thead>
                 <tbody style="background: darkorange;">
                     <tr>
                        <td></td>
                         <td>Фото</td>
                         <td>{{getItem.article}}</td>
                         <td >
                             <Dropdown v-model="selectedName" :options="filteredNames" showClear optionLabel="name" placeholder="Наименование " invalid class="w-full md:w-14rem"/>
                         </td>
                         <td>
                             <Dropdown v-model="selectedSize" :options="filteredSizes" showClear optionLabel="name" placeholder="Размер" invalid class="w-full md:w-14rem" />
                         </td>
                         <td>
                             <Dropdown v-model="selectedThickness" :options="filteredThicknesses" showClear optionLabel="name" placeholder="Толщина" invalid class="w-full md:w-14rem" />
                         </td>
                         <td>{{getItem.kraft}}</td>
                         <td>
                             <Dropdown v-model="selectedTexture" :options="filteredTexture" showClear optionLabel="name" placeholder="Финишная текстура" invalid class="w-full md:w-14rem" />
                         </td>
                         <td>
                             <Dropdown v-model="selectedPurpose" :options="filteredPurposes" showClear optionLabel="name" placeholder="Назначение" invalid class="w-full md:w-14rem" />
                         </td>
                         <td>
                             <Dropdown v-model="selectedAdditional" :options="filteredAdditionals" showClear optionLabel="name" placeholder="Дополнительно"  invalid class="w-full md:w-14rem"/>
                         </td>
                         <td>{{totalCost}}</td>
                         <td>{{calculateSmallWholesalePrice}}</td>
                         <td>{{calculateWholesalePrice}}</td>
                         <td>{{calculateDealerPrice}}</td>
                          <th>
                         
                            <div class="buttonAdd" v-if="selectedItem">
                                <button @click="addProductList">Добавить</button>
                             </div>
                    </th>
                     </tr>
                    
                    </tbody>
            </table>
              <div class="logo">
                <img src="../assets/krafter.svg" alt="logo" width="128px" />
            </div>
            <div class="table_string">
                <table>
                   <tbody>
                     <PriceList :items="addedProducts" @remove="deleteProduct"/>
                   </tbody> 
                </table>
                
            </div>
          
    </div>
</template>

<style lang="scss">
.p-select-label.p-placeholder {
    font-size: small;
    color: var(--p-select-placeholder-color);
}
.p-select-option-label {
  font-size: small;  
}
.p-select:has(.p-select-clear-icon) .p-select-label{
    font-size: small;  
}
</style>

<style scoped lang="scss">



.p-10[data-v-7a7a37b1] {
    height: 100%;
    width: 100vw;
}

.logo {
    margin: 20px 0;
    text-align: center;
    color: rgb(0, 0, 0);
    background:rgb(0, 0, 0)
}

.vue-inspector-container {
    background: #ddd;
}

thead {
    background: gray
   
}

.buttonAdd {
    display: flex;
    justify-content: center;
    
    min-width: 70px;
    height: calc(70px * 1.2);
    width: auto;
} 

table {
    padding: 50px;
    width: 100%;
    border-collapse: collapse;
}

.table_string {
    display: flex;

    width: 100%;
    height: auto; 
    margin-top:20px;
    background: #f5f2f282;
   
}


th, td {
     font-weight: initial;
    background: none;
    border: 1px solid #ddd;
    padding: 8px;
    height: 50px; 
    font-size: small;
    // width: 100%;
}

img {
    max-width: 100px;
}

.container_selected {
    width: 100%;
    height: 100vh;
}

button {
    background:  linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
linear-gradient(270deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
linear-gradient(90deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
linear-gradient(0deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%);

    border-radius: 50%;
}

button:hover {
      background-color: rgb(255, 77, 45); 
      box-shadow: 0 0 10px rgba(0, 138, 251, 0.8);
      transition-delay:0s
}

// @media (max-width: 600px) {
//   .responsive-dropdown {
//     max-width: 100%;
//   }
// }
</style>

