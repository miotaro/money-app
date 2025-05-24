import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'
import HomeView from '@/views/HomeView.vue'
import RecordView from '@/views/RecordView.vue'
import SummaryView from '@/views/SummaryView.vue'
import Login from '@/views/Login.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/record', name: 'Record', component: RecordView, meta: { requiresAuth: true } },
  { path: '/summary', name: 'Summary', component: SummaryView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = auth.currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !user) {
    next('/login')
  } else {
    next()
  }
})

export default router
