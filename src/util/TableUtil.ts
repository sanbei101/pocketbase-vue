export const collectionFieldOptions = [
  { label: 'Text', key: 'text' },
  { label: 'Number', key: 'number' },
  { label: 'Bool', key: 'bool' }
];
// 1. 类型定义
export type CollectionField = {
  field_name: string;
  field_type: string;
};

export type NewCollection = {
  name: string;
  fields: CollectionField[];
};

export type MenuCollection = {
  id: string;
  name: string;
};
export type selectedCollection = {
  selectedCollectionName: string;
  selectedCollectionId: string;
};
export type DataType = {
  [key: string]: unknown;
};
export type RecordType = DataType & {
  id: string;
};
export type ItemType = {
  id: string;
  data: DataType;
};
export type NewRecord = Record<string, string>;

export const pagination = {
  pageSize: 10
};
