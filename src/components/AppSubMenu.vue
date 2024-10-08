<template>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem">
        <n-input placeholder="search collections.." style="margin: 1rem auto; max-width: 85%" />
        <div v-for="collection in collections" :key="collection">
            <n-button strong secondary type="tertiary" style="min-width: 80%">
                <template #icon>
                    <n-icon>
                        <Cash />
                    </n-icon>
                </template>
                {{ collection }}
            </n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Cash } from '@vicons/ionicons5'
const collections = ref<string[]>(['Collection', 'User']);
</script>