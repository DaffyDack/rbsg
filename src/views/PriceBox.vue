  <script setup lang="ts">

  import TabList from 'primevue/tablist'
  import Tab from 'primevue/tab'
  import Tabs from 'primevue/tabs'

  import TabPanel from 'primevue/tabpanel'
  import { ref, type Ref, onMounted, computed, watch } from 'vue';
  import PriceListPhl from '@/components/price/PriceListPhl.vue'
  import DatePrice from '@/components/price/DatePrice.vue'
  import InputNumber, { type InputNumberInputEvent } from 'primevue/inputnumber';
  import FormPrice from '@/components/price/FormPrice.vue';
  import Tabletop from '@/components/price/Tabletop.vue';


  const name = ref(JSON.parse(localStorage.getItem('role') || ''))


  interface Tabs {
    component: string
    title: string
    errors: boolean
  }

  const tabs: Ref<Tabs[]> = ref([
    { component: 'DataPrice', title: 'Листовой PHL', errors: false },
    { component: 'Price', title: 'Столешницы', errors: false },
    { component: '', title: 'Столешницы раскрой', errors: false },
    { component: '', title: 'Добавление позиции в базу', errors: false },
  ]);

  const euro = ref()
  const initialPrice = ref()
  const products = ref([]);
  const selectedCourse = ref('EUR')
  const selectedTypeCalc = ref('Заказ')


  const inputConversion = ref(1.03)
  const inputOverheadCosts = ref(1.7)
  const urlInStock = '../../public/dataPrice.json'
  const urlOrder = '../../public/data.json'
  const urlOrderDate = '../../public/orderDate.json'

  const valute = { 'Американский доллар': 'USD', 'Индийская рупия': 'INR', 'Евро': 'EUR' }
  const typeCalc = { "Заказ": "Заказ", 'В наличии': "В наличии" }

  const token = "0f54e5e6b25475a140f44143c70830db"
  const urlAPpi = 'https://www.cbr-xml-daily.ru/daily_json.js';
  const dataRatio = computed(() => {

    return {
      inputConversion: inputConversion.value,
      inputOverheadCosts: inputOverheadCosts.value
    }
  })
  const getСourse = async () => {
    try {
      const res = await fetch(urlAPpi);
      const data = await res.json();
      const course = data.Valute[selectedCourse.value]

      const nominal = course.Nominal
      const valute = course.Previous.toFixed(2) / nominal
      if (selectedCourse.value === 'EUR') {
        initialPrice.value = course;

      }
      if (course) {
        euro.value = valute.toFixed(2);
      } else {
        euro.value = '';

      }
    } catch (error) {
      euro.value = 'Ошибка! или валюта не выбрана. ';
      console.error(error);
    }
  }
  getСourse()



  const getProducts = async () => {
    let url = urlInStock
    try {
      if (selectedTypeCalc.value === 'Заказ') {
        url = urlOrder

      }
      const response = await fetch(`${url}`);
      if (!response.ok) {
        throw new Error('Сеть ответила с ошибкой');
      }

      const data = await response.json();
      const resOrder = await fetch(`${urlOrderDate}`)

      // console.log(categoryProducts)
      products.value = data;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }
  onMounted(getProducts);

  watch(selectedTypeCalc, (newValue) => {

    getProducts();
  });




</script>
<template>
  <div class="sidebar">
    <div class="nano">

      <div>
        <select v-model="selectedCourse" @change="getСourse" style="width: 100px">
          <option v-for="value in valute" :key="value" :value="value">{{ value }}</option>
        </select>
        <span class="api">Текущий курс {{ selectedCourse }} {{ euro }} руб.</span>
        <div>
          <select v-model="selectedTypeCalc" @change="getСourse" style="width: 100px">

            <option v-for="value in typeCalc" :key="value" :value="value">{{ value }}</option>
          </select>
        </div>
        <div v-if="name.role === 'ADMIN'" class="inputNumber">
          <div class="flex-auto">
            <label class="labelInput">Конвертация</label>
            <InputNumber v-model="inputConversion" inputId="locale-us" locale="en-US" :minFractionDigits="2" />
          </div>
          <div class="flex-auto">
            <label class="labelInput">Накладные расходы</label>
            <InputNumber v-model="inputOverheadCosts" inputId="locale-us" locale="en-US" :minFractionDigits="2" />
          </div>
        </div>
      </div>
      <div class="title_setting_profile">Расчет стоимости продукции</div>
      <div class="wrapper_setting_profile">
        <div class="cardTab">
          <Tabs value="0" scrollable>
            <TabList>
              <Tab v-for="(tab, i) in tabs" :key="i" :value="String(i)" class="tag_error">
                <span class="tag" :class="{ error: tab.errors }"></span>
                {{ tab.title }}
              </Tab>
            </TabList>
            <TabPanels style="background: black;">
              <TabPanel value="0">
                <DatePrice :items="products" :curs="euro" :dataRatio="dataRatio" :initialPrice="initialPrice" />
              </TabPanel>
              <TabPanel value="1">
                <Tabletop :items="products" />
              </TabPanel>

              <TabPanel value="2">
                <PriceListPhl :items="products" :curs="euro" :initialPrice="initialPrice" />
              </TabPanel>

              <TabPanel v-if="name.role === 'ADMIN'" value="3">
                <FormPrice :items="products" />
              </TabPanel>

            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cardTab {

  .p-tabview-tablist {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
    flex: 1 1 auto;
    background: var(--p-tabview-tab-list-background);
    border: 1px solid var(--p-tabview-tab-list-border-color);
    border-width: 0 0 1px 0;
    position: relative;
    justify-content: center;
  }

  .p-tabview-ink-bar {
    z-index: 1;
    display: block;
    position: absolute;
    bottom: -1px;
    height: 1px;
    background: #0c5be5;
    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
  }

  .p-tabpanel .p-tabpanel-active {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
      linear-gradient(270deg, rgba(0, 0, 0, 0) 70%, rgba#008afb1a(0, 138, 251, 0.1) 100%),
      linear-gradient(90deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
      linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
      linear-gradient(0deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%);
  }

}
</style>

<style scoped lang="scss">
.p-inputnumber .p-component .p-inputwrapper .p-inputwrapper-filled {
  color: white;
  padding: 15px;
}

.labelInput {
  color: white;
}

.inputNumber {
  display: flex;
}

.wrapper_setting_profile {
  .p-tablist-tab-list {
    background: none !important;
  }
}
</style>
<style scoped lang="scss">
.title_setting_profile {
  font-size: 24px;
  color: #fff;
}


.wrapper_setting_profile {

  background: #ffffffe9;
  padding: 32px;
  border-radius: 24px;
  margin-top: 25px;



  .buttonWrapper {
    color: #fff;
    font-size: 14px;
    margin: 0;
    padding: 0;

    .saveButton {
      background: #178FFF;
      background: linear-gradient(45deg, rgba(23, 143, 255, 1) 0%, rgba(255, 51, 228, 1) 100%);
      min-height: 42px;
      min-width: 280px;
      border-radius: 16px;
      margin-right: 15px;
      font-size: 15px;
    }

    .cancelButton {
      background: #37382d;
      border-radius: 16px;
      margin-right: 15px;
      min-height: 42px;
      min-width: 95px;
    }
  }
}
</style>
