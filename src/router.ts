import { createRouter, createWebHistory } from 'vue-router';
const CollectionPage = () => import('@/collections/CollectionPage.vue');
const routes = [
  {
    path: '/',
    name: 'collections',
    component: CollectionPage
  },
  {
    path: '/collection/:collectionName',
    name: 'collection',
    component: CollectionPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
