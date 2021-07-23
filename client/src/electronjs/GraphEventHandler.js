const ipcRenderer = require('electron').ipcRenderer

let GraphActionHandler = function () {
}

GraphActionHandler.prototype = {

  init: function () {
    this.initSaveFile()
    this.initOpenFile()
  },

  initSaveFile: function () {
    ipcRenderer.on('asynchronous-graph-saveFile-reply', function (event, arg) {
      console.log(arg)
    })
    window.addEventListener('saveFile', function (e) {
      ipcRenderer.send('asynchronous-graph-saveFile', e.detail.data)
    })
  },
  initOpenFile: function () {
    ipcRenderer.on('asynchronous-graph-openFile-reply', function (event, file) {
      window.EventTrigger.trigger(window, 'file-opend', file)
    })
    window.addEventListener('openFile', function (e) {
      ipcRenderer.send('asynchronous-graph-openFile', e.detail.data)
    })
  }
}

module.exports = GraphActionHandler
