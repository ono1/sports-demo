import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home' // 首页
import ArticleList from '@/components/article/list' // 文章列表
import ArticleDetail from '@/components/article/detail' // 文章详情
import ProductList from '@/components/product/list' // 产品列表
import ProductDetail from '@/components/product/detail' // 产品详情
import Brand from '@/components/brand/index' // 品牌故事
import Contact from '@/components/contact/index' // 联系我们
import Layout from '@/components/index'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Home',
        component: Home
      },
      {
        path: '/article/list',
        name: 'articleList',
        component: ArticleList
      },
      {
        path: '/article/detail',
        name: 'articleDetail',
        component: ArticleDetail
      },
      {
        path: '/product/list',
        name: 'ProductList',
        component: ProductList
      },
      {
        path: '/product/detail',
        name: 'ProductDetail',
        component: ProductDetail
      },
      {
        path: '/brand',
        name: 'brand',
        component: Brand
      },
      {
        path: '/contact',
        name: 'Contact',
        component: Contact
      }
    ]
  }]
})
