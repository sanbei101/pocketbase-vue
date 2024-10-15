<template>
  <n-flex justify="space-between" style="padding: 0.5rem">
    <n-space style="display: flex; align-items: center">
      <n-breadcrumb>
        <n-breadcrumb-item :clickable="false">Collection</n-breadcrumb-item>
        <n-breadcrumb-item :clickable="true">{{ props.selectedCollectionName }}</n-breadcrumb-item>
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
      <!-- <n-button color="black" @click="addRecordDrawerAction">New Record</n-button> -->
    </n-space>
  </n-flex>

  <n-input style="max-width: 80%; margin: 1rem auto" placeholder="search records.." />

  <n-data-table :columns="columns" :data="records" :row-key="rowKey" :pagination="pagination" max-height="800" />

  <!-- <n-drawer v-model:show="addRecordDrawer" :width="600">
    <n-drawer-content>
      <h3>添加新记录</h3>
      <n-form @submit.prevent="handleSubmit">
        <n-form-item label="Name">
          <n-input v-model:value="newRecord.name" placeholder="输入姓名" />
        </n-form-item>
        <n-form-item label="Age">
          <n-input-number v-model:value="newRecord.age" placeholder="输入年龄" />
        </n-form-item>
        <n-form-item label="Address">
          <n-input v-model:value="newRecord.address" placeholder="输入地址" />
        </n-form-item>
        <n-space>
          <n-button type="primary" @click="handleSubmit">添加</n-button>
          <n-button @click="addRecordDrawer = false">取消</n-button>
        </n-space>
      </n-form>
    </n-drawer-content>
  </n-drawer> -->
</template>

<script setup lang="ts">
import { DataTableColumn, NButton } from 'naive-ui';
import { SettingsOutline as XIconSettings, RocketSharp } from '@vicons/ionicons5';
import AxiosInstance from '@/util/axios';
const message = useMessage();
const props = defineProps<{
  selectedCollectionName: string;
  selectedCollectionId: string;
}>();
const pagination = {
  pageSize: 10
};
const rowKey = (record: RecordType) => record.id;

type RecordType = DataType & {
  id: string;
};
type DataType = {
  [key: string]: unknown;
};
type ItemType = {
  id: string;
  data: DataType; // DataType 表示的是嵌套的字段集合
};

const records = ref<RecordType[]>([]);

// 生成 records 的函数
const prepareTableRecords = () => {
  AxiosInstance.get('/record/get-record', {
    params: {
      collection_id: props.selectedCollectionId
    }
  })
    .then((res) => {
      if (res.data.success && res.data.data.length > 0) {
        // 处理返回的数据，将嵌套结构扁平化
        records.value = res.data.data.map((item: ItemType) => ({
          id: item.id,
          ...item.data
        }));
      } else {
        message.error('No data found or request failed');
      }
    })
    .catch((error) => {
      console.error('Error fetching records:', error);
    });
};

const columns = ref<DataTableColumn[]>([]);
// 生成动态 columns 的函数
const prepareColumns = () => {
  AxiosInstance.get('/record/get-record', {
    params: {
      collection_id: props.selectedCollectionId
    }
  })
    .then((res) => {
      if (res.data.success && res.data.data.length > 0) {
        const firstItem = res.data.data[0].data;
        columns.value = Object.keys(firstItem).map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1), // 将首字母大写作为表头
          key: key
        }));
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};

watch(
  () => props.selectedCollectionId,
  () => {
    prepareTableRecords();
    prepareColumns();
  }
);
</script>
