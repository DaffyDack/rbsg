<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { ref, computed } from 'vue'
// import PriceList from '@/components/price/PriceList.vue';
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'

export interface IProduct {
  supplier: string;
  name: string;
  size: string;
  thickness: string;
  article: string;
  kraft: string;
  texture: string;
  purposes: string;
  additional: string;
  totalCost: number;
  calculateSmallWholesalePrice: number;
  calculateWholesalePrice: number;
  calculateDealerPrice: number;
}
interface Area {
  name: string
  area: string
}
interface Thickness {
  name: string
  price: string
}
interface UniqueValue {
  name: string
}
interface IValute {
  [key: string]: {
    Previous: number
  }
}
interface IgetItem {
  kraft: string
  article: string
}
const selectedName = ref()
const selectedSupplier = ref()
const selectedSize = ref();
const selectedPurpose = ref();
const selectedTexture = ref();
const selectedThickness = ref();
const selectedAdditional = ref();
const addedProducts = ref<IProduct[]>([])

const euro = ref('')

const token = '0f54e5e6b25475a140f44143c70830db'
const urlAPpi = 'https://www.cbr-xml-daily.ru/daily_json.js'

const getСourse = async () => {
  try {
    const res = await fetch(urlAPpi)
    const data = await res.json()
    euro.value = data.Valute.EUR.Previous.toFixed(2)
  } catch (error) {
    euro.value = 'Ошибка! Нет доступа к API. '
    console.error(error)
  }
}
getСourse()



const pro: IProduct[] = [
  {
    supplier: "Crown Décor",
    name: 'Белый Холодный (Cold White)', size: '1840х3670мм', thickness: '12мм', article: 'RC851XL', kraft: 'Черный', texture: 'SF (шагрень)', purposes: 'Интерьерный стандартный', additional: 'Защитная пленка',
    totalCost: 0,
    calculateSmallWholesalePrice: 0,
    calculateWholesalePrice: 0,
    calculateDealerPrice: 0
  },
  {
    supplier: "Crown Décor",
    name: 'Белый Холодный (Cold White)', size: '1860х4300мм', thickness: '12мм', article: 'RC851XL', kraft: 'Черный', texture: 'SF (шагрень)', purposes: 'Интерьерный стандартный', additional: 'Защитная пленка',
    totalCost: 0,
    calculateSmallWholesalePrice: 0,
    calculateWholesalePrice: 0,
    calculateDealerPrice: 0
  },
  {
    supplier: "Crown Décor",
    name: 'Белый Холодный (Cold White)', size: '1300х3050мм', thickness: '6мм', article: 'RC851XL', kraft: 'Черный', texture: 'SF (шагрень)', purposes: 'Интерьерный стандартный', additional: 'Защитная пленка',
    totalCost: 0,
    calculateSmallWholesalePrice: 0,
    calculateWholesalePrice: 0,
    calculateDealerPrice: 0
  },
  {
    supplier: "Crown Décor",
    name: 'Слоновая кость (IVORY)', size: '1840х3670мм', thickness: '12мм', article: 'RC855XL', kraft: 'Черный', texture: 'SF (шагрень)', purposes: 'Интерьерный стандартный', additional: 'Защитная пленка',
    totalCost: 0,
    calculateSmallWholesalePrice: 0,
    calculateWholesalePrice: 0,
    calculateDealerPrice: 0
  },
  {
    supplier: "Krafter",
    name: 'Графит (Dark Grey)', size: '1860х4300мм', thickness: '12мм', article: 'RC811111XL', kraft: 'Черный', texture: 'SF (шагрень)', purposes: 'Интерьерный стандартный', additional: 'Защитная пленка Overlay с двух стороyн',
    totalCost: 0,
    calculateSmallWholesalePrice: 0,
    calculateWholesalePrice: 0,
    calculateDealerPrice: 0
  }
];
const area = [
  { name: '1840х3670мм', area: '6.753 м2' },
  { name: '1300х3050мм', area: '3.965 м2' },
  { name: '1220х3050мм', area: '3.721 м2' },
  { name: '1220х2440мм', area: '2.976 м2' },
  { name: '1860х4300мм', area: '7.998 м2' },
]

