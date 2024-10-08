<template>
    <n-menu :options="menuOptions" mode="vertical" />
</template>


<script setup lang="ts">
import { type MenuOption } from 'naive-ui'
import { HomeOutline, SettingsOutline } from '@vicons/ionicons5'; // 导入图标
const menuOptions: MenuOption[] = [
    {
        label: () => h(HomeOutline), // 使用图标替代文字
        key: 'collection'
    },
    {
        label: () => h(SettingsOutline), // 使用设置图标替代文字
        key: 'setting'
    }
];
</script>