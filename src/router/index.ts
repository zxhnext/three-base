import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  {
    path: '/basic/first-scene',
    name: 'FirstScene',
    component: () => import(/* webpackChunkName: "FirstScene" */ '../views/01-basic-scene/01-first-scene.vue'),
  },
  {
    path: '/basic/orbit-controls',
    name: 'OrbitControls',
    component: () => import(/* webpackChunkName: "FirstScene" */ '../views/01-basic-scene/02-orbit-controls.vue'),
  },
  {
    path: '/basic/animation',
    name: 'Animation',
    component: () => import(/* webpackChunkName: "FirstScene" */ '../views/01-basic-scene/03-animation.vue'),
  },
  {
    path: '/basic/gasp',
    name: 'Gasp',
    component: () => import(/* webpackChunkName: "FirstScene" */ '../views/01-basic-scene/04-gasp.vue'),
  },
  {
    path: '/basic/gui',
    name: 'Gui',
    component: () => import(/* webpackChunkName: "FirstScene" */ '../views/01-basic-scene/05-gui.vue'),
  },
  {
    path: '/basic/screen-size-change',
    name: 'screenSizeChange',
    component: () => import(/* webpackChunkName: "FirstScene" */ '../views/01-basic-scene/06-screen-size-change.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
