let GraphManager = function () {
  this.currentFileId = null
  this.fileMap = {}
}

GraphManager.prototype = {

  loadFile: function (id, file) {
    this.fileMap[id] = file
    this.currentFileId = id
  },
  getCurrentFile: function () {
    return this.getFile(this.currentFileId)
  },
  getFile: function (id) {
    return this.fileMap[id]
  },
  removeFile: function (id) {
    delete this.fileMap[id]
  }
}

export default GraphManager
