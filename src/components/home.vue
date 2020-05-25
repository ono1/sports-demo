<template>
  <div class="basic-container">
    <div class="banner-container">
      <img src="../assets/images/banner.jpeg" />
      <div class="banner-masker"></div>
      <div class="banner-detail">
        <div class="banner-title">Finland International Ski Resort</div>
        <div class="banner-sub_title">Give your professional chemistry know
work report results data collation</div>
        <div class="banner-btn">see details</div>
      </div>
    </div>
    <div class="hot-container">
      <div class="hot-item"
        v-for="(item, index) of 3"
        :key="index"
        @click="handleGo(item)">
        <div class="hot-image"><img src="../assets/images/product.png" /></div>
        <div class="hot-title">单板</div>
      </div>
    </div>
    <div class="tags-container">
      <div class="tag-item"
        v-for="item of 5"
        :key="item"
        @click="handleChangeType(item)">全部</div>
    </div>
    <div class="popular-container">
      <div class="popular-image">
        <img class="popular-big_image" src="../assets/images/1.png" />
        <img class="popular-small_image" src="../assets/images/1.png" />
      </div>
      <div class="popular-info">
        <div>人气单品</div>
        <div class="popular-title">HEAD2020</div>
        <div class="popular-detail">采用纯进口材料合成板,采用纯进口材料合成板采用纯进口材料合成板采用纯进口材料合成板采用纯进口材料合成板采用纯进口材料合成板采用纯进口材料合成板 </div>
        <div>板长</div>
        <div class="popular-panel">142/147/150/153/155/157/162加宽</div>
        <div class="popular-btn" @click="handleGo()">查看详情</div>
      </div>
    </div>
    <div class="product-container">
      <div class="product-item"
        v-for="item of 8"
        :key="item"
        @click="handleGo(item)">
        <img src="../assets/images/product.png" />
        <div class="product-title">2020年黑色滑雪板典藏款推荐</div>
        <div class="product-info">长度127cm/150cm/180cm</div>
        <div class="product-price">¥1425</div>
      </div>
    </div>
    <div class="pages-container">
      <div>共333件</div>
      <div class="more" @click="getProductList()">加载更多商品</div>
    </div>
    <div></div>
  </div>
</template>

<script>
// import Api from 'utils/api'

export default {
  data () {
    return {
    }
  },
  methods: {

    // 产品类型改变事件
    handleChangeType (item) {
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
    getProductList () {
    }
  },
  created () {}
}
</script>

<style scoped>
</style>
