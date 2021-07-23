<template>
  <div v-if="show">
    <i class="el-icon-minus os-menu-item" v-show="minus" @click="itemClick('minus')"></i>
    <i class="el-icon-full-screen os-menu-item" v-show="fullScreen" @click="itemClick('fullScreen')"></i>
    <i class="el-icon-copy-document os-menu-item" v-show="restore" @click="itemClick('restore')"></i>
    <i class="el-icon-close os-menu-item" v-show="close" @click="itemClick('close')"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      minus: false,
      fullScreen: false,
      restore: false,
      close: false
    }
  },
  mounted () {
    let self = this
    window.addEventListener('os-menu-show', function (e) {
      self.show = e.detail.data === true
      self.showItem([{
        name: 'minus',
        state: true
      }, {
        name: 'fullScreen',
        state: true
      }, {
        name: 'close',
        state: true
      }])
    })
    window.addEventListener('os-menu-show-item', function (e) {
      self.showItem(e.detail.data)
    })
    window.EventTrigger.trigger(window, 'os-menu-mounted')
  },
  methods: {
    showItem: function (items) {
      let self = this
      if (items instanceof Array) {
        items.forEach(item => {
          self[item.name] = item.state
        })
      }
    },
    itemClick: function (item) {
      window.EventTrigger.trigger(window, 'os-menu-item-click', item)
    }
  }
}
</script>

<style scoped>
.os-menu-item {
  width: 25px;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
}
.os-menu-item:hover {
  background-color: #77361d;
  border-radius: 5px;
}

.el-icon-close.os-menu-item:hover {
  background-color: #d00c1e;
}
</style>
