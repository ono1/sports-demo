<template>
  <div class="basic-container" v-loading="loading">
    <div class="banner-container">
      <el-carousel height="550px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <el-image
            style="width: 100%; height: 100%;"
            :src="item.image"
            fit="fill"
            @click="handleJump(item)"></el-image>
          <!-- <img :src="item.image" style="height: 550px;" /> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <swiper class="swiper" :options="swiperOption" style="height: 400px;">
      <swiper-slide
        v-for="(item, index) of tabList"
        :key="index">
        <div @click="handleTabChange(item)"
          :class="{'tab-item': true, 'tab-item-selected': item.id === currentCategoryParentId}">
          <div class="hot-image">
            <el-image
              style="width: 100%; height: 100%;"
              src="http://test.head.huaxuezoo.com/uploads/20200601/90f7214b64120dfbcdb32738d41596e3.jpg"
              fit="contain"></el-image>
            <!-- <img src="../assets/images/product.png" /> -->
          </div>
          <div class="hot-title">{{item.title}}</div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
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
        :style="{color: item.id === currentCategorySubId ? '#409EFF' : ''}"
        v-for="item of subTabList"
        :key="item.id"
        @click="handleTabTwoChange(item)">{{item.title}}</div>
    </div>
    <div class="popular-container" v-if="archives">
      <div class="popular-image">
        <img class="popular-big_image" :src="archives.image" />
        <img class="popular-small_image" v-if="archives.channel && archives.channel.image" :src="'http://test.head.huaxuezoo.com' + archives.channel.image" />
      </div>
      <div class="popular-info">
        <div style="font-size: 22px;">人气单品</div>
        <div class="popular-title">{{archives.title}}</div>
        <div class="popular-detail">{{archives.brief}}</div>
        <div>{{archives.seotitle}}</div>
        <div class="popular-panel">{{archives.param}}</div>
        <div class="popular-btn" @click="handleGo(archives)">查看详情</div>
      </div>
    </div>
    <div class="product-container">
      <div class="product-item"
        v-for="item of productList"
        :key="item.id"
        @click="handleGo(item)">
        <div style="padding: 0px 20px 20px;">
          <div class="product-img">
            <el-image
            style="width: 100%; height: 100%;"
            :src="item.image"
            fit="contain"></el-image>
            <!-- <img :src="item.image" /> -->
          </div>
          <div class="product-title">{{item.title}}</div>
          <div class="product-info">{{item.param}}</div>
          <!-- <div class="product-price">¥{{item.price}}</div> -->
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
      archives: {}, // 人气单品列表
      page: 1,
      page_count: 0, // 总页数
      nums: 0, // 总个数
      productList: [],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
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
      if (this.currentCategorySubId) {
        params.channel = this.currentCategorySubId
      } else {
        params.channel = this.currentCategoryParentId
      }
      Api.list(params)
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
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
      this.currentCategoryParentId = item.id
      this.currentCategorySubId = ''
      if (item.children) {
        this.subTabList = item.children
      } else {
        this.subTabList = []
      }
      this.getList()
    },

    // 二级分类
    handleTabTwoChange (item) {
      this.currentCategorySubId = item.id
      this.getList()
    },

    // banner跳转
    handleJump (item) {
      this.$router.push({
        path: item.url
      })
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
.swiper {
  height: 400px;
  margin: 20px 0 0;
}
.swiper-pagination-bullet-active {
  background: #000;
}
.tab-item {
  border: 1px dashed #fff;
  position: relative;
}
.tab-item-selected {
  border-color: #000;
}

</style>
