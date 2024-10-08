<template>
  <n-flex justify="space-between" style="padding: 0.5rem">
    <n-space style="display: flex; align-items: center">
      <n-breadcrumb>
        <n-breadcrumb-item to="/collection" :clickable="false">Collection</n-breadcrumb-item>
        <n-breadcrumb-item to="/collection/user">User</n-breadcrumb-item>
      </n-breadcrumb>
      <n-icon style="display: flex; align-items: center" size="20">
        <x-icon-settings />
      </n-icon>
      <n-icon style="display: flex; align-items: center" size="20">
        <rocket-sharp />
      </n-icon>
    </n-space>

    <n-space>
      <n-button>Api Priview</n-button>
      <n-button color="black">New Record</n-button>
    </n-space>
  </n-flex>
</template>

<script setup lang="ts">
import { SettingsOutline as XIconSettings, RocketSharp } from '@vicons/ionicons5';
</script>
