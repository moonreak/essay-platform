import { createRouter, createWebHistory } from 'vue-router'
import EssayEditor from '@/components/EssayEditor.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'editor',
      component: EssayEditor
    }
  ]
})

export default router


