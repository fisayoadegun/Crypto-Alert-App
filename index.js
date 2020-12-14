const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
var price = document.querySelector('h1')
var price2 = document.getElementById('price2')
var price3 = document.getElementById('price3')
var targetPrice = document.getElementById('targetPrice')
var targetPrice2 = document.getElementById('targetPrice2')
var targetPrice3 = document.getElementById('targetPrice3')
var targetPriceVal 
var targetPriceVal2 
var targetPriceVal3


function getBTC() {
  axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
  .then(res => {
    const cryptos = res.data.BTC.USD
    price.innerHTML = '$'+cryptos.toLocaleString('en')
    if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD){
      const notification = {
      title: 'BTC Alert',
      body: 'BTC just crossed $'+targetPriceVal+'!',
      icon: path.join(__dirname, '../assets/images/btc.jpg')
    }

      const myNotification = new window.Notification(notification.title, notification)
    }
  })
  
}
getBTC()
setInterval(getBTC, 10000);


function getETH() {
  axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=USD')
  .then(res => {
    const cryptos = res.data.ETH.USD
    price2.innerHTML = '$'+cryptos.toLocaleString('en')
    if (targetPrice2.innerHTML != '' && targetPriceVal2 < res.data.ETH.USD){
      const notification2 = {
      title: 'ETH Alert',
      body: 'ETH just crossed $'+targetPriceVal2+'!',
      icon: path.join(__dirname, '../assets/images/eth.png')
    }

      const myNotification = new window.Notification(notification2.title, notification2)
    }
  })
}

getETH()
setInterval(getETH, 50000);

function getLTC() {
  axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=LTC&tsyms=USD')
  .then(res => {
    const cryptos = res.data.LTC.USD
    price3.innerHTML = '$'+cryptos.toLocaleString('en')
    if (targetPrice3.innerHTML != '' && targetPriceVal3 < res.data.LTC.USD){
        const notification3 = {
        title: 'LTC Alert',
        body: 'LTC just crossed $'+targetPriceVal3+'!',
        icon: path.join(__dirname, '../assets/images/ltc.png')
      }

      const myNotification = new window.Notification(notification3.title, notification3)
    }
  })
}

getLTC()
setInterval(getLTC, 60000);


notifyBtn.addEventListener('click', function(event){
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({frame: false, transparent: true, alwaysOnTop:true, width: 400, height: 200,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
    })
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})
notifyBtn2.addEventListener('click', function(event){
    const modalPath = path.join('file://', __dirname, 'add2.html')
    let win = new BrowserWindow({frame: false, transparent: true, alwaysOnTop:true, width: 400, height: 200,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
    })
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})

notifyBtn3.addEventListener('click', function(event){
    const modalPath = path.join('file://', __dirname, 'add3.html')
    let win = new BrowserWindow({frame: false, transparent: true, alwaysOnTop:true, width: 400, height: 200,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
    })
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', function(event, arg){
  targetPriceVal = Number(arg)
  targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})

ipc.on('targetPriceVal2', function(event, arg){
  targetPriceVal2 = Number(arg)
  targetPrice2.innerHTML = '$'+targetPriceVal2.toLocaleString('en')
})

ipc.on('targetPriceVal3', function(event, arg){
  targetPriceVal3 = Number(arg)
  targetPrice3.innerHTML = '$'+targetPriceVal3.toLocaleString('en')
})

