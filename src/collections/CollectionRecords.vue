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
      <n-button type="primary" @click="showAddRecordDrawer = true">New Record</n-button>
    </n-space>
  </n-flex>

  <n-input style="max-width: 80%; margin: 1rem auto" placeholder="search records.." />

  <n-data-table :columns="columns" :data="records" :row-key="rowKey" :pagination="pagination" max-height="800" />

  <n-drawer v-model:show="showAddRecordDrawer" :width="600">
    <n-drawer-content>
      <h3>添加新记录</h3>
      <n-form @submit.prevent="handleSubmit">
        <n-space vertical>
          <n-form-item v-for="(_, key) in newRecord" :key="key" :label="key">
            <n-input v-model:value="newRecord[key]" :placeholder="'输入' + key" />
          </n-form-item>
        </n-space>
        <n-space>
          <n-button type="primary" @click="handleSubmit">添加</n-button>
          <n-button @click="showAddRecordDrawer = false">取消</n-button>
        </n-space>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { DataTableColumn } from 'naive-ui';
import { SettingsOutline as XIconSettings, RocketSharp } from '@vicons/ionicons5';
import AxiosInstance from '@/util/axios';
import { type RecordType, type ItemType, type NewRecord, pagination } from '@/util/TableUtil';
const message = useMessage();
const props = defineProps<{
  selectedCollectionName: string;
  selectedCollectionId: string;
}>();

// 新记录的响应式数据
const newRecord = ref<NewRecord>({});
const columns = ref<DataTableColumn[]>([]);

const showAddRecordDrawer = ref<boolean>(false);
const rowKey = (record: RecordType) => record.id;

const newRecordField = () => {
  newRecord.value = columns.value.reduce((acc, column) => {
    // 确保 column 存在 key 属性后才处理
    if ('key' in column && column.key) {
      acc[column.key] = ''; // 默认值为空字符串，或根据需要设置
    }
    return acc;
  }, {} as NewRecord);
};
// 当 columns 变化时，动态初始化 newRecord
watchEffect(() => {
  newRecordField();
});

const handleSubmit = async () => {
  // 1. 提交数据
  try {
    await AxiosInstance.post('/record/add-record', {
      collection_id: props.selectedCollectionId,
      data: newRecord.value
    });
    newRecordField();
    prepareTableRecords();
    showAddRecordDrawer.value = false;
    message.success('添加数据成功!');
  } catch (error) {
    console.error('Error adding record:', error);
    message.error('添加数据时发生错误');
  }
};

const records = ref<RecordType[]>([]);

// 生成 records 的函数
const prepareTableRecords = async () => {
  try {
    const res = await AxiosInstance.get('/record/get-record', {
      params: {
        collection_id: props.selectedCollectionId
      }
    });
    records.value = [];
    records.value = res.data.data.map((item: ItemType) => ({
      id: item.id,
      ...item.data
    }));
    message.success('成功获取记录');
    console.log('Fetched records:', records.value);
  } catch (error) {
    message.error('获取记录失败');
    console.error('Error fetching records:', error);
  }
};

// 生成动态 columns 的函数
const prepareColumns = async () => {
  try {
    const res = await AxiosInstance.get('/collection/collection-field', {
      params: {
        collection_id: props.selectedCollectionId
      }
    });
    columns.value = res.data.data.map((field: { field_name: string }) => ({
      title: field.field_name.toUpperCase(),
      key: field.field_name
    }));
    message.success('成功获取字段');
    console.log('Fetched columns:', columns.value);
  } catch (error) {
    message.error('获取字段失败');
    console.error('Error fetching columns:', error);
  }
};

watch(
  () => props.selectedCollectionId,
  async () => {
    await prepareColumns();
    await prepareTableRecords();
  }
);
</script>
