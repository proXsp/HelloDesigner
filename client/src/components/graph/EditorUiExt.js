let EditorUiExt = function (actionHandler) {
  this.contentWindow = null
  this.actionHandler = actionHandler
}
EditorUiExt.prototype = {
  saveFile: function (forceDialog) {
    if (this.editor.graph.isEditing()) {
      this.editor.graph.stopEditing()
    }

    var xml = this.contentWindow.mxUtils.getXml(this.editor.getGraphXml())
    if (this.actionHandler && this.actionHandler.saveFile) {
      this.actionHandler.saveFile(xml)
    }
  },
  saveOtherFile: function () {
    if (this.editor.graph.isEditing()) {
      this.editor.graph.stopEditing()
    }

    var xml = this.contentWindow.mxUtils.getXml(this.editor.getGraphXml())
    if (this.actionHandler && this.actionHandler.saveOtherFile) {
      this.actionHandler.saveOtherFile(xml)
    }
  },
  openFileExt: function () {
    if (this.actionHandler && this.actionHandler.openFile) {
      this.actionHandler.openFile()
    }
  },
  openXmlFileExt: function (filename, xml) {
    try {
      var doc = this.contentWindow.mxUtils.parseXml(xml)
      this.editor.setGraphXml(doc.documentElement)
      this.editor.setModified(false)
      this.editor.undoManager.clear()

      if (filename != null) {
        this.editor.setFilename(filename)
        this.updateDocumentTitle()
      }

      return
    } catch (e) {
      this.contentWindow.mxUtils.alert(this.contentWindow.mxResources.get('invalidOrMissingFile') + ': ' + e.message)
    }

    // Fires as the last step if no file was loaded
    this.editor.graph.view.validate()

    // Required only in special cases where an initial file is opened
    // and the minimumGraphSize changes and CSS must be updated.
    this.editor.graph.sizeDidChange()
    // eslint-disable-next-line new-cap
    this.editor.fireEvent(new this.contentWindow.mxEventObject('resetGraphView'))
  }
}
export default EditorUiExt
