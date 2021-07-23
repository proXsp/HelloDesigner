// 主进程
const { ipcMain, dialog, app } = require('electron')
const fs = require('fs')

let OSAction = function (mainWindow) {
  this.mainWindow = mainWindow
}
OSAction.prototype = {
  init: function () {
    this.initSaveFile()
    this.initOpenFile()
    this.initOSMenuEvent()
  },
  initSaveFile: function () {
    ipcMain.on('asynchronous-graph-saveFile', function (event, file) {
      if (!file || !file.xml) {
        return
      }
      if (file.path) {
        fs.writeFile(file.path, file.xml, 'utf8', (err) => {
          event.reply('asynchronous-graph-saveFile-reply', !err)
        })
      } else {
        dialog.showSaveDialog({
          title: '保存设计',
          buttonLabel: '保存',
          filters: [
            {
              name: 'QGraphFile',
              extensions: ['qgx']
            }
          ],
          properties: ['showOverwriteConfirmation', 'createDirectory']
        }).then(result => {
          if (!result.canceled && result.filePath) {
            fs.writeFile(result.filePath, file.xml, 'utf8', (err) => {
              event.reply('asynchronous-graph-saveFile-reply', !err)
            })
          }
        })
      }
    })
  },
  initOpenFile: function () {
    let self = this
    ipcMain.on('asynchronous-graph-openFile', function (event, arg) {
      dialog.showOpenDialog({
        title: '打开设计',
        buttonLabel: '打开',
        filters: [
          {
            name: 'QGraphFile',
            extensions: ['qgx']
          }
        ],
        properties: ['openFile']
      }).then(result => {
        if (!result.canceled && result.filePaths && result.filePaths.length) {
          let filePath = result.filePaths[0]
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (!err) {
              event.reply('asynchronous-graph-openFile-reply', {
                name: self.getFileName(filePath),
                id: filePath,
                path: filePath,
                xml: data
              })
            }
          })
        }
      })
    })
  },
  initOSMenuEvent: function () {
    let self = this
    ipcMain.on('do-window-minus', function (event, arg) {
      self.mainWindow.minimize()
    })
    ipcMain.on('do-window-fullScreen', function (event, arg) {
      self.mainWindow.maximize()
    })
    ipcMain.on('do-window-restore', function (event, arg) {
      self.mainWindow.unmaximize()
    })
    ipcMain.on('do-window-close', function (event, arg) {
      self.quit()
    })
  },
  getFileName: function (filePath) {
    if (!filePath) {
      return ''
    }
    let sIndex = filePath.lastIndexOf('\\') + 1
    let eIndex = filePath.lastIndexOf('.')
    return filePath.substring(sIndex, eIndex)
  },
  quit: function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  },
  doDebugger: function () {
    this.mainWindow.webContents.openDevTools()
  }
}

module.exports = OSAction
