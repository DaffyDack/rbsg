<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'


const list = ref([
    { name: 'John', id: 1 },
    { name: 'Joao', id: 2 },
    { name: 'Jean', id: 3 },
    { name: 'Gerard', id: 4 },
])
function log(event) {
    console.log(event)
}
</script>

<template>
    <div class="flex m-10">
        <VueDraggableNext class="dragArea list-group w-full" :list="list" @change="log">
            <div class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center" v-for="element in list"
                :key="element.name">
                {{ element.name }}
            </div>
        </VueDraggableNext>
    </div>
</template>
<style scoped lang="scss"></style>
