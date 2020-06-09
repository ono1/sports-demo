<template>
  <div class="basic-container">
    <div class="product-detail_container">
      <div class="product-detail_img">
        <img src="../../assets/images/2.png" />
      </div>
      <div class="flex1 product-detail_info_container">
        <div class="product-detail_title">{{detail.title}}</div>
        <div class="product-detail_size">{{detail.param}}</div>
        <div class="product-detail_price">¥{{detail.price}}</div>
        <div class="product-detail_star">
          <el-rate
            v-model="detail.rmd_rank"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
        <div class="product-detail_star_text">推荐指数{{detail.rmd_rank}}颗星</div>
        <div class="product-detail_info" v-html="detail.content"></div>
        <div class="product-detail_hint">{{detail.brief}}</div>
        <div class="product-detail_btn" @click="handleGo">去购买</div>
      </div>
    </div>
    <div></div>
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
    },
    handleGo () {
      window.open(this.detail.go_buy)
    }
  },
  created () {
    this.getDetail()
  }
}
</script>