const thickness = [
  { name: '4мм', price: '22.11' },
  { name: '6мм', price: '30.54' },
  { name: '8мм', price: '38.96' },
  { name: '10мм', price: '49.49' },
  { name: '12мм', price: '57.92' },
  { name: '14мм', price: '67.58' },
  { name: '16мм', price: '77.25' }
];

//ebterf NewItem: {
//     kraft: string;
//     article: string;
//     name: string;
//     size: string;
//     thickness: string;
//     texture: string;
//     purposes: string;
//     additional: string;
//     totalCost: number;
//     calculateDealerPrice: number;
//     calculateWholesalePrice: number;
//     calculateSmallWholesalePrice: number;
// } 
const smallWholesale = 10;
const wholesale = 20;
const dealersale = 30;

const productsFilterOfSupplier = (initialProducts: IProduct[]): IProduct[] => {
  if (!selectedSupplier.value) {
    return initialProducts
  }
  return initialProducts.filter((product: IProduct) =>
    selectedSupplier.value === null || selectedSupplier.value === product.supplier
  );
};
const products = productsFilterOfSupplier(pro)

const getUniqueValues = <T extends keyof IProduct>(key: T): { name: IProduct[T] }[] => {
  return [...new Set(products.map((product) => product[key]))].map(value => ({ name: value }));
};

const filteredSupplier = computed<UniqueValue[]>(() => {
  return getUniqueValues('supplier')
})
// console.log(filteredSupplier())

const filteredNames = computed<UniqueValue[]>(() => {

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



const filteredSizes = computed<UniqueValue[]>(() => {
  if (
    !selectedName.value &&
    !selectedAdditional.value &&
    !selectedPurpose.value &&
    !selectedThickness.value &&
    selectedTexture.value
  ) {
    return getUniqueValues('size')
  }
  return getUniqueValues('size').filter((size) =>
    products.some(
      (product) =>
        product.size === size.name &&
        (!selectedThickness.value || product.thickness === selectedThickness.value.name) &&
        (!selectedPurpose.value || product.purposes === selectedPurpose.value.name) &&
        (!selectedAdditional.value || product.additional === selectedAdditional.value.name) &&
        (!selectedName.value || product.name === selectedName.value.name) &&
        (!selectedTexture.value || product.texture === selectedTexture.value.name),
    ),
  )
})

const filteredThicknesses = computed<UniqueValue[]>(() => {
  if (
    !selectedSize.value &&
    !selectedPurpose.value &&
    !selectedAdditional.value &&
    !selectedName.value &&
    selectedTexture.value
  ) {
    return getUniqueValues('thickness')
  }
  return getUniqueValues('thickness').filter((thickness) =>
    products.some(
      (product) =>
        product.thickness === thickness.name &&
        (!selectedSize.value || product.size === selectedSize.value.name) &&
        (!selectedPurpose.value || product.purposes === selectedPurpose.value.name) &&
        (!selectedAdditional.value || product.additional === selectedAdditional.value.name) &&
        (!selectedName.value || product.name === selectedName.value.name) &&
        (!selectedTexture.value || product.texture === selectedTexture.value.name),
    ),
  )
})

const filteredPurposes = computed<UniqueValue[]>(() => {
  if (
    !selectedSize.value &&
    !selectedThickness.value &&
    !selectedAdditional.value &&
    !selectedName.value &&
    selectedTexture.value
  ) {
    return getUniqueValues('purposes')
  }
  return getUniqueValues('purposes').filter((purpose) =>
    products.some(
      (product) =>
        product.purposes === purpose.name &&
        (!selectedSize.value || product.size === selectedSize.value.name) &&
        (!selectedThickness.value || product.thickness === selectedThickness.value.name) &&
        (!selectedAdditional.value || product.additional === selectedAdditional.value.name) &&
        (!selectedName.value || product.name === selectedName.value.name) &&
        (!selectedTexture.value || product.texture === selectedTexture.value.name),
    ),
  )
})

const filteredAdditionals = computed<UniqueValue[]>(() => {
  if (
    !selectedSize.value &&
    !selectedThickness.value &&
    !selectedPurpose.value &&
    !selectedName.value &&
    selectedTexture.value
  ) {
    return getUniqueValues('additional')
  }
  return getUniqueValues('additional').filter((additional) =>
    products.some(
      (product) =>
        product.additional === additional.name &&
        (!selectedSize.value || product.size === selectedSize.value.name) &&
        (!selectedThickness.value || product.thickness === selectedThickness.value.name) &&
        (!selectedPurpose.value || product.purposes === selectedPurpose.value.name) &&
        (!selectedName.value || product.name === selectedName.value.name) &&
        (!selectedTexture.value || product.texture === selectedTexture.value.name),
    ),
  )
})

const filteredTexture = computed<UniqueValue[]>(() => {
  if (
    !selectedSize.value &&
    !selectedThickness.value &&
    !selectedPurpose.value &&
    !selectedName.value &&
    !selectedAdditional.value
  ) {
    return getUniqueValues('texture')
  }
  return getUniqueValues('texture').filter((texture) =>
    products.some(
      (product) =>
        product.texture === texture.name &&
        (!selectedSize.value || product.size === selectedSize.value.name) &&
        (!selectedThickness.value || product.thickness === selectedThickness.value.name) &&
        (!selectedPurpose.value || product.purposes === selectedPurpose.value.name) &&
        (!selectedName.value || product.name === selectedName.value.name) &&
        (!selectedAdditional.value || product.additional === selectedAdditional.value.name),
    ),
  )
})

const getItem = computed<'' | IProduct | undefined>(() => {
  if (!selectedName.value) {
    return ''
  }
  const selelectedNameProduct = selectedName.value ? selectedName.value.name : null
  const articleFoName = products.find((item) => item.name === selelectedNameProduct)
  return articleFoName
})

const purposes = ref([{ name: 'Интерьерный стандартный' }, { name: 'Экстерьерный и Специальный' }])

const selectedItem = computed(() => {

  const item = {
    supplier: getItem.value && typeof getItem.value !== "string" ? getItem.value.supplier : null,
    kraft: getItem.value && typeof getItem.value !== "string" ? getItem.value.kraft : null,
    article: getItem.value && typeof getItem.value !== "string" ? getItem.value.article : null,
    name: selectedName.value ? selectedName.value.name : null,
    size: selectedSize.value ? selectedSize.value.name : null,
    thickness: selectedThickness.value ? selectedThickness.value.name : null,
    texture: selectedTexture.value ? selectedTexture.value.name : null,
    purpose: selectedPurpose.value ? selectedPurpose.value.name : null,
    additional: selectedAdditional.value ? selectedAdditional.value.name : null
  };

  const matchedItem = products.find(product =>

    (!item.supplier || product.supplier === item.supplier) &&
    (!item.article || product.article === item.article) &&
    (!item.kraft || product.kraft === item.kraft) &&
    (!item.name || product.name === item.name) &&
    (!item.size || product.size === item.size) &&
    (!item.thickness || product.thickness === item.thickness) &&
    (!item.purpose || product.purposes === item.purpose) &&
    (!item.texture || product.texture === item.texture) &&
    (!item.additional || product.additional === item.additional)
  )

  return matchedItem ? matchedItem : null
})

const calculateTotalPrice = (selectedItem: IProduct | undefined) => {
  if (!selectedItem) {
    return 0.0
  }
  const areaItem = area.find((item) => item.name == selectedItem.size)
  if (!areaItem) {
    return 0.0
  }
  const areaInSquareMeters = parseFloat(areaItem.area)
  const pricePerSquareMeter = thickness.find((item) => item.name === selectedItem.thickness)
  if (!pricePerSquareMeter) return 0.0
  const totalPrice = areaInSquareMeters * Number(pricePerSquareMeter.price) * Number(euro.value)
  if (!selectedName.value) return 0.0
  return totalPrice
}

const totalCost = computed(() => {
  if (selectedItem.value) {
    return Number(calculateTotalPrice(selectedItem.value).toFixed(2))
  }
})

const calculateSmallWholesalePrice = computed(() => {
  if (Number(totalCost) === 0) {
    return 0
  }
  const cost = Number(totalCost.value) * (1 - smallWholesale / 100)
  return Number(cost.toFixed(2))
})
const calculateWholesalePrice = computed(() => {
  if (Number(totalCost) === 0) {
    return 0
  }
  const cost = Number(totalCost.value) * (1 - wholesale / 100)
  return Number(cost.toFixed(2))
})
const calculateDealerPrice = computed(() => {
  if (Number(totalCost) === 0) {
    return 0
  }
  const cost = Number(totalCost.value) * (1 - dealersale / 100)
  return Number(cost.toFixed(2))
})

const addProductList = () => {
  const item = selectedItem.value;
  if (item && totalCost.value && selectedName.value && selectedAdditional.value && selectedSize.value && selectedThickness.value && selectedPurpose.value) {
    const {
      name,
      size,
      thickness,
      texture,
      purposes,
      additional
    } = item;

    const newItem: IProduct = {
      supplier: item.supplier,
      kraft: item.kraft,
      article: item.article,
      name,
      size,
      thickness,
      texture,
      purposes,
      additional,
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
  selectedName.value = null
  selectedSize.value = null
  selectedPurpose.value = null
  selectedTexture.value = null
  selectedThickness.value = null
  selectedAdditional.value = null
}

const deleteProduct = (index: number) => {
  addedProducts.value.splice(index, 1)
}
</script>

<template>
  <div class="container_selected">



    <div class="api">

      <FloatLabel class="grid-header">
        <Dropdown v-model="selectedSupplier" :options="filteredSupplier" showClear optionLabel="supplier" invalid
          class="w-full md:w-9rem" />
        <label for="ac">Производитель</label>
      </FloatLabel>
    </div>
    <div class="grid-container">
      <FloatLabel class="grid-header">
        <Dropdown v-model="selectedName" :options="filteredNames" showClear optionLabel="name" invalid
          class="w-full md:w-10rem" />
        <label for="ac">Наименование </label>
      </FloatLabel>
      <FloatLabel class="grid-header">
        <Dropdown v-model="selectedSize" :options="filteredSizes" showClear optionLabel="name" invalid
          class="w-full md:w-10rem" />
        <label for="ac">Формат листа </label>
      </FloatLabel>
      <FloatLabel class="grid-header">
        <Dropdown v-model="selectedThickness" :options="filteredThicknesses" showClear optionLabel="name" invalid
          class="w-full md:w-10rem" />
        <label for="ac">Толщина</label>
      </FloatLabel>
      <!-- <FloatLabel class="grid-header">Крафт (срез)</FloatLabel> -->
      <FloatLabel class="grid-header">
        <Dropdown v-model="selectedTexture" :options="filteredTexture" showClear optionLabel="name" invalid
          class="w-full md:w-10rem" />
        <label for="ac">Финишная текстура</label>
      </FloatLabel>
      <FloatLabel class="grid-header">
        <Dropdown v-model="selectedPurpose" :options="filteredPurposes" showClear optionLabel="name" invalid
          class="w-full md:w-10rem" />
        <label for="ac">Назначение</label>
      </FloatLabel>
      <FloatLabel class="grid-header">
        <Dropdown v-model="selectedAdditional" :options="filteredAdditionals" showClear optionLabel="name" invalid
          class="w-full md:w-10rem" />
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
      <!-- <PriceList :items="addedProducts" @remove="deleteProduct" /> -->
    </div>
  </div>
</template>
<style scoped lang="scss">
.p-floatlabel:has(.p-invalid) label {
  color: white;
  padding: 0 10px;
}

.p-select {
  display: inline-flex;
  cursor: pointer;
  position: relative;
  user-select: none;
  background: black;
  border: 1px solid var(--p-select-border-color);
  // transition: background var(--p-select-transition-duration), color var(--p-select-transition-duration), border-color var(--p-select-transition-duration), outline-color var(--p-select-transition-duration), box-shadow var(--p-select-transition-duration);
  border-radius: var(--p-select-border-radius);
  outline-color: transparent;
  box-shadow: var(--p-select-shadow);
}
</style>

<style lang="scss">
th,
td {
  background: white;
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
