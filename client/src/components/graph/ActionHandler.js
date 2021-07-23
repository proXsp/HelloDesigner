let ActionHandler = function (option) {
  this.option = option
  this.init()
}

ActionHandler.prototype = {
  init: function () {
    this.initEvent()
  },
  initEvent: function () {
    let self = this
    window.addEventListener('file-opend', function (e) {
      let file = e.detail.data
      if (self.option && self.option.openCallback) {
        self.option.openCallback.call(null, file)
      }
    })
  },

  saveFile: function (xml) {
    let currentFile = this.getCurrentFile()
    window.EventTrigger.trigger(window, 'saveFile', {
      'path': currentFile ? currentFile.path : undefined,
      'xml': xml
    })
  },

  saveOtherFile: function (xml) {
    window.EventTrigger.trigger(window, 'saveFile', {
      'xml': xml
    })
  },

  openFile: function () {
    window.EventTrigger.trigger(window, 'openFile')
  },

  getCurrentFile: function () {
    if (this.option && this.option.graphManager) {
      return this.option.graphManager.getCurrentFile()
    }
  }

}

export default ActionHandler
