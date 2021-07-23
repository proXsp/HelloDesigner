<template>
    <div class='editor-outter-container' :style="{width: width, height: height}">
        <iframe ref="iframe" class="graph-win" src="./static/grapheditor/index.html?lang=zh&skin=black" frameborder="no" border="0" marginwidth="0"
            marginheight="0" scrolling="no" allowtransparency="yes" style="width=100%, height=100%"></iframe>
    </div>
</template>

<script>
import '@/assets/style/editor.css'
import EditorUiExt from './EditorUiExt'
import ActionHandler from './ActionHandler'
import GraphManager from './GraphManager'

export default {

  name: 'g-editor',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    skin: {
      type: String,
      default: 'default'
    }
  },
  data () {
    let graphManager = new GraphManager()
    let actionHandler = new ActionHandler({
      'openCallback': this.openXmlFile,
      'graphManager': graphManager
    })
    return {
      extMain: null,
      graphWindow: null,
      graphManager: graphManager,
      actionHandler: actionHandler,
      graphEditorOption: {
        uiOption: {
          skin: this.skin,
          hideMenubar: true,
          hiderFooter: true,
          pageVisiDefault: false
        },
        other: {
          useLocalStorage: false
        },
        prototypeExt: {
          EditorUi: new EditorUiExt(actionHandler)
        }
      }
    }
  },
  mounted () {
    this.graphWindow = this.$refs['iframe'].contentWindow
    this.initGraphWindowEvent(this.graphWindow)

    this.graphWindow._editorOption = this.graphEditorOption

    this.graphEditorOption.prototypeExt.EditorUi.contentWindow = this.graphWindow
  },
  methods: {
    initGraphWindowEvent: function (graphWindow) {
      let self = this
      graphWindow.addEventListener('afterEditorUiInited', function (event) {
        self.extMain = event.data
      })
    },
    getExtMain: function () {
      if (!this.extMain) {
        throw new Error('The graph is not initialized.')
      }
      return this.extMain
    },
    getEditorUi: function () {
      return this.getExtMain().editorUi
    },
    getActionHandler: function () {
      return this.actionHandler
    },
    saveFile: function () {
      this.getEditorUi().saveFile()
    },
    saveOtherFile: function () {
      this.getEditorUi().saveOtherFile()
    },
    openFile: function () {
      this.getEditorUi().openFileExt()
    },
    openXmlFile: function (file) {
      if (!file || !file.name || !file.xml) {
        throw new Error('File corruption')
      }
      this.graphManager.loadFile(file.id, file)
      this.getEditorUi().openXmlFileExt(file.name, file.xml)
    }
  }
}
</script>

<style scoped>

</style>
