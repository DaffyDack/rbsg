<script setup lang="ts">

import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import Tabs from 'primevue/tabs'
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel'
import { ref, type Ref, onMounted, computed} from 'vue';
import Price from './Price.vue'
import PriceListPhl from '@/components/price/PriceListPhl.vue'

const products = ref([]);
onMounted(async () => {
  try {
    const response = await fetch('../../public/data.json'); 
    if (!response.ok) {
      throw new Error('Сеть ответила с ошибкой');
    }
    const data = await response.json();
    console.log(data)
    products.value = data; 
    } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
});

interface Tabs {
  component: string
  title: string
  errors: boolean
}

const tabs: Ref<Tabs[]> = ref([
  { component: 'Price', title: 'Листовой PHL', errors: false },
  { component: 'Price', title: 'Столешницы', errors: false },
  { component: '', title: 'Столешницы раскрой', errors: false },
  ]);

</script>
<template>
   <div class="sidebar">
      <div class="nano">
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
           <TabPanel  value="0">
                  <Price />
           </TabPanel>
           <TabPanel value="1">
                 <PriceListPhl :items= "products"/>
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
      transition: 250ms cubic-bezier(0.35,0,0.25,1);
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

.wrapper_setting_profile {
  .p-tablist-tab-list {
    // background: none !important;
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

  // .card {
  //    padding: 20px;
  //   border-radius: 16px;
  //   overflow: hidden;
  //   margin-bottom: 16px;

    
  //   .tag_error {
  //     position: relative;

  //     .tag {
  //       display: block;
  //       opacity: 0;
  //       width: 10px;
  //       height: 10px;
  //       background: red;
  //       position: absolute;
  //       right: 8px;
  //       top: 16px;
  //       border-radius: 100%;

  //       &.error {
  //         opacity: 1;
  //       }
  //     }
  //   }
  // }

  .buttonWrapper {
    color: #fff;
    font-size: 14px;
    margin: 0;
    padding: 0;

    .saveButton {
      background: #06a80b;
      min-height: 42px;
      min-width: 280px;
      border-radius: 16px;
      margin-right: 15px;
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
