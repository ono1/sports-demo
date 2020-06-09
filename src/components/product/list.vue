<template>
  <div class="basic-container">
    <div class="product-container">
      <div class="product-item"
        v-for="item of productList"
        :key="item.id"
        @click="handleGo(item)">
        <img :src="item.image" />
        <div class="product-title">{{item.title}}</div>
        <div class="product-info">{{item.param}}</div>
        <div class="product-price">¥{{item.price}}</div>
      </div>
    </div>
    <div class="pages-container">
      <div>共{{nums}}件</div>
      <div class="more" @click="handleMore()" v-show="page < page_count">加载更多商品</div>
    </div>
  </div>
</template>

<script>
import Api from '@/utils/api'

export default {
  data () {
    return {
      productList: [],
      page: 1, // 当前页
      page_count: 0, // 总页数
      nums: 0 // 总个数
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
            this.page_count = data.page_count // 总页数
            this.nums = data.nums // 总个数
          } else {
            this.$message.error(msg)
          }
        })
    },

    // 跳转到产品详情
    handleGo (item) {
      this.$router.push({
        path: '/product/detail',
        query: {
          id: item.id
        }
      })
    },

    // 加载更多
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
