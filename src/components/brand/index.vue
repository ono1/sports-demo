<template>
  <div>
    <div class="banner-container">
      <img :src="imgUrl" />
      <div class="banner-masker"></div>
    </div>
    <div class="basic-container brand-container">
      <div class="brand_title">{{detail.title}}</div>
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
      detail: {
        title: '',
        content: ''
      },
      imgUrl: ''
    }
  },
  methods: {
    init () {
      let params = {
        diyname: 'brand'
      }
      Api.contactUs(params)
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            this.detail = data
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
    this.init()
  }
}
</script>
