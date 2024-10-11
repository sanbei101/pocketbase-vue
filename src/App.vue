<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <n-layout has-sider>
        <n-layout-sider :width="80" bordered>
          <AppMenu />
        </n-layout-sider>

        <n-layout-content>
          <router-view />
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme } from 'naive-ui';
</script>
