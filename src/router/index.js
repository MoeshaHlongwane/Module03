import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/login',
    name:'login',
    component: LoginView
  },
  {
    path:'/register',
    name:'register',
    component: RegisterView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckOutView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
