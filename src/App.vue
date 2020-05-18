<template>
  <div id="app">
    <div class="sports-top_container">
      <div class="sports-logo-container">
      </div>
      <div class="sports-menu-container">
        <div class="sports-menu-item">产品介绍</div>
        <div class="sports-menu-item">新闻文章</div>
        <div class="sports-menu-item">品牌故事</div>
        <div class="sports-menu-item">联系我们</div>
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
  name: 'App'
}
</script>

<style>
</style>
