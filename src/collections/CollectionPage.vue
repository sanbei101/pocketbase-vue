<template>
    <n-split direction="horizontal" :max="0.15" :min="0.1" :default-size="0.15" style="height: 100vh">
        <template #1>
            <CollectionMenu />
        </template>
        <template #2>
            <div class="container" style="margin: 0.5rem">
                <CollectionRecords />
            </div>
        </template>
    </n-split>
</template>

<script setup lang="ts">
import CollectionMenu from '@/collections/CollectionMenu.vue'
import CollectionRecords from '@/collections/CollectionRecords.vue'
</script>