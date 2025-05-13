<script lang="ts">
import { defineComponent, ref } from 'vue'
import nestedDraggable from '../components/dragAndDrop/NestedList.vue'
import rawDisplay from '../components/dragAndDrop/RawDisplay.vue'
export default defineComponent({
    name: 'nested-example',
    display: 'Nested',
    order: 15,
    components: {
        rawDisplay,
        nestedDraggable,
    },
    setup() {
        const list = ref([
            {
                name: 'task 1',
                deadline: '10.10.2026',
                start: '12.04.2025, 14:55',
                page: 'projects',
                id: 1,
                timeExecution: '2ч',
                preliminaryCost: '12 000',
                cost: '12 000',
                tasks: [
                    {
                        name: 'task 1.1',
                        deadline: '10.10.2026',
                        start: '12.04.2025, 14:55',
                        page: 'projects',
                        id: 1.1,
                        timeExecution: '2ч',
                        preliminaryCost: '12 000',
                        cost: '12 000',
                        tasks: [],
                    },
                ],
            },
            {
                name: 'task 2',
                deadline: '10.10.2026',
                page: 'projects',
                start: '12.04.2025, 14:55',
                id: 2,
                timeExecution: '2ч',
                preliminaryCost: '12 000',
                cost: '12 000',
                tasks: [
                    {
                        name: 'task 2.1',
                        deadline: '10.10.2026',
                        start: '12.04.2025, 14:55',
                        page: 'projects',
                        id: 2.1,
                        timeExecution: '2ч',
                        preliminaryCost: '12 000',
                        cost: '12 000',
                        tasks: [],
                    },
                ],
            },
            {
                name: 'task 3',
                deadline: '10.10.2026',
                start: '12.04.2025, 14:55',
                page: 'projects',
                id: 3,
                timeExecution: '2ч',
                preliminaryCost: '12 000',
                cost: '12 000',
                tasks: [],
            },
        ])
        // const list = ref([
        //     {
        //         page: 'projects', id: 1, name: 'Создать рабочий стол', deadline: '10.10.2026', timeExecution: '2ч', start: '12.04.2025, 14:55', cost: '12 000', preliminaryCost: '12 000', tasks: [{
        //             page: 'projects', id: 1.1, name: 'Купить монитор'
        //         }]
        //     },
        //     { page: 'projects', id: 2, name: 'Собрать мангал', deadline: '10.10.2026', timeExecution: '2ч', start: '12.04.2025, 14:55', cost: '12 000', preliminaryCost: '12 000' },
        //     {
        //         page: 'projects', id: 3, name: 'Настроить комп', deadline: '10.10.2026', timeExecution: '2ч', start: '12.04.2025, 14:55', cost: '12 000', preliminaryCost: '12 000', tasks: [{
        //             page: 'projects', id: 3.1, name: 'Купить монитор'
        //         }, {
        //             page: 'projects', id: 3.2, name: 'Купить монитор', tasks: [{
        //                 page: 'projects', id: 3.21, name: 'Купить монитор'
        //             }]
        //         }]
        //     },
        // ])
        return { list }
    },
})
</script>
<template>

    <div class="flex justify-center w-[100%]">
        <div class="w-[100%] mr-2">
            <nested-draggable :tasks="list" />
        </div>

        <rawDisplay class="w-64" :value="list" />
    </div>
</template>
<style scoped></style>