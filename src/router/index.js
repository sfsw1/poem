import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import PoemDetail from '../views/PoemDetail.vue'
import PoetryLibrary from '../views/PoetryLibrary.vue'
import PoetryCategories from '../views/PoetryCategories.vue'
import MyPage from '../views/MyPage.vue' // 稍后创建
import LoginRegister from '../views/LoginRegister.vue' // 稍后创建

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/poem/:id',
    name: 'PoemDetail',
    component: PoemDetail
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/poetry-library',
    name: 'PoetryLibrary',
    component: PoetryLibrary
  },
  {
    path: '/poetry-categories',
    name: 'PoetryCategories',
    component: PoetryCategories
  },
  {
    path: '/my',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/login-register',
    name: 'LoginRegister',
    component: LoginRegister
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router