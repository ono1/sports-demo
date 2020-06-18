<template>
  <div class="product-wrapper">
    <div class="product-container">
      <div class="product-item"
        v-for="item of productList"
        :key="item.id"
        @click="handleGo(item)">
        <div style="padding: 20px;">
          <div class="product-img">
            <el-image
            style="width: 100%; height: 100%;"
            :src="item.image"
            fit="scale-down"></el-image>
          </div>
          <div class="product-title">{{item.title}}</div>
          <div class="product-info">{{item.param}}</div>
          <div class="product-price">¥{{item.price}}</div>
        </div>
      </div>
    </div>
    <div class="pages-container">
      <el-pagination
        background
        @current-change="getList"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="nums">
      </el-pagination>
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
      nums: 0, // 总个数
      pageSize: 16
    }
  },
  methods: {
    // 产品列表
    getList () {
      let params = {
        model: 2,
        page: this.page,
        channel: this.$route.query.id || ''
      }
      Api.list(params)
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            this.productList = data.archivesList || []
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
    console.log('chanpinliebiao')
    this.getList()
  },
  watch: {
    '$route' (v) {
      if (v.path === '/product/list') {
        this.productList = []
        this.page = 1
        this.getList()
      }
    }
  }
}
</script>
