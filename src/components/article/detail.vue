<template>
  <div class="basic-container">
    <div class="banner-container">
      <img src="../../assets/images/banner.jpeg" />
      <div class="banner-masker"></div>
    </div>
    <div class="article-detail-container" v-html="detail.content">
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
