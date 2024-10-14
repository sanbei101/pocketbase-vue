<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem">
    <n-input placeholder="search collections.." style="margin: 1rem auto; max-width: 85%" />

    <n-divider />

    <div v-for="collection in MenuCollections" :key="collection.id">
      <n-button strong secondary type="tertiary" style="min-width: 80%" @click="SelectCollection = collection.name">
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
          <div v-for="(field, index) in CollectionFileds" :key="index" style="margin-top: 1rem">
            <n-input v-model:value="field.field_name" :placeholder="field.field_type" />
          </div>
        </n-form>

        <!-- 渲染动态添加的输入框 -->
        <div style="display: flex; justify-content: center; margin-top: 20%">
          <n-dropdown :options="CollectionFiledOptions" trigger="click" @select="addField">
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
// 定义类型
type collectionFields = {
  field_name: string;
  field_type: string;
}[];

type newCollection = {
  name: string;
  fields: collectionFields;
};
type MenuCollection = newCollection & {
  id: string;
};

// 定义响应式变量
const CollectionFileds = ref<collectionFields>([]);
const newCollection = ref<newCollection>({
  name: '',
  fields: CollectionFileds.value
});
const showAddCollectionDrawer = ref<boolean>(false);

const MenuCollections = ref<MenuCollection[]>([]);

const SelectCollection = defineModel<string>('SelectCollection');
onMounted(() => {
  AxiosInstance.get('/collection')
    .then((res) => {
      MenuCollections.value = res.data.data;
      console.log(MenuCollections.value);
      message.info('init Get Collections Success');
    })
    .catch((err) => {
      console.log(err);
      message.error('init Get Collections Failed');
    });
});
// 定义字段选项
const CollectionFiledOptions = [
  {
    label: 'Text',
    key: 'text'
  },
  {
    label: 'Number',
    key: 'number'
  },
  {
    label: 'Bool',
    key: 'bool'
  }
];

// 添加字段函数
const addField = (key: string) => {
  const field_type = key;
  CollectionFileds.value.push({ field_name: '', field_type });
};

// 提交新集合函数
const submitAddCollection = () => {
  console.log(newCollection.value);
  AxiosInstance.post('/collection', newCollection.value)
    .then((res) => {
      console.log(res);
      MenuCollections.value.push(res.data.data);
      showAddCollectionDrawer.value = false;
      message.info('Add Collection Success');
    })
    .catch((err) => {
      console.log(err);
      message.error('Add Collection Failed');
    });
};
</script>
