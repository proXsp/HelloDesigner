/**
 * electron start------------------------------------------------------------
 */
// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray } = require('electron')

const OSAction = require('./OSAction')
const path = require('path')

let osAction = null

const icon = path.join(__dirname, '../assets/favicon.ico')

let mainWindow = null
function createWindow () {
  // Create the browser window.
  Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    backgroundColor: '#1b1818',
    frame: false,
    icon: icon,
    webPreferences: {
      preload: path.join(__dirname, 'Initializer.js')
    }
  })

  osAction = new OSAction(mainWindow)
  osAction.init()

  // and load the index.html of the app.
  // mainWindow.loadFile('./dist/index.html')
  mainWindow.loadFile('./dist/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

let appIcon = null
function createTray () {
  appIcon = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click: () => {
        if (process.platform !== 'darwin') {
          app.exit()
        }
      }
    },
    {
      label: '调试',
      click: () => {
        osAction.doDebugger(mainWindow)
      }
    }
  ])

  // Make a change to the context menu
  contextMenu.items[1].checked = false

  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()
  createTray()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。

/**
 * electron end------------------------------------------------------------
 */
