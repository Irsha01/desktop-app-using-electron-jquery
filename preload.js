const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getUsername: () => ipcRenderer.sendSync('get-username')
});