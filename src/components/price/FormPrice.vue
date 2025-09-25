<script setup lang="ts">
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { Products } from './DatePrice.vue';

const initialFormProduct: Products = {
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

const products = ref<Products[]>([]);
const product = ref<Products>(initialFormProduct);
const editingIndex = ref<number | null>(null);

const editProduct = (index: number) => {
    product.value = { ...products.value[index] };
    editingIndex.value = index;
};

const resetForm = () => {
    product.value = initialFormProduct;
    editingIndex.value = null;
};

const submitForm = () => {
    if (editingIndex.value !== null) {
        products.value[editingIndex.value] = { ...product.value };
    } else {
        products.value.push({ ...product.value, id: Date.now() });
    }
    resetForm();
};

const deleteProduct = (index: any) => {
    products.value.splice(index, 1);
};

const isFormIncomplete = computed(() => {
    return Object.values(product.value).some(value => !value);
});
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
      <InputText v-model="product.class" placeholder="Класс" />
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
      <Column header="Действия">
        <template #body="{index}">
          <Button label="Удалить" icon="pi pi-times" @click="deleteProduct(index)" />
          <Button label="Редактировать" icon="pi pi-pencil" @click="editProduct(index)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style lang="scss">
 h1 {
    color: white;
 }
</style>