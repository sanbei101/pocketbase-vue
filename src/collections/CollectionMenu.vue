<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem">
    <n-input placeholder="search collections.." style="margin: 1rem auto; max-width: 85%" />

    <n-divider />

    <div v-for="collection in menuCollections" :key="collection.id">
      <n-button strong secondary type="tertiary" style="min-width: 80%" @click="handleSelectCollection(collection.name, collection.id)">
        <template #icon>
          <n-icon>
            <Cash />
          </n-icon>
        </template>
        {{ collection.name }}
      </n-button>
    </div>

    <n-divider />
    <n-button @click="showAddCollectionDrawer = true">
      <template #icon>
        <n-icon>
          <AddCircleOutline />
        </n-icon>
      </template>
      Add Collection
    </n-button>

    <n-drawer v-model:show="showAddCollectionDrawer" :width="600">
      <n-drawer-content title="Add Collection">
        <n-form @submit.prevent="submitAddCollection">
          <n-input v-model:value="newCollection.name" placeholder="Collection Name" size="large" />
          <n-divider />
          <div v-for="(field, index) in collectionFields" :key="index" style="margin-top: 1rem">
            <n-input v-model:value="field.field_name" :placeholder="field.field_type" />
          </div>
        </n-form>

        <!-- 渲染动态添加的输入框 -->
        <div style="display: flex; justify-content: center; margin-top: 20%">
          <n-dropdown :options="collectionFieldOptions" trigger="click" @select="addField">
            <n-button size="large">Add Field</n-button>
          </n-dropdown>
        </div>

        <n-divider />

        <div style="display: flex; justify-content: end; gap: 1rem">
          <n-button @click="showAddCollectionDrawer = false"> Cancel </n-button>
          <n-button @click="submitAddCollection"> Submit </n-button>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import AxiosInstance from '@/util/axios';
import { Cash, AddCircleOutline } from '@vicons/ionicons5';
const message = useMessage();

// 1. 类型定义
type CollectionField = {
  field_name: string;
  field_type: string;
};

type NewCollection = {
  name: string;
  fields: CollectionField[];
};

type MenuCollection = NewCollection & {
  id: string;
};

// 2. 响应式变量定义
const collectionFields = ref<CollectionField[]>([]);
const newCollection = ref<NewCollection>({
  name: '',
  fields: collectionFields.value
});

const menuCollections = ref<MenuCollection[]>([]);
const showAddCollectionDrawer = ref<boolean>(false);
type selectedCollection = {
  selectedCollectionName: string;
  selectedCollectionId: string;
};
const selectedCollection = ref<selectedCollection>({
  selectedCollectionName: '',
  selectedCollectionId: ''
});

const emitSelectedCollection = defineEmits<{
  (event: 'selectedCollection', selectedCollectionName: string, selectedCollectionId: string): void;
}>();

const handleSelectCollection = (collectionName: string, collectionId: string) => {
  console.log('Selected Collection:', collectionName, collectionId);
  selectedCollection.value.selectedCollectionName = collectionName;
  selectedCollection.value.selectedCollectionId = collectionId;
  emitSelectedCollection('selectedCollection', collectionName, collectionId);
};
// 3. 组件加载时初始化集合数据
onMounted(async () => {
  await loadCollections(); // 等待 loadCollections 执行完成
  if (menuCollections.value.length > 0) {
    handleSelectCollection(menuCollections.value[0].name, menuCollections.value[0].id);
  } else {
    message.error('menuCollections is empty');
  }
});

// 加载集合数据的函数
const loadCollections = async () => {
  try {
    const res = await AxiosInstance.get('/collection/all-collection');
    menuCollections.value = res.data.data;
    console.log('Loaded Collections:', menuCollections.value);
    message.info('Init Get Collections Success');
  } catch (err) {
    console.error('Error loading collections:', err);
    message.error('Init Get Collections Failed');
  }
};

// 4. 字段选项定义
const collectionFieldOptions = [
  { label: 'Text', key: 'text' },
  { label: 'Number', key: 'number' },
  { label: 'Bool', key: 'bool' }
];

// 5. 添加字段函数
const addField = (key: string) => {
  const fieldType = key;
  collectionFields.value.push({ field_name: '', field_type: fieldType });
};

// 6. 提交新集合函数
const submitAddCollection = async () => {
  try {
    const res = await AxiosInstance.post('/collection/add-collection', newCollection.value);
    menuCollections.value.push(res.data.data);
    showAddCollectionDrawer.value = false;
    message.info('Add Collection Success');
    console.log('New Collection Added:', res.data.data);
  } catch (err) {
    console.error('Error adding collection:', err);
    message.error('Add Collection Failed');
  }
};
</script>
