import { createRouter, createWebHistory } from 'vue-router'
import MyProjects from '@/views/MyProjects.vue'
import Projects from '@/views/ProjectsList.vue'
import UsersList from '@/views/UsersList.vue'

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
      path: '/projects/:id',
      name: 'projects',
      component: Projects,
    },
  ],
})

export default router
