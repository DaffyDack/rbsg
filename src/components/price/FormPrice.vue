    <script setup lang="ts">
        const props = defineProps<{items: Array<Record<string, any>>}>();
   
        const rename = {
        manufacturer:"Производитель",
        article: "Артикул",
        name:"Наименование",
        craft:"Крафт",
        texture:"Текстура",
        class: "class",
        type: "type",
        size: "size",
        thickness: "name",
        area: "area",
        price: "price"
    }

        const n = {
        manufacturer:"Производитель",
        article: "Артикул",
        name:"Наименование",
        craft:"Крафт",
        texture:"Текстура",
        class: "Однотонные (белый холодный)",
        type: "Назначение",
        size: "Формат листа",
        thickness: "Толщина",
        area: "Площадь"
        }
    
        function renameKeys(arr, renameMap) {
            return arr.map(obj => {
                const newObj = {};
                for (const [newKey, oldKey] of Object.entries(renameMap)) {
                    if (oldKey in obj) {
                        newObj[newKey] = obj[oldKey];
                    }
                }
                return newObj;
            });
        }

const renamedData = renameKeys(props?.items, rename);
console.log(renamedData);

 </script>


<template>

    <h1>Вот тут что то</h1>
   <div>{{props.items}}   </div>
</template>


<style lang="scss">
 h1 {
    color: white
 }
</style>