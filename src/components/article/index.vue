<template>
  <div class="basic-container">
    <div class="search-container">
      <el-row>
        <el-col :span="24">
          <el-input
            v-model="title"
            @keyup.enter.native="handleSearch()"
            placeholder="搜索文章标题、内容" ></el-input>
        </el-col>
        <!-- <el-col :span="1">&nbsp;</el-col> -->
        <!-- <el-col :span="3">
            <el-button round @click="handleSearch()">搜索</el-button>
        </el-col> -->
      </el-row>
      <!-- <input placeholder="搜索文章标题、内容" v-model="form.searchName"/> -->
    </div>
    <div class="article-list_container">
      <div class="article-item"
        v-for="item of list"
        :key="item.id">
        <el-image
          :src="item.image"
          fit="scale-down"
          style="width: 375px;height: 240px;"></el-image>
        <!-- <img :src="item.image" class="article-image" /> -->
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
        <el-image :src="item.image" fit="scale-down" style="width: 375px;height: 240px;"></el-image>
        <!-- <img :src="item.image" class="article-image" /> -->
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
      archivesList: [], // 人气文章
      list: [],
      page: 1,
      model: 1,
      title: ''
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

    handleSearch () {
      console.log('&&&&&&')
      this.page = 1
      this.list = []
      this.getArticleList()
    },

    // 获取文章列表
    getArticleList () {
      let params = {
        page: this.page,
        model: 1,
        title: this.title
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
