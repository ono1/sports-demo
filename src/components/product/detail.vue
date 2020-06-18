<template>
  <div class="basic-container">
    <div class="product-detail_container">
      <div class="product-detail_img">
        <div style="max-width: 550px; max-height: 440px;">
          <el-carousel height="440px">
            <el-carousel-item
              v-for="(item, index) in detail.imagesList"
              :key="index">
            <!-- <el-image
              :src="item"
              fit="scale-down"></el-image> -->
              <img :src="item"  style="max-width: 550px;max-height: 440px;" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- <img :src="detail.image" /> -->
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
        <div class="product-detail_info" v-html="detail.brief"></div>
        <div class="product-detail_hint"></div>
        <div class="product-detail_btn" @click="handleGo">去购买</div>
      </div>
    </div>
    <div v-html="detail.content" class="product-content">
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
            let archivesInfo = Object.assign({}, data.archivesInfo)
            archivesInfo.imagesList = archivesInfo.productdata.split(',')
            this.detail = archivesInfo
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
