<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem">
    <n-input placeholder="search collections.." style="margin: 1rem auto; max-width: 85%" />

    <n-divider />

    <div v-for="collection in props.collections" :key="collection">
      <n-button strong secondary type="tertiary" style="min-width: 80%" @click="selectCollection(collection)">
        <template #icon>
          <n-icon>
            <Cash />
          </n-icon>
        </template>
        {{ collection }}
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
            <n-input v-model:value="field.filed_name" :placeholder="field.filed_type" />
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

const props = defineProps<{
  collections: string[];
}>();
const emit = defineEmits(['select']);

type collectionFields = {
  filed_name: string;
  filed_type: string;
}[];

const CollectionFileds = ref<collectionFields>([]);

type newCollection = {
  name: string;
  fields: collectionFields;
};

const newCollection = ref<newCollection>({
  name: '',
  fields: CollectionFileds.value
});

const showAddCollectionDrawer = ref<boolean>(false);

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

const selectCollection = (collection: string) => {
  emit('select', collection);
};

const submitAddCollection = () => {
  console.log(newCollection.value);
  AxiosInstance.post('/collection', newCollection.value)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addField = (key: string) => {
  const filed_type = key;
  CollectionFileds.value.push({ filed_type, filed_name: '' });
};
</script>
