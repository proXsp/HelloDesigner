<template>
  <el-container>
    <el-header :height="headerHeight + 'px'" ref="header">
      <menus class="editor-menu" :actionHandler="graph"></menus>
      <os-menu class="os-menu"></os-menu>
    </el-header>

    <el-container :height="mainHeight + 'px'">
      <el-aside ref="aside" :width="asideWidth + 'px'">
        <el-tree
          class="aside-tree"
          :data="treeData"
          :props="treeProps"
          @node-click="selectNode"
        ></el-tree>
      </el-aside>
      <el-main>
        <div>
          <grapheditor :height="mainHeight + 'px'" skin="black" ref="graphEditor"></grapheditor>
        </div>
      </el-main>
    </el-container>

    <el-footer :height="footerHeight + 'px'">
      <div>底部</div>
    </el-footer>
  </el-container>
</template>

<script>
import grapheditor from '../components/graph/Grapheditor'
import menus from '../components/graph/Menus.vue'
import osMenu from '../components/OsMenu.vue'

export default {
  components: {
    grapheditor,
    menus,
    osMenu
  },
  data () {
    return {
      graph: null,
      treeData: [],
      treeProps: {},
      headerHeight: 40,
      asideWidth: 250,
      footerHeight: 25,
      windowHeight: document.documentElement.clientHeight
      // asideTreeDragX: 0,
      // asideTreeDragY: 30
    }
  },
  methods: {
    selectNode () {}
  },
  computed: {
    mainHeight: function () {
      let h = this.windowHeight -
        this.headerHeight -
        this.footerHeight
      return h
    }
  },
  mounted () {
    let self = this
    this.graph = this.$refs.graphEditor
    window.onresize = function () {
      self.windowHeight = document.documentElement.clientHeight
    }
  }
}
</script>

<style scoped>
.el-header {
  -webkit-app-region: drag;
  background-color: #1b1818;
  line-height: 40px;
  color: #cdcdcd;
}

.editor-menu {
  width: 100px;
  height: 40px;
  display: inline-block;
  -webkit-app-region: no-drag;
}

.os-menu {
  display: inline-block;
  position: absolute;
  right: 26px;
  -webkit-app-region: no-drag;
}

.el-footer {
  background-image: linear-gradient(to top, #313030, #454545);
  color: #909399;
  text-align: center;
  line-height: 25px;
}

.el-aside {
  background-color: #565656;
  color: #909399;
  text-align: center;
  border-right: solid 1px #333;
}

.el-aside .el-tree {
  background-color: #565656;
}

.el-main {
  background-color: #565656;
  color: #333;
  text-align: center;
  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.aside-tree {
  height: 100%;
}
</style>
