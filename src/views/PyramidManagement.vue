<script setup lang="ts">
import { ref } from "vue";
import OrganizationChart from 'primevue/organizationchart';

const data = ref({
    key: '0',
    type: 'country',
    label: 'Генеральный директор',
    data: {
        image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
        name: 'Amy Elsner',
        title: 'CEO'
    },
    children: [
        {
            key: '0_0',
            type: 'country',
            label: 'Коммерческий директор',
            data: {
                image: 'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    key: '0_0_0',
                    type: 'country',
                    label: 'Отдел продаж Атэри',
                    data: {
                        image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
                        name: 'Amy Elsner',
                        title: 'CEO'
                    }
                },
                {
                    key: '0_0_1',
                    type: 'country',
                    label: 'Тендерный отдел',
                    data: {
                        image: 'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
                        name: 'Amy Elsner',
                        title: 'CEO'
                    }
                }
            ]
        },
        {
            key: '0_1',
            type: 'country',
            label: 'Технический директор',
            data: {
                image: 'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    key: '0_1_0',
                    type: 'country',
                    label: 'Производство',
                    data: {
                        image: 'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
                        name: 'Amy Elsner',
                        title: 'CEO'
                    }
                },
                {
                    key: '0_1_1',
                    type: 'country',
                    label: 'Отдел МТО',
                    data: {
                        image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
                        name: 'Amy Elsner',
                        title: 'CEO'
                    }
                }
            ]
        }
    ]
});


</script>

<template>
    <div>
        <div class="card overflow-x-auto">
            <OrganizationChart :value="data" collapsible>
                <template #country="slotProps">
                    <div class="flex flex-col items-center">
                        <img :alt="slotProps.node.label" :src="slotProps.node.data.image"
                            :class="`w-2rem flag flag-${slotProps.node.data}`" />
                        <div class="mt-4 font-medium text-lg">{{ slotProps.node.label }}</div>
                    </div>
                </template>
                <template #default="slotProps">
                    <span>{{ slotProps.node.data.label }}</span>

                </template>
            </OrganizationChart>
        </div>
    </div>
</template>
