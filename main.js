const { app, BrowserWindow, Menu } = require('electron')
const shell = require('electron').shell
const ipc = require('electron').ipcMain
// const debug = require('electron-debug')

// debug();

let win
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  ipc.on('update-notify-value', function(event, arg){
  win.webContents.send('targetPriceVal', arg);
});
  ipc.on('update-notify-value2', function(event, arg){
  win.webContents.send('targetPriceVal2', arg);
});
  ipc.on('update-notify-value3', function(event, arg){
  win.webContents.send('targetPriceVal3', arg);
});


  win.loadFile('src/index.html')

  var menu = Menu.buildFromTemplate([
      {
          label: 'Menu',
          submenu: [
              {
                  label: 'Adjust Notification Value'
              },

              {
                  label: 'Coin MarketCap',
                  click(){
                      shell.openExternal('http://coinmarketcap.com')
                  }
              },
              {
                label: 'Developer Tools',
                  submenu:[
                      {
                          label: 'Toggle DevTools',
                          accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                          
                          click(item, focusedWindow){
                              focusedWindow.toggleDevTools();
                          }
                      },
                      {
                          role: 'reload'
                      }
                  ]
                        },
              {type: 'separator'},
              {
                  label: 'Exit',
                  click(){
                      app.quit()
                  }
              }

          ]
      },
      {
          label: 'Info'
      }
  ])
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

