  <script setup>
  import { ref,computed } from 'vue'
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
    console.log(totalCostList,calculateDealerList)

</script>

<template>

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
                        <button @click="$emit('remove', index)">X</button>
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
         
    
</template>

<style coped lang="scss">
button {
    width: 80px;
    border-radius: 50%;
       background:  linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
                    linear-gradient(270deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
                    linear-gradient(90deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
                    linear-gradient(180deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%),
                    linear-gradient(0deg, rgba(0, 0, 0, 0) 70%, rgba(0, 138, 251, 0.1) 100%);

}
button:hover {
      background-color: rgb(255, 77, 45); 
      box-shadow: 0 0 10px rgba(0, 138, 251, 0.8);
      transition-delay:0s
}
.buttonAdd {
    display: flex;
    justify-content: center;
    min-width: 70px;
    height: calc(70px * 1.2);
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
    .trTotal {
        background: wheat;
        &:nth-child(-n+9) {
           border: none;
          
         }

    }
         
</style>f