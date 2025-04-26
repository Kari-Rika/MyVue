import { createRouter, createWebHistory } from 'vue-router'

import main from '@/views/Main.vue'
import Login from '@/views/login/index.vue'
import Kzt from '@/components/Kzt.vue'
import Admin from '@/views/auth/Admin.vue'
import Group from '@/views/auth/Group.vue'
import User from '@/views/dio/User.vue'
import Order from '@/views/dio/Order.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: main,
      children: [
        {
          path: 'kzt',
          meta: { id: 1, name: '控制台', icon: 'Platform', path: '/kzt', describe: '用于展示系统的基本信息' },
          component: Kzt,
        },
        {
          path: 'auth',
          meta: { id: 2, name: '权限管理', icon: 'Grid' },
          children: [
            {
              path: 'admin',
              meta: { id: 1, name: '管理员', icon: 'Avatar', path: '/auth/admin', describe: '用于展示系统的基本信息' },
              component: Admin,
            },
            {
              path: 'group',
              meta: { id: 2, name: '菜单管理', icon: 'Menu', path: '/auth/group', describe: '用于展示系统的基本信息' },
              component: Group,
            },
          ]
        },
        {
          path: 'Dio',
          meta: { id: 3, name: '记录', icon: 'Discount' },
          children: [
            {
              path: 'user',
              meta: { id: 1, name: '陪护管理', icon: 'User', path: '/Dio/user', describe: '用于展示陪护人员信息' },
              component: User,
            },
            {
              path: 'order',
              meta: { id: 2, name: '订单管理', icon: 'Tickets', path: '/Dio/order', describe: '用于展示订单信息' },
              component: Order,
            },
          ]
        },
      ]

    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }]
})

export default router
