<template>
    <n-flex justify="space-between" style="padding: 0.5rem">
        <n-space style="display: flex; align-items: center">
            <n-breadcrumb>
                <n-breadcrumb-item :clickable="false">Collection</n-breadcrumb-item>
                <n-breadcrumb-item :clickable="true">{{ props.selectedCollection }}</n-breadcrumb-item>
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
            <n-button color="black" @click="addRecordDrawerAction">New Record</n-button>
        </n-space>
    </n-flex>

    <n-input style="max-width: 80%; margin: 1rem auto" placeholder="search records.." />

    <n-data-table :columns="columns" :data="TableRecords" :row-key="rowKey" :pagination="pageNation" max-height="800" />

    <n-drawer v-model:show="addRecordDrawer" :width="600">
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
    </n-drawer>
</template>

<script setup lang="ts">

import { NButton, type DataTableColumn } from 'naive-ui'
import { SettingsOutline as XIconSettings, RocketSharp } from '@vicons/ionicons5';
const props = defineProps<{
    selectedCollection: string
}>()

const message = useMessage();
interface TableRecord {
    id: number;
    name: string;
    age: number;
    address: string;
};
const newRecord = ref<TableRecord>({
    id: 0,
    name: '',
    age: 0,
    address: ''
});
const handleSubmit = () => {
    console.log(newRecord.value);
    TableRecords.value.push({
        id: TableRecords.value.length + 1,
        name: newRecord.value.name,
        age: newRecord.value.age,
        address: newRecord.value.address
    });
    message.success('添加成功');
};
const pageNation = {
    pageSize: 10,
};
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

const deleteRecord = (id: number) => {
    TableRecords.value = TableRecords.value.filter((record) => record.id !== id);
};

const addRecordDrawerAction = () => {
    addRecordDrawer.value = true;
};
const addRecordDrawer = ref<boolean>(false);

</script>