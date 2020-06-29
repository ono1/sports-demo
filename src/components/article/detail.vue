<template>
  <div class="basic-container">
    <div class="banner-container">
      <img :src="imgUrl" />
      <div class="banner-masker"></div>
    </div>
    <div class="article-title">{{detail.title}}</div>
    <div class="article_author">作者: {{detail.author}}</div>
    <div class="article-detail-container" v-html="detail.content">
    </div>
  </div>
</template>

<script>
import Api from '@/utils/api'

export default {
  data () {
    return {
      detail: {},
      imgUrl: ''
    }
  },
  methods: {
    getDetail () {
      let params = {
        id: this.$route.query.id
      }
      Api.productDetail(params)
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            this.detail = data.archivesInfo
          } else {
            this.$message.error(msg)
          }
        })
    },
    // 获取banner列表
    getBannerList () {
      Api.bannerList()
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            if (data.bannerList && data.bannerList.length > 0) {
              this.imgUrl = data.bannerList[0]['image']
            }
          } else {
            this.$message.error(msg)
          }
        })
    }
  },
  created () {
    this.getBannerList()
    this.getDetail()
  }
}
</script>

<style scoped>
.article-title {
  text-align: center;
  margin: 50px 0 10px;
  font-weight: 500;
  font-size: 20px;
}
</style>
