<template>
  <div class="basic-container">
    <div class="banner-container">
      <img src="../../assets/images/banner.jpeg" />
      <div class="banner-masker"></div>
    </div>
    <div class="article-detail-container">
      世界高山滑雪锦标赛是由国际滑雪联合会组织的一项世界性赛事，高山滑雪是以滑雪板和滑雪杖为工具在山坡专设的线路上快速回转、滑降的一种雪上竞赛项目。高山滑雪诞生于1907年，1924年被纳入国际滑雪联合会。1931年第一届高山滑雪锦标赛在瑞士米伦举行
    </div>
  </div>
</template>

<script>
import Api from '@/utils/api'

export default {
  data () {
    return {
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
            console.log('文章详情', data)
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
