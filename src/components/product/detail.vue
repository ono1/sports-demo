<template>
  <div class="basic-container">
    <div class="product-detail_container">
      <div class="product-detail_img">
        <img src="../../assets/images/2.png" />
      </div>
      <div class="flex1 product-detail_info_container">
        <div class="product-detail_title">2019款花色双拼滑雪单板</div>
        <div class="product-detail_size">长度127cm/150cm/180cm</div>
        <div class="product-detail_price">¥2538</div>
        <div class="product-detail_star">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
        <div class="product-detail_star_text">推荐指数3颗星</div>
        <div class="product-detail_info">2020年开启了不一样的新雪季，点击去购买即可跳转到淘宝商城，限量出售，非一般的体验等你来。DO THE BEST！</div>
        <div class="product-detail_hint">最新双板等你来，给你最好的滑雪体验</div>
        <div class="product-detail_btn">去购买</div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 3.7
    }
  },
  methods: {},
  created () {}
}
</script>
