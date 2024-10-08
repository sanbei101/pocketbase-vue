<template>
  <n-layout has-sider>
    <!-- 侧边栏 -->
    <n-layout-sider :width="80" bordered>
      <n-menu :options="menuOptions" mode="vertical" />
    </n-layout-sider>

    <!-- 主体内容区 -->
    <n-layout-content>
      <n-split direction="horizontal" :max="0.15" :min="0.1" :default-size="0.15" style="height: 100vh">
        <template #1>
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
        <template #2>
          <div class="container" style="margin: 0.5rem">
            <AppHeader />
            <n-input style="max-width: 80%; margin: 1rem auto" placeholder="search records.." />
            <n-data-table :columns="columns" :data="TableRecords" :row-key="rowKey" :pagination="pageNation" />
          </div>
        </template>
      </n-split>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import { type MenuOption, type DataTableColumn, NButton } from 'naive-ui';
import { HomeOutline, SettingsOutline, Cash } from '@vicons/ionicons5'; // 导入图标
import AppHeader from '@/components/AppHeader.vue';
const collections = ref<string[]>(['Collection', 'User']);
// 定义菜单选项
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

// 定义表格记录类型
type TableRecord = {
  id: number;
  name: string;
  age: number;
  address: string;
};
const pageNation = {
  pageSize: 10
};

// 定义表格数据
const TableRecords = ref<TableRecord[]>([
  {
    id: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    id: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    id: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]);

// 定义表格的列配置，包括 id 列和操作列
const columns: DataTableColumn<TableRecord>[] = [
  {
    type: 'selection'
  },
  {
    title: 'ID',
    key: 'id',
    sorter: (row1, row2) => row1.id - row2.id
  },
  {
    title: 'Name',
    key: 'name',
    sorter: (row1, row2) => row1.name.localeCompare(row2.name)
  },
  {
    title: 'Age',
    key: 'age',
    sorter: (row1, row2) => row1.age - row2.age
  },
  {
    title: 'Address',
    key: 'address'
  },
  {
    title: '操作',
    key: 'actions',
    render(row: TableRecord) {
      return h(
        NButton,
        {
          type: 'error',
          onClick: () => {
            deleteRecord(row.id);
          }
        },
        'Delete'
      );
    }
  }
];
const rowKey = (row: TableRecord) => row.id;

// 定义删除记录的函数
const deleteRecord = (id: number) => {
  TableRecords.value = TableRecords.value.filter((record) => record.id !== id);
};
</script>
