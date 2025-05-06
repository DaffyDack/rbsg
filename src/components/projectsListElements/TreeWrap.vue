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
        <ul class="tree-list">
            <node-tree :node="props.treeData"></node-tree>
        </ul>

    </div>
</template>


<style>
.tree-list ul {
    margin: 6px 0;
    padding-left: 16px;
}
</style>