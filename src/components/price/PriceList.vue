  <script setup lang="ts">
  import { ref, computed, watchEffect } from 'vue'
  import { onMounted } from 'vue';
  import Button from 'primevue/button';

  import { type IProduct } from '../../views/Price.vue'
  const name = ref(JSON.parse(localStorage.getItem('role') || ''))
  const editingIndex = ref();
  const editedItem = ref();
  const { items } = defineProps<{ items: Array<Record<string, any>> }>();

  const getNamesString = computed(() => {
    if (items[0].options && Array.isArray(items[0].options)) {
      return items[0].options.map(type => type.name).join(', ');
    }
    return '';

  });
  const startEditing = (index: number) => {
    editingIndex.value = index;
    editedItem.value = { ...items[index] };
  };


  const saveEdit = () => {
    if (editingIndex.value !== null && editedItem.value) {
      items[editingIndex.value] = { ...editedItem.value };
      editingIndex.value = null;
      editedItem.value = null;
    }
  };


  const cancelEdit = () => {
    editingIndex.value = null;
    editedItem.value = null;
  };
</script>

<template>
  <div id="pdf">

    <table id="pdf" v-if="items.length > 0">
      <thead>
        <tr>
          <th>№</th>
          <th>Производитель</th>
          <th>Фото</th>
          <th>Артикул</th>
          <th>Название</th>
          <th>Размер</th>
          <th>Толщина</th>
          <th>Крафт</th>
          <th>Текстура</th>
          <th>Назначение</th>
          <th>Дополнительно</th>
          <th>Розница (до 5 листов)</th>
          <th>Мелкий опт<br>(от 6 листов)</br> <br>Скидка 10%</br> </th>
          <th>Опт <br>(от 30 листов)</br><br>Скидка 20%</br></th>
          <th>Дилер <br>Скидка 30%</br></th>
          <th></th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="editingIndex !== index">{{ item.manufacturer }}</td>
          <td v-else><input v-model="editedItem.manufacturer" /></td>

          <td>фото</td>

          <td v-if="editingIndex !== index">{{ item.article }}</td>
          <td v-else><input v-model="editedItem.article" /></td>

          <td v-if="editingIndex !== index">{{ item.name }}</td>
          <td v-else><input v-model="editedItem.name" /></td>

          <td v-if="editingIndex !== index">{{ item.size }}</td>
          <td v-else><input v-model="editedItem.size" /></td>

          <td v-if="editingIndex !== index">{{ item.thickness }}</td>
          <td v-else><input v-model="editedItem.thickness" /></td>

          <td v-if="editingIndex !== index">{{ item.craft }}</td>
          <td v-else><input v-model="editedItem.craft" /></td>

          <td v-if="editingIndex !== index">{{ item.texture }}</td>
          <td v-else><input v-model="editedItem.texture" /></td>

          <td v-if="editingIndex !== index">{{ item.class }}</td>
          <td v-else><input v-model="editedItem.class" /></td>

          <td v-if="editingIndex !== index">{{ item.options }}</td>
          <td v-else><input v-model="editedItem.options" /></td>

          <td v-if="editingIndex !== index">{{ item.totalCost }}</td>
          <td v-else><input v-model="editedItem.totalCost" /></td>

          <td v-if="editingIndex !== index">{{ item.calculateSmallWholesalePrice }}</td>
          <td v-else><input v-model="editedItem.calculateSmallWholesalePrice" /></td>
          <td v-if="editingIndex !== index">{{ item.calculateWholesalePrice }}</td>
          <td v-else><input v-model="editedItem.calculateWholesalePrice" /></td>

          <td v-if="editingIndex !== index">{{ item.calculateDealerPrice }}</td>
          <td v-else><input v-model="editedItem.calculateDealerPrice" /></td>

          <td v-if="name.role === 'ADMIN'" class="buttonAdd">
            <Button @click="startEditing(index)">Редактировать</Button><br>
            <Button v-if="editingIndex === index" @click="saveEdit">Сохранить</Button><br>
            <Button v-if="editingIndex === index" @click="cancelEdit">Отмена</Button><br>
          </td>
          <Button @click="$emit('remove', index)">Х</Button><br>
        </tr>
        <!-- <tr v-for="(item, index) in items" :key="index">
          <th>{{ index + 1 }}</th>
          <th>{{ item.manufacturer }}</th>
          <th>фото</th>
          <th>{{ item.article }}</th>
          <th>{{ item.name }}</th>
          <th>{{ item.size }}</th>
          <th>{{ item.name }}</th>
          <th>{{ item.craft }}</th>
          <th>{{ item.texture }}</th>
          <th>{{ item.class }}</th>
          <th>{{ item.options }}</th>
          <th>{{ item.totalCost }}</th>
          <th>{{ item.calculateSmallWholesalePrice }}</th>
          <th>{{ item.calculateWholesalePrice }}</th>
          <th>{{ item.calculateDealerPrice }}</th>
          <tr class="buttonAdd" @click="$emit('remove', index)"> Х </tr>
        </tr> -->

        <!-- <tr v-if="items.length > 0" class="trTotal">
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>Итого</th>
          <th>{{ totalCostList }}</th>
          <th>{{ calculateSmallWholesaleList }}</th>
          <th>{{ calculateWholesaleList }}</th>
          <th>{{ calculateDealerList }}</th>
          <th></th>
        </tr> -->
      </tbody>


    </table>
  </div>
</template>

<style coped lang="scss">
@media print {
  #pdf {
    font-size: 8px;
  }

  .buttonAdd {
    display: flex;
  }
}

#pdf {
  width: 100%;
  table-layout: auto;
}

.buttonAdd {
  display: flex;
  justify-content: center;
  min-width: 50px;
  height: 50px;
  width: auto;
  background: white;

}

.buttonAdd:hover {
  background-color: rgb(157, 167, 176);
  box-shadow: 0 0 10px rgba(0, 138, 251, 0.8);
  transition-delay: 0.1s
}

.body-price {
  background: white;
  display: flex;
  justify-content: center;
}

th,
td {
  background: none;
  border: 1px solid #ddd;
  padding: 8px;
  font-size: smaller;
  height: 50px;
  font-weight: initial;

}

tr {
  width: 100%;
}

.trTotal {
  background: wheat;

  &:nth-child(-n+9) {
    border: none;

  }

}

.body-price {
  background: white;
  display: flex;
  justify-content: center;
}

th,
td {
  background: none;
  border: 1px solid #ddd;
  padding: 8px;
  font-size: smaller;
  height: 50px;
  font-weight: initial;

}

tr {
  width: 100%;
}

.trTotal {
  background: wheat;

  &:nth-child(-n+9) {
    border: none;

  }

}
</style>