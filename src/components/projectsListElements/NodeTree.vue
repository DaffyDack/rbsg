<script setup lang="ts">
const props = defineProps({
    node: {
        type: Object,
        required: true
    }
})
console.log(props.node, 'node')
</script>

<template>
    <li class="node-tree">
        <span class="label">{{ props.node.nameProject }}</span>
        <ul v-if="props.node.children && props.node.children.length">
            <node-tree v-for="child in props.node.children" :key="child.id" :node="child"></node-tree>
        </ul>
    </li>
</template>