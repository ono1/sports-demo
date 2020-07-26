<template>
  <div class="basic-container">
    <div class="banner-container">
      <img :src="detail.image" />
      <div class="banner-masker"></div>
    </div>
    <div class="contact-container">
      <div class="contact-title">{{detail.title}}</div>
      <div v-html="detail.content"></div>
      <div class="contact-qrcode">
        <img :src="qrCode" />
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
      },
      qrCode: ''
    }
  },
  methods: {
    init () {
      let params = {
        diyname: 'contactus'
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

    // 联系我们
    getcontactInfo () {
      Api.getcontact()
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            this.qrCode = data.my_qrcode
          } else {
            this.$message.error(msg)
          }
        })
    }
  },
  created () {
    this.init()
    this.getcontactInfo()
  }
}
</script>
