<template>
  <div class="basic-container">
    <div class="search-container">
      <input placeholder="搜索文章标题、内容" v-model="form.searchName"/>
    </div>
    <div class="hot-article-container">
      <div class="hot-article_image">
        <img src="../../assets/images/banner.jpeg" />
      </div>
      <div class="flex1 article_info">
        <div class="article_title">
          2020年滑雪届最值得期待的赛事
        </div>
        <div class="article_date">2020/03/13 11:34</div>
        <div class="article_detail" style="height: 32%;">
          世界高山滑雪锦标赛是由国际滑雪联合会组织的一项世界性赛事，高山滑雪是以滑雪板和滑雪杖为工具在山坡专设的线路上快速回转、滑降的一种雪上竞赛项目。高山滑雪诞生于1907年，1924年被纳入国际滑雪联合会。1931年第一届高山滑雪锦标赛在瑞士米伦举行…
        </div>
        <div class="article_btn" @click="handleGoDetail(item)">查看详情</div>
      </div>
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
        v-for="item of 3"
        :key="item"
         @click="handleGoDetail(item)">
        <img src="../../assets/images/banner.jpeg" class="article-image" />
        <div class="flex1 article_info">
          <div class="article_title">
            2020年滑雪届最值得期待的赛事
          </div>
          <div class="article_date">2020/03/13 11:34</div>
          <div class="article_detail">
            世界高山滑雪锦标赛是由国际滑雪联合会组织的一项世界性赛事，高山滑雪是以滑雪板和滑雪杖为工具在山坡专设的线路上快速回转、滑降的一种雪上竞赛项目。高山滑雪诞生于1907年，1924年被纳入国际滑雪联合会。1931年第一届高山滑雪锦标赛在瑞士米伦举行…
          </div>
          <div class="article_btn">查看详情</div>
        </div>
      </div>
    </div>
    <div class="pages-container">
      <div class="more" @click="handleGoList">查看所有文章</div>
    </div>
    <div class="recommend_title">推荐文章</div>
    <div class="article-list_container">
      <div class="article-item"
        v-for="item of 3"
        :key="item"
         @click="handleGoDetail(item)">
        <img src="../../assets/images/banner.jpeg" class="article-image" />
        <div class="flex1 article_info">
          <div class="article_title">
            2020年滑雪届最值得期待的赛事
          </div>
          <div class="article_date">2020/03/13 11:34</div>
          <div class="article_detail">
            世界高山滑雪锦标赛是由国际滑雪联合会组织的一项世界性赛事，高山滑雪是以滑雪板和滑雪杖为工具在山坡专设的线路上快速回转、滑降的一种雪上竞赛项目。高山滑雪诞生于1907年，1924年被纳入国际滑雪联合会。1931年第一届高山滑雪锦标赛在瑞士米伦举行…
          </div>
          <div class="article_btn">查看详情</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        searchName: ''
      }
    }
  },
  methods: {
    // 跳转到详情
    handleGoDetail (item) {
      this.$router.push({
        path: '/article/detail',
        query: {
          id: item
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
  created () {}
}
</script>
