<template>
  <div class="basic-container" v-loading="loading">
    <div class="banner-container">
      <el-carousel height="550px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.image" @click="handleJump(item)" style="width: 100%; height: 100%;" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <swiper class="swiper" :options="swiperOption" style="height: 480px;" v-if="tabList.length > 0">
      <swiper-slide
        v-for="(item, index) of tabList"
        :key="index">
        <div @click="handleTabChange(item)"
          :class="{'tab-item': true, 'tab-item-selected': item.id === currentCategoryParentId}">
          <img :src="item.image" class="hot-image" />
          <div class="hot-title">{{item.title}}</div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-show="tabList.length > 3"></div>
    </swiper>
    <div class="tags-container">
      <div
        class="tag-item"
        @click="handleTabTwoChange({id: ''})">
        <span>全部</span>
        <i
          :style="{background: currentCategorySubId === '' ? '#333333' : '#ffffff'}"></i>
      </div>
      <div class="tag-item"
        v-for="item of subTabList"
        :key="item.id"
        @click="handleTabTwoChange(item)">
        <span>{{item.title}}</span>
        <i
          :style="{background: currentCategorySubId === item.id ? '#333333' : '#ffffff'}"></i>
      </div>
    </div>
    <template
      v-if="archivesList.length > 0">
      <div
        class="popular-container"
        v-for="(item, index) of archivesList"
        :key="index">
        <div class="popular-image">
          <img
            class="popular-big_image"
            :src="item.image" />
          <img class="popular-small_image"
            v-if="item.productdata && item.productdata" :src="item.productdata" />
        </div>
        <div class="popular-info">
          <div style="font-size: 22px;">人气单品</div>
          <div class="popular-title">{{item.title}}</div>
          <div class="popular-detail">{{item.brief}}</div>
          <div>{{item.seotitle}}</div>
          <div class="popular-panel">{{item.param}}</div>
          <div class="popular-btn" @click="handleGo(item)">查看详情</div>
        </div>
      </div>
    </template>
    <div class="product-container">
      <div class="product-item"
        v-for="item of productList"
        :key="item.id"
        @click="handleGo(item)">
        <div>
          <div class="product-img">
            <img :src="item.image" />
          </div>
          <div class="product-title">{{item.title}}</div>
          <div class="product-info">{{item.param}}</div>
        </div>
      </div>
    </div>
    <div class="pages-container">
      <div>共{{nums}}件</div>
      <div class="more" @click="handleGoList">加载更多商品</div>
    </div>
    <div></div>
  </div>
</template>

<script>
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
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
      page: 1,
      page_count: 0, // 总页数
      nums: 0, // 总个数
      productList: [],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 60,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      archivesList: [] // 人气单品
    }
  },
  methods: {

    // 初始化方法
    init () {
      this.getBannerList() // 焦点图
      this.getTabList() // 分类列表
      this.getList() // 产品列表
      this.getRecommendList() // 人气单品
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
      let params = {
        model: 2
      }
      Api.tabList(params)
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
      if (this.currentCategorySubId) {
        params.channel = this.currentCategorySubId
      } else {
        params.channel = this.currentCategoryParentId
      }
      Api.recommendList(params)
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            this.archivesList = data.archivesList
          } else {
            this.$message.error(msg)
          }
        })
    },

    // 产品列表
    getList () {
      let params = {
        model: 2,
        page: this.page,
        size: 8
      }
      if (this.currentCategorySubId) {
        params.channel = this.currentCategorySubId
      } else {
        params.channel = this.currentCategoryParentId
      }
      Api.list(params)
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            if (data.archivesList.length > 0) {
              for (let item of data.archivesList) {
                if (item.title.length > 15) {
                  item.title = (item.title.substr(0, 15) + '...')
                }
              }
            }
            this.productList = data.archivesList // 列表
            this.page_count = data.page_count // 总页数
            this.nums = data.nums // 总个数
          } else {
            this.$message.error(msg)
          }
        })
    },

    // 一级分类切换事件
    handleTabChange (item) {
      this.currentCategorySubId = ''
      if (item.id === this.currentCategoryParentId) {
        this.currentCategoryParentId = ''
      } else {
        this.currentCategoryParentId = item.id
        if (item.children) {
          this.subTabList = item.children
        } else {
          this.subTabList = []
        }
      }
      this.getList()
      this.getRecommendList()
    },

    // 二级分类
    handleTabTwoChange (item) {
      this.currentCategorySubId = item.id
      this.getList()
      this.getRecommendList()
    },

    // banner跳转
    handleJump (item) {
      if (item.url.indexOf('http') > -1) {
        window.open(item.url, '_blank')
      } else {
        this.$router.push({
          path: item.url
        })
      }
    },

    // 跳转到产品详情
    handleGo (item) {
      this.$router.push({
        path: '/product/detail',
        query: {
          id: item.id
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

<style>

</style>
