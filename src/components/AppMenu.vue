<template>
    <n-menu :options="menuOptions" mode="vertical" />
</template>


<script setup lang="ts">
import { type MenuOption } from 'naive-ui'
import { HomeOutline, SettingsOutline } from '@vicons/ionicons5'; // 导入图标
const menuOptions: MenuOption[] = [
    {
        label: () => h(HomeOutline),
        key: 'collection'
    },
    {
        label: () => h(SettingsOutline),
    }
];
</script>