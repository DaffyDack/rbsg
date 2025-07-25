<script setup lang="ts">
import { ref } from 'vue'
import OrganizationChart from 'primevue/organizationchart'

const data = ref({
  key: '0',
  type: 'country',
  label: 'Генеральный директор',
  data: {
    image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    name: 'Amy Elsner',
    title: 'CEO',
  },
  children: [
    {
      key: '0_0',
      type: 'country',
      label: 'Коммерческий директор',
      data: {
        image: 'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
        name: 'Amy Elsner',
        title: 'CEO',
      },
      children: [
        {
          key: '0_0_0',
          type: 'country',
          label: 'Отдел продаж Атэри',
          data: {
            image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
            name: 'Amy Elsner',
            title: 'CEO',
          },
          children: [
            {
              key: '0_0_0_0',
              type: 'country',
              label: 'Производство 4 вложенности',
              data: {
                image: 'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
                name: 'Amy Elsner',
                title: 'CEO',
              },
            },
            {
              key: '0_0_0_1',
              type: 'country',
              label: 'Производство 4 вложенности',
              data: {
                image: 'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
                name: 'Amy Elsner',
                title: 'CEO',
              },
            },
          ],
        },
        {
          key: '0_0_1',
          type: 'country',
          label: 'Тендерный отдел',
          data: {
            image: 'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
            name: 'Amy Elsner',
            title: 'CEO',
          },
        },
      ],
    },
    {
      key: '0_1',
      type: 'country',
      label: 'Технический директор',
      data: {
        image: 'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
        name: 'Amy Elsner',
        title: 'CEO',
      },
      children: [
        {
          key: '0_1_0',
          type: 'country',
          label: 'Производство',
          data: {
            image: 'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
            name: 'Amy Elsner',
            title: 'CEO',
          },
        },
        {
          key: '0_1_1',
          type: 'country',
          label: 'Отдел МТО',
          data: {
            image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
            name: 'Amy Elsner',
            title: 'CEO',
          },
        },
        {
          key: '0_1_2',
          type: 'country',
          label: 'Отдел МТО',
          data: {
            image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
            name: 'Amy Elsner',
            title: 'CEO',
          },
        },
      ],
    },
    {
      key: '0_2',
      type: 'country',
      label: 'Технический директор',
      data: {
        image: 'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
        name: 'Amy Elsner',
        title: 'CEO',
      },
      children: [
        {
          key: '0_2_0',
          type: 'country',
          label: 'Производство',
          data: {
            image: 'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
            name: 'Amy Elsner',
            title: 'CEO',
          },
        },
        {
          key: '0_2_1',
          type: 'country',
          label: 'Отдел МТО',
          data: {
            image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
            name: 'Amy Elsner',
            title: 'CEO',
          },
        },
        {
          key: '0_2_2',
          type: 'country',
          label: 'Отдел МТО',
          data: {
            image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
            name: 'Amy Elsner',
            title: 'CEO',
          },
        },
      ],
    },
  ],
})

</script>

<template>
  <div>
    <div class="OrganizationChart">
      <div class="card overflow-x-auto">
        <OrganizationChart :value="data" collapsible>
          <template #country="slotProps">
            <div class="flex flex-col items-center">
              <img :alt="slotProps.node.label" :src="slotProps.node.data.image"
                :class="`w-2rem flag flag-${slotProps.node.data}`" />
              <span class="font-bold mb-2" style="min-width: 200px">{{
                slotProps.node.data.name
                }}</span>
              <span>{{ slotProps.node.data.title }}</span>
            </div>
          </template>
          <template #default="slotProps">
            <span class="toster">{{ slotProps.node.data.name }}</span>
          </template>
        </OrganizationChart>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.OrganizationChart {
  position: relative;

  .card {
    color: red;
    position: absolute;
  }
}
</style>
