<template>
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
</template>
