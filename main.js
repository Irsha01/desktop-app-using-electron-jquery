const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');

const iconPath = path.join(__dirname, 'logo.png');
function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon : iconPath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
      contentSecurityPolicy: "default-src 'self'  script-src 'self'",
      sandbox: false, // Disable sandboxing
            allowRunningInsecureContent: true, // Allow loading insecure content
            allowEval: true, // Allow eval() usage
            }
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');
}

// Fetch The Username and store using preload.js 
ipcMain.on('get-username', (event) => {
  event.returnValue = os.userInfo().username;
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then( () => {

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

 