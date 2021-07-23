<template>
  <div>
    <div>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link menu-item">
          <i class="el-icon-files"></i>文件
        </span>
        <el-dropdown-menu slot="dropdown" class="menu-children-item">
          <el-dropdown-item command="openFile"><i class="el-icon-folder-opened"></i> 打开</el-dropdown-item>
          <el-dropdown-item command="saveFile"><i class="el-icon-edit"></i> 保存</el-dropdown-item>
          <el-dropdown-item command="saveOtherFile"><i class="el-icon-edit-outline"></i> 另存为</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <span>|</span>
    <div></div>
  </div>
</template>

<script>
export default {
  props: ['actionHandler'],
  methods: {
    handleCommand (command) {
      this.actionHandler[command]()
    }
  }
}
</script>

<style scoped>
.menu-item {
  color: #dedede;
  cursor: pointer;
}
.menu-children-item {
  background-color: #1f1d1d;
  border: 1px solid #444343;
  top: 29px !important;
  left: 16px !important;
}
.menu-children-item .el-dropdown-menu__item {
  line-height: 32px;
}
.menu-children-item .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #0a0505;
  color: #e7ebef;
}
</style>

<style>
.el-popper .popper__arrow {
  display: none !important;
}
.el-dropdown-menu__item {
  color: #b6b9bf;
}
</style>
