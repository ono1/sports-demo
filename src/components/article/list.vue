<template>
  <div class="basic-container">
    <div class="article-list_container">
      <div class="article-item"
        v-for="item of list"
        :key="item.id"
         @click="handleGoDetail(item)">
        <img :src="item.image" class="article-image" />
        <div class="flex1 article_info">
          <div class="article_title">
            {{item.title}}
          </div>
          <div class="article_date">{{item.create_date}}</div>
          <div class="article_detail">
            {{item.description}}
          </div>
          <div class="article_btn">查看详情</div>
        </div>
      </div>
    </div>
    <div class="pages-container">
      <div class="more" @click="handleMore">查看所有文章</div>
    </div>
  </div>
</template>

<script>
import Api from '@/utils/api'

export default {
  data () {
    return {
      list: [],
      page: 1
    }
  },
  methods: {
    // 获取文章列表
    getArticleList () {
      let params = {
        page: this.page,
        model: 1
      }
      Api.list(params)
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            this.list = data.archivesList
          } else {
            this.$message.error(msg)
          }
        })
    },

    // 跳转到详情
    handleGoDetail (item) {
      this.$router.push({
        path: '/article/detail',
        query: {
          id: item.id
        }
      })
    },

    // 获取更多
    handleMore () {
      this.page++
      this.getArticleList()
    }
  },
  created () {
    this.getArticleList()
  }
}
</script>
