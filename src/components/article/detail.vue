<template>
  <div class="basic-container">
    <div class="banner-container">
      <img :src="detail.image" />
      <div class="banner-masker"></div>
    </div>
    <div class="brand-container">
      <div class="brand_title">{{detail.title}}</div>
      <div class="article_author">作者: {{detail.author}}</div>
      <div class="brand_info" v-html="detail.content">
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/utils/api'

export default {
  data () {
    return {
      detail: {}
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
    }
  },
  created () {
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
