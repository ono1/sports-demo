<template>
  <div class="basic-container">
    <div class="banner-container">
      <img :src="detail.image" />
      <div class="banner-masker"></div>
    </div>
    <div class="brand-container">
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
        content: '',
        image: ''
      }
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
    }
  },
  created () {
    this.init()
  }
}
</script>
