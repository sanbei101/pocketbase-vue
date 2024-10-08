<template>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem">
        <n-input placeholder="search collections.." style="margin: 1rem auto; max-width: 85%" />
        <div v-for="collection in props.collections" :key="collection">
            <n-button strong secondary type="tertiary" style="min-width: 80%" @click="selectCollection(collection)">
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

const props = defineProps<{
    collections: string[]
}>()
// 定义 emits，用于向父组件发送事件
const emit = defineEmits(['select'])

// 处理点击事件
const selectCollection = (collection: string) => {
    emit('select', collection)
}
</script>