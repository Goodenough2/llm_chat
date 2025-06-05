import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ChatView from '@/views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/chat', // 精确匹配默认聊天页面（无对话时）
      name: 'chatHome', // 命名为 chatHome 避免与动态路由重名
      component: ChatView,
      meta: { exact: true }
    },
    {
      path: '/chat/:conversationId', // 动态匹配具体会话（有对话时）
      name: 'chatDetail', // 命名为 chatDetail 区分场景
      component: ChatView,
      props: true // 自动将 conversationId 转为组件 props
    }
  ],
})

export default router
