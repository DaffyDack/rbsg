<script setup lang="ts">
import NodeTreeTest from './NodeTreeTest.vue';

const props = defineProps({
    treeData: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="tree">
        <ul class="tree-list ml-[30px]">
            <node-tree-test :node="props.treeData"></node-tree-test>
        </ul>
    </div>
</template>


