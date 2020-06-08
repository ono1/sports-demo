<template>
  <div class="basic-container">
    <div class="product-container">
      <div class="product-item"
        v-for="item of productList"
        :key="item.id"
        @click="handleGo(item)">
        <img :src="item.image" />
        <div class="product-title">{{item.title}}</div>
        <div class="product-info">{{item.keywords}}</div>
        <div class="product-price">¥1425</div>
      </div>
    </div>
    <div class="pages-container">
      <div>共333件</div>
      <div class="more" @click="handleMore()">加载更多商品</div>
    </div>
  </div>
</template>

<script>
import Api from '@/utils/api'

export default {
  data () {
    return {
      productList: []
    }
  },
  methods: {
    // 产品列表
    getList () {
      let params = {
        model: 2,
        page: this.page
      }
      Api.list(params)
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            if (this.productList.length > 0) {
              this.productList = [...this.productList, ...data.archivesList]
            } else {
              this.productList = data.archivesList
            }
          } else {
            this.$message.error(msg)
          }
        })
    },
    handleMore () {
      this.page++
      this.getList()
    }
  },
  created () {
    this.getList()
  }
}
</script>
