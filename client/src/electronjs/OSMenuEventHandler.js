const ipcRenderer = require('electron').ipcRenderer

let OSMenuEventHandler = function () {
}

OSMenuEventHandler.prototype = {
  init: function () {
    this.showAllOSMenu()
    this.initMenuEvent()
  },
  showAllOSMenu: function () {
    window.addEventListener('os-menu-mounted', function () {
      window.EventTrigger.trigger(window, 'os-menu-show', true)
    })
  },
  initMenuEvent: function () {
    let self = this
    window.addEventListener('os-menu-item-click', function (e) {
      let clickMenuItem = e.detail.data
      if (clickMenuItem === 'minus') {
        // 最小化
        ipcRenderer.send('do-window-minus')
      } else if (clickMenuItem === 'fullScreen') {
        // 最大化
        ipcRenderer.send('do-window-fullScreen')
        self.showMenuItem([{
          name: 'fullScreen',
          state: false
        }, {
          name: 'restore',
          state: true
        }])
      } else if (clickMenuItem === 'restore') {
        // 还原
        ipcRenderer.send('do-window-restore')
        self.showMenuItem([{
          name: 'restore',
          state: false
        }, {
          name: 'fullScreen',
          state: true
        }])
      } else if (clickMenuItem === 'close') {
        // 关闭
        ipcRenderer.send('do-window-close')
      }
    })
  },
  /**
   *
   * @param {Array} items items
   */
  showMenuItem: function (items) {
    if (items instanceof Array) {
      window.EventTrigger.trigger(window, 'os-menu-show-item', items)
    }
  }
}

module.exports = OSMenuEventHandler
