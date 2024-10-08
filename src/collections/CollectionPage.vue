<template>
    <n-split direction="horizontal" :max="0.15" :min="0.1" :default-size="0.15" style="height: 100vh">
        <!-- 左侧菜单 -->
        <template #1>
            <CollectionMenu @select="handleSelect" :collections="collections" />
        </template>

        <!-- 右侧显示区域，根据选中的 collection 显示相应内容 -->
        <template #2>
            <div class="container" style="margin: 0.5rem">
                <CollectionRecords :selectedCollection="selectedCollection" />
            </div>
        </template>
    </n-split>
</template>

<script setup lang="ts">
import CollectionMenu from '@/collections/CollectionMenu.vue'
import CollectionRecords from '@/collections/CollectionRecords.vue'
const collections = ref<string[]>(['Collection', 'User'])

const selectedCollection = ref<string>('')

// 处理 CollectionMenu 的选择事件
const handleSelect = (collection: string) => {
    selectedCollection.value = collection
}

onMounted(() => {
    if (collections.value.length > 0) {
        selectedCollection.value = collections.value[0] // 设置默认值为第一个集合
    }
})
</script>