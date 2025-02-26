import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import LoginView from '@/views/LoginView.vue'
import register from '@/components/register.vue'
import AboutView from '@/views/AboutView.vue'
import ProductDetails from '../components/ProductDetails.vue'
import CartView from '../views/CartView.vue'
import CheckOutView from '@/views/CheckOutView.vue'
import payment from '@/components/payment.vue'

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
    component: register
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
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
  },
  {
    path: "/product/:id",
    name: "ProductDetails",
    component: ProductDetails,
    props: (route) => ({
      product: JSON.parse(route.query.product),
    }),
  },
  {
    path: "/payment",
    name: "payment",
    component: payment
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
