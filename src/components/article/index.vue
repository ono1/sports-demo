<template>
  <div class="basic-container">
    <div class="search-container">
      <el-input v-model="form.searchName" placeholder="搜索文章标题、内容"></el-input>
      <!-- <input placeholder="搜索文章标题、内容" v-model="form.searchName"/> -->
    </div>
    <div class="category-tags">
      <span>生活</span>
      <span>/</span>
      <span>滑雪</span>
      <span>/</span>
      <span>赛事</span>
    </div>
    <div class="article-list_container">
      <div class="article-item"
        v-for="item of list"
        :key="item.id">
        <img :src="item.image" class="article-image" />
        <div class="flex1 article_info">
          <div class="article_title">
            {{item.title}}
          </div>
          <div class="article_date">{{item.create_date}}</div>
          <div class="article_detail">
            {{item.brief}}
          </div>
          <div class="article_btn" @click="handleGoDetail(item)">查看详情</div>
        </div>
      </div>
    </div>
    <div class="pages-container">
      <div class="more" @click="handleGoList">查看所有文章</div>
    </div>
    <div class="recommend_title">推荐文章</div>
    <div class="article-list_container">
      <div class="article-item"
        v-for="item of archivesList"
        :key="item.id">
        <img :src="item.image" class="article-image" />
        <div class="flex1 article_info">
          <div class="article_title">
            {{item.title}}
          </div>
          <div class="article_date">{{item.create_date}}</div>
          <div class="article_detail">
            {{item.brief}}
          </div>
          <div class="article_btn" @click="handleGoDetail(item)">查看详情</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/utils/api'

export default {
  data () {
    return {
      form: {
        searchName: ''
      },
      archivesList: [], // 人气文章
      list: [],
      page: 1,
      model: 1
    }
  },
  methods: {
    // 人气单品
    getRecommendList () {
      let params = {
        model: 1 // 1: 新闻 2: 产品
      }
      Api.recommendList(params)
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            this.archivesList = data.archivesList
          } else {
            this.$message.error(msg)
          }
        })
    },

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

    // 跳转到文章列表
    handleGoList () {
      this.$router.push({
        path: '/article/list'
      })
    }
  },
  created () {
    this.getArticleList()
    this.getRecommendList()
  }
}
</script>
