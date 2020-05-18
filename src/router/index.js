import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home' // 首页
import ArticleIndex from '@/components/article/index' // 文章页
import ArticleList from '@/components/article/list' // 文章列表
import ArticleDetail from '@/components/article/detail' // 文章详情
import ProductDetail from '@/components/product/detail' // 产品详情
import Contact from '@/components/contact/index' // 联系我们

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/article/index',
      name: 'ArticleIndex',
      component: ArticleIndex
    },
    {
      path: '/article/list',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/article/detail',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    {
      path: '/product/detail',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
