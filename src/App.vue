<template>
  <div id="app">
    <div class="sports-top_container">
      <div class="sports-logo-container">
      </div>
      <div class="sports-menu-container">
        <div class="sports-menu-item"
          v-for="item of menuList"
          @click="handleGo(item)"
          :key="item.id">{{item.label}}</div>
      </div>
    </div>
    <div class="main"><router-view/></div>
    <div class="bottom-container">
      <div class="contact-info">
        <div>联系我们</div>
        <div>地址: 北京市海淀区某某大厦15-1591室</div>
        <div>电话: 010-2333455</div>
        <div>传真: 020-113556</div>
        <div>邮箱: 8487651513@163.com</div>
        <div>手机: 13243178023</div>
      </div>
      <div>
        <img src="" />
        <div>公众号二维码</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      menuList: [
        { label: '产品介绍', id: 1, value: '/' },
        { label: '新闻文章', id: 2, value: '/article/index' },
        { label: '品牌故事', id: 3, value: '/' },
        { label: '联系我们', id: 4, value: '/contact' }
      ]
    }
  },
  methods: {
    handleGo (item) {
      this.$router.push({
        path: item.value
      })
    }
  },
  created () {}
}
</script>

<style>
</style>
