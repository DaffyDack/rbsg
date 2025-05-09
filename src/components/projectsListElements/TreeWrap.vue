<script setup lang="ts">
import NodeTree from './NodeTree.vue';

const props = defineProps({
    treeData: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div class="tree">
        <ul class="tree-list ml-[0]">
            <node-tree :node="props.treeData"></node-tree>
        </ul>
    </div>
</template>
