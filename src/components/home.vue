<template>
  <div class="basic-container" v-loading="loading">
    <div class="banner-container">
      <el-carousel>
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.image" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="hot-container">
      <div class="hot-item"
        :style="{'border-color' : item.id === currentCategoryParentId ? '#409EFF' : ''}"
        v-for="(item, index) of tabList"
        :key="index"
        @click="handleTabChange(item)">
        <div class="hot-image"><img src="../assets/images/product.png" /></div>
        <div class="hot-title">{{item.title}}</div>
      </div>
    </div>
    <div class="tags-container">
      <div
        class="tag-item"
        :style="{color: currentCategorySubId === '' ? '#409EFF' : ''}"
        @click="handleTabChange({id: ''})">全部</div>
      <div class="tag-item"
        :style="{color: item.id === currentCategorySubId ? '#409EFF' : ''}"
        v-for="item of subTabList"
        :key="item.id"
        @click="handleTabChange(item)">{{item.title}}</div>
    </div>
    <div class="popular-container" v-if="archives">
      <div class="popular-image">
        <img class="popular-big_image" :src="archives.image" />
        <img class="popular-small_image" v-if="archives.channel && archives.channel.image" :src="'http://test.head.huaxuezoo.com' + archives.channel.image" />
      </div>
      <div class="popular-info">
        <div>人气单品</div>
        <div class="popular-title">{{archives.title}}</div>
        <div class="popular-detail">{{archives.description}}</div>
        <div>板长</div>
        <div class="popular-panel">{{archives.keywords}}</div>
        <div class="popular-btn" @click="handleGo()">查看详情</div>
      </div>
    </div>
    <div class="product-container">
      <div class="product-item"
        v-for="item of productList"
        :key="item.id"
        @click="handleGo(item)">
        <img :src="item.image" />
        <div class="product-title">{{item.title}}</div>
        <div class="product-info">{{item.keywords}}</div>
        <div class="product-price">¥1425</div>
      </div>
    </div>
    <div class="pages-container">
      <div>共333件</div>
      <div class="more" @click="handleGoList">加载更多商品</div>
    </div>
    <div></div>
  </div>
</template>

<script>
import Api from '@/utils/api'

export default {
  data () {
    return {
      loading: false,
      bannerList: [], // 焦点图列表
      tabList: [], // 一级分类列表
      tabListObj: {}, // 一级分类列表 object
      currentCategoryParentId: '', // 当前选中一级分类ID
      subTabList: [], // 二级分类列表
      currentCategorySubId: '', // 当前选中二级分类ID
      archives: {}, // 人气单品列表
      page: 1,
      productList: []
    }
  },
  methods: {

    // 初始化方法
    init () {
      this.getBannerList() // 焦点图
      this.getTabList() // 分类列表
      this.getRecommendList() // 推荐产品
      this.getList() // 产品列表
    },

    // 获取banner列表
    getBannerList () {
      Api.bannerList()
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            this.bannerList = data.bannerList
          } else {
            this.$message.error(msg)
          }
        })
    },

    // 获取tab列表
    getTabList () {
      Api.tabList()
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            let obj = {}
            data.tabList.forEach(element => {
              obj[element.id] = element
            })
            this.tabListObj = obj
            this.tabList = data.tabList
          } else {
            this.$message.error(msg)
          }
        })
    },

    // 人气单品
    getRecommendList () {
      let params = {
        model: 2 // 1: 新闻 2: 产品
      }
      Api.recommendList(params)
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            this.archives = data.archivesList[0]
          } else {
            this.$message.error(msg)
          }
        })
    },

    // 产品列表
    getList () {
      let params = {
        model: 2,
        page: this.page
      }
      Api.list(params)
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            this.productList = data.archivesList
            console.log('产品列表', data)
          } else {
            this.$message.error(msg)
          }
        })
    },

    // 产品类型改变事件
    handleChangeType (item) {
    },

    // 一级分类切换事件
    handleTabChange (item) {
      if (item.parent_id === 0) {
        this.currentCategoryParentId = item.id
        this.currentCategorySubId = ''
        if (item.children) {
          this.subTabList = item.children
        } else {
          this.subTabList = []
        }
      } else {
        this.currentCategorySubId = item.id
      }
    },

    // 跳转到产品详情
    handleGo (item) {
      this.$router.push({
        path: '/product/detail',
        query: {
          id: item
        }
      })
    },

    // 获取产品列表
    handleGoList () {
      this.$router.push({
        path: '/product/list'
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
</style>
