<script setup lang="ts">
const tasks = defineProps({
  title: {
    default: '',
    type: String,
  },
  value: {
    required: true,
  },
})
</script>

<template>
  <div>
    <h3>{{ tasks.title }}</h3>
    <pre class="bg-gray-300 rounded-lg p-5">{{ tasks.value }}</pre>
  </div>
</template>

<style scoped>
pre {
  font-size: 10px;
  text-align: start;
}
</style>
