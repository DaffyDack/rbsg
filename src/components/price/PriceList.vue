  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { onMounted } from 'vue';
  import Button from 'primevue/button';
  import html2pdf from 'html2pdf.js'
  import { type IProduct } from '../../views/Price.vue'

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

  const { items } = defineProps(['items']);

  const totalCostList = computed(() => {
    return items.reduce((acc: number, product: IProduct) => {
      return acc + product.totalCost;
    }, 0).toFixed(2);
  });

  const calculateSmallWholesaleList = computed<number>(() => {
    return items.reduce((acc: number, product: IProduct) => {
      return acc + product.calculateSmallWholesalePrice;
    }, 0).toFixed(2);
  });

  const calculateWholesaleList = computed<number>(() => {

    return items.reduce((acc: number, product: IProduct) => {
      return acc + product.calculateWholesalePrice;
    }, 0).toFixed(2);
  });

  const calculateDealerList = computed<number>(() => {
    return items.reduce((acc: number, product: IProduct) => {
      return acc + product.calculateDealerPrice;
    }, 0).toFixed(2);
  });
</script>

<template>
  <div id="pdf">

    <table id="pdf" v-if="items.length > 0">
      <thead>
        <tr>
          <th>№</th>
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
          <th>{{ index + 1 }}</th>
          <th>фото</th>
          <th>{{ item.article }}</th>
          <th>{{ item.name }}</th>
          <th>{{ item.size }}</th>
          <th>{{ item.thickness }}</th>
          <th>{{ item.kraft }}</th>
          <th>{{ item.texture }}</th>
          <th>{{ item.purposes }}</th>
          <th>{{ item.additional }}</th>
          <th>{{ item.totalCost }}</th>
          <th>{{ item.calculateSmallWholesalePrice }}</th>
          <th>{{ item.calculateWholesalePrice }}</th>
          <th>{{ item.calculateDealerPrice }}</th>
        <tr class="buttonAdd" @click="$emit('remove', index)">
          Х
        </tr>
        </tr>

        <tr v-if="items.length > 0" class="trTotal">
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
        </tr>
      </tbody>

      <Button @click="exportToPDF">Скачать PDF</Button>
    </table>
  </div>
</template>

<style coped lang="scss">
@media print {
  #pdf {
    font-size: 8px;
  }

  .buttonAdd {
    display: none;
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