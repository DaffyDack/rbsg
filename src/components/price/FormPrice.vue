    <script setup lang="ts">
    import { ref, computed } from 'vue';
import  InputText  from 'primevue/inputtext';
import  Button  from 'primevue/button';
import  DataTable  from 'primevue/datatable';
import  Column  from 'primevue/column';

const initialFormProduct = {
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
}
const products = ref([]);
const product = ref({});

const submitForm = () => {
  if (product.value.id) {
      const index = products.value.findIndex(p => p.id === product.value.id);
    if (index !== -1) {
      products.value[index] = { ...product.value };
    }
  } else {
    products.value.push({ ...product.value, id: Date.now() });
  }
  resetForm();
};

const deleteProduct = (rowData) => {
    console.log(rowData)
   products.value = products.value.filter(p => p.id !== rowData.id);
};

const editProduct = (rowData) => {
  product.value = { ...rowData };
};

const resetForm = () => {
  product.value = initialFormProduct
};

const isFormIncomplete = computed(() => {
  return Object.values(product.value).some(value => !value);
});
//         const props = defineProps<{items: Array<Record<string, any>>}>();
   
//         const rename = {
//         manufacturer:"Производитель",
//         article: "Артикул",
//         name:"Наименование",
//         craft:"Крафт",
//         texture:"Текстура",
//         class: "class",
//         type: "type",
//         size: "size",
//         thickness: "name",
//         area: "area",
//         price: "price"
//     }

//         const n = {
//         manufacturer:"Производитель",
//         article: "Артикул",
//         name:"Наименование",
//         craft:"Крафт",
//         texture:"Текстура",
//         class: "Однотонные (белый холодный)",
//         type: "Назначение",
//         size: "Формат листа",
//         thickness: "Толщина",
//         area: "Площадь"
//         }
    
//         function renameKeys(arr, renameMap) {
//             return arr.map(obj => {
//                 const newObj = {};
//                 for (const [newKey, oldKey] of Object.entries(renameMap)) {
//                     if (oldKey in obj) {
//                         newObj[newKey] = obj[oldKey];
//                     }
//                 }
//                 return newObj;
//             });
//         }

// const renamedData = renameKeys(props?.items, rename);
// console.log(renamedData);

 </script>


<template>
  <div>
    <h2>Управление продуктами</h2>
    <Form @submit.prevent="submitForm">
      <InputText v-model="product.manufacturer" placeholder="Производитель" />
      <InputText v-model="product.article" placeholder="Артикул" />
      <InputText v-model="product.name" placeholder="Наименование" />
      <InputText v-model="product.craft" placeholder="Крафт" />
      <InputText v-model="product.texture" placeholder="Текстура" />
      <InputText v-model="product.class" placeholder="Однотонные (белый холодный)" />
      <InputText v-model="product.type" placeholder="Назначение" />
      <InputText v-model="product.size" placeholder="Формат листа" />
      <InputText v-model="product.thickness" placeholder="Толщина" />
      <InputText v-model="product.area" placeholder="Площадь" />
      <InputText v-model="product.price" placeholder="Прайсовая стоимость" />
      <Button :disabled="isFormIncomplete" type="submit" label="Сохранить" />
    </Form>

    <DataTable :value="products">
      <Column field="manufacturer" header="Производитель" />
      <Column field="article" header="Артикул" />
      <Column field="name" header="Наименование" />
      <Column field="craft" header="Крафт" />
      <Column field="texture" header="Текстура" />
      <Column field="class" header="Класс" />
      <Column field="type" header="Тип" />
      <Column field="size" header="Размер" />
      <Column field="thickness" header="Толщина" />
      <Column field="area" header="Площадь" />
      <Column 
        body="{(rowData) => deleteProduct(rowData)}"
        headerStyle="width:8rem"
        :body="{ rowData }">
        <template #body="{ rowData }">
          <Button label="Удалить" icon="pi pi-times" @click.prevent="deleteProduct(rowData)" />
          <Button label="Редактировать" icon="pi pi-pencil" @click.prevent="editProduct(rowData)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>


<style lang="scss">
 h1 {
    color: white
 }
</style>