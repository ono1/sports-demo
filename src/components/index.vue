<template>
  <div>
    <div class="sports-top_container">
      <div class="sports-logo-container">
        <img src="../assets/images/logo.png" style="height: 60px;" />
      </div>
      <div class="sports-menu-container">
        <ul class="qybox-menu">
          <li class="qybox-menu-item"
            :index="index"
            v-for="(item, index) in menuList"
            @mouseenter="mouseId = item.id"
            @mouseleave="mouseId = ''"
            @click="handleGo(item)"
            :key="item.id">
            <div class="qybox-submenu__title">
              <span class="qybox-title"
                >{{item.label}}</span>
              <i :style="{background: item.id === currentId ? '#333333' : '#ffffff'}"></i>
            </div>
            <div class="qybox-menu--horizontal" v-show="item.id === 1 && mouseId === 1 && layoutCategory">
              <ul class="qybox-menu--popup">
                <li class="qybox-submenu-item" v-for="child of tabList" :key="child.id">
                  <div
                    class="qybox-menu-icon"
                    :style="{color: child.id === currentCategoryId ? 'rgba(255, 255, 255, .5)' : '#fff'}"
                    @mouseenter="handleToMouseEnter(child)"
                    @click.stop="handleClick(child)">{{child.title}}</div>
                  <ul class="qybox-el-menu--popup">
                    <li
                      v-for="grand of child.children"
                      :key="grand.id"
                      :style="{color: grand.id === currentCategoryId ? 'rgba(255, 255, 255, .5)' : '#fff'}"
                      @mouseenter="handleToMouseEnter(grand)"
                      @click.stop="handleClick(grand)">{{grand.title}}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="main"><router-view /></div>
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
import Api from '@/utils/api'

export default {
  name: 'App',
  data () {
    return {
      currentId: 1,
      currentCategoryId: '',
      currentPath: '',
      mouseId: '',
      tabList: [],
      menuList: [
        { label: '产品介绍', id: 1, value: '/' },
        { label: '新闻文章', id: 2, value: '/article/list' },
        { label: '品牌故事', id: 3, value: '/brand' },
        { label: '联系我们', id: 4, value: '/contact' }
      ],
      layoutCategory: false
    }
  },
  methods: {
    handleGo (item) {
      this.currentId = item.id
      this.$router.push({
        path: item.value
      })
    },

    handleToMouseEnter (item) {
      this.currentCategoryId = item.id
    },

    handleClick (item) {
      this.$router.replace({
        path: '/product/list',
        query: {
          id: item.id
        }
      })
    },
    // 获取tab列表
    getTabList () {
      let params = {
        model: 2
      }
      Api.tabList(params)
        .then(res => {
          let { code, msg, data } = res
          if (code === 1) {
            this.tabList = data.tabList
          } else {
            this.$message.error(msg)
          }
        })
    }
  },
  created () {
    this.getTabList()
  },
  watch: {
    '$route' (v) {
      if (v.path === '/product/list') {
        this.layoutCategory = true
      } else {
        this.layoutCategory = false
      }
    }
  }
}
</script>

<style>
.qybox-menu {
  display: flex;
  align-items: center;
}
.qybox-menu-item {
  font-size: 20px;
  float: left;
  margin: 0 50px;
  position: relative;
  cursor: pointer;
}
.qybox-title {
  padding: 2px 5px;
}
.qybox-submenu__title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.qybox-submenu__title i {
  width: 20px;
  height: 5px;
  background: #ffffff;
}

.qybox-menu--horizontal {
  position: absolute;
  top: 56px;
  left: 0;
  background: #000000;
  padding: 30px;
  color: #fff;
  z-index: 3;
  box-shadow: 0 3px 24px rgba(64, 79, 245, .1);
  display: flex;
  /* color: #404FF5; */
}
.qybox-menu--popup {
  display: flex;
}
.qybox-submenu-item {
  float: left;
  line-height: 20px;
  padding: 0 17px 0 20px;
  position: relative;
  font-size: 12px;
  border-left: 1px solid #fff;
}
.qybox-menu-icon {
  font-size: 14px;
  padding-bottom: 5px;
}
.qybox-el-menu--popup {
  padding: 10px 0;
}
.qybox-el-menu--popup li {
  line-height: 25px;
}
.sub-title {
  font-size: 14px;
}
</style>
