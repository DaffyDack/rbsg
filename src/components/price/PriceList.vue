  <script setup>
  import { ref,computed } from 'vue'
  import Button from 'primevue/button';
 

    const {items} = defineProps(['items']);

    

    const totalCostList = computed(() => {
                  return items.reduce((acc, product) => {
                return acc + parseFloat(product.totalCost); 
            }, 0).toFixed(2); 
      
    });

      const calculateSmallWholesaleList = computed(() => {
        return items.reduce((acc, product) => {
                return acc + parseFloat(product.calculateSmallWholesalePrice); 
            }, 0).toFixed(2); 
    });

    const calculateWholesaleList = computed(() => {
    
         return items.reduce((acc, product) => {
                return acc + parseFloat(product.calculateWholesalePrice); 
            }, 0).toFixed(2); 
       
    });

    const calculateDealerList = computed(() => {
       return items.reduce((acc, product) => {
                return acc + parseFloat(product.calculateDealerPrice); 
            }, 0).toFixed(2); 
       });
   

</script>

<template>
        <table v-if="items.length >0">
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
              <th>Итого</th>
              <th>Малый опт</th>
              <th>Опт</th>
              <th>Дилер</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
     
            <tr v-for="(item, index) in items":key="index">
                <th>{{index + 1}}</th>
                <th>фото</th>
                <th>{{item.article}}</th>
                <th>{{item.name}}</th>
                <th>{{item.size}}</th>
                <th>{{item.thickness}}</th>
                <th>{{item.kraft}}</th>
                <th>{{item.texture}}</th>
                <th>{{item.purposes}}</th>
                <th>{{item.additional}}</th>
                <th>{{item.totalCost}}</th>
                <th>{{item.calculateSmallWholesalePrice}}</th>
                <th>{{item.calculateWholesalePrice}}</th>
                <th>{{item.calculateDealerPrice}}</th>
                <tr>
                    <div class="buttonAdd">
                        <Button @click="$emit('remove', index)">X</Button>
                    </div>
                </tr>
         </tr>
         <tr v-if="items.length >0" class="trTotal">
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
           <th>{{totalCostList}}</th>
            <th>{{calculateSmallWholesaleList}}</th>
            <th>{{calculateWholesaleList}}</th>
            <th>{{calculateDealerList}}</th> 
            <th></th>
         </tr>
        </tbody>
    
    <Button >Скачать PDF</Button>
    </table>
</template>

<style coped lang="scss">

.buttonAdd {
    display: flex;
    justify-content: center;
    // min-width: 70px;
    height: 50px;
    width: auto;
   
    // background: white;

} 
    .body-price {
        background: white;
        display: flex;
        justify-content: center;
    }
    th, td {
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
         
</style>f