const electron = require('electron')
const path = require('path')

const remote = electron.remote
const ipc = electron.ipcRenderer
const closeBtn3 = document.getElementById('closeBtn3')

closeBtn3.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close()
})

const updateBtn3 = document.getElementById('updateBtn3')

updateBtn3.addEventListener('click', function(){
    ipc.send('update-notify-value3', document.getElementById('notifyVal3').value)

    var window = remote.getCurrentWindow();
    window.close()
})