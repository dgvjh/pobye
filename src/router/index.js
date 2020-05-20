import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Comments from '@/components/Comments'
import Login from '@/components/Login'
import Register from '@/components/Register'
import InfoDetail from '@/components/InfoDetail'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/comments',
      name: 'Comments',
      component: Comments
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/infoDetail',
      name: 'InfoDetail',
      component: InfoDetail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
