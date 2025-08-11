import { createRouter, createWebHistory } from 'vue-router'
import MyProjects from '@/views/MyProjects.vue'
import Projects from '@/views/ProjectsList.vue'
import UsersList from '@/views/UsersList.vue'
import PageTest from '@/views/PageTest.vue'
import SettingProfile from '@/views/SettingProfile.vue'
import PyramidManagement from '@/views/PyramidManagement.vue'
import CreatingDepartment from '@/views/CreatingDepartment.vue'

import PyramidTree from '@/views/PyramidTree.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MyProjects',
      component: MyProjects,
    },
    {
      path: '/MyTasks',
      name: 'MyTasks',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MyTasks.vue'),
    },
    {
      path: '/UsersList',
      name: 'UsersList',
      component: UsersList,
    },
    {
      path: '/PageTest',
      name: 'PageTest',
      component: PageTest,
    },
    {
      path: '/SettingProfile',
      name: 'SettingProfile',
      component: SettingProfile,
    },
    {
      path: '/PyramidManagement',
      name: 'PyramidManagement',
      component: PyramidManagement,
    },
    {
      path: '/PyramidTree',
      name: 'PyramidTree',
      component: PyramidTree,
    },
    {
      path: '/CreatingDepartment',
      name: 'CreatingDepartment',
      component: CreatingDepartment,
    },
    {
      path: '/projects/:id',
      name: 'projects',
      component: Projects,
    },
  ],
})

export default router
