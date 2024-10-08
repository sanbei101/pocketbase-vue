<template>
  <n-message-provider>
    <n-layout has-sider>
      <n-layout-sider :width="80" bordered>
        <AppMenu />
      </n-layout-sider>

      <n-layout-content>
        <n-split direction="horizontal" :max="0.15" :min="0.1" :default-size="0.15" style="height: 100vh">
          <template #1>
            <AppSubMenu />
          </template>
          <template #2>
            <div class="container" style="margin: 0.5rem">
              <AppTable />
            </div>
          </template>
        </n-split>
      </n-layout-content>
    </n-layout>
  </n-message-provider>
</template>

<script setup lang="ts">
</script>
