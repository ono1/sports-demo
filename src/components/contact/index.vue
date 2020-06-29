<template>
  <div class="basic-container">
    <div class="banner-container">
      <img :src="imgUrl" />
      <div class="banner-masker"></div>
    </div>
    <div class="contact-container">
      <div class="contact-title">{{detail.title}}</div>
      <div v-html="detail.content"></div>
      <!-- <div class="contact-item">
        <div class="sub_title">地址</div>
        <div class="sub_text">北京市海淀区某某大厦15-1591室</div>
      </div>
      <div class="contact-item">
        <div class="sub_title">电话</div>
        <div class="sub_text">010-2345333</div>
      </div>
      <div class="contact-item">
        <div class="sub_title">传真</div>
        <div class="sub_text">020-113556</div>
      </div>
      <div class="contact-item">
        <div class="sub_title">邮箱</div>
        <div class="sub_text">848671515@163.com</div>
      </div>
      <div class="contact-item">
        <div class="sub_title">手机</div>
        <div class="sub_text">13243178033</div>
      </div> -->
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
