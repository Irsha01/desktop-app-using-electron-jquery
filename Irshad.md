Step-by-Step Guide to Create a Desktop Application with Electron

mkdir my-electron-app 
cd my-electron-app 

3. Initialize Your Project

npm init -y


4. Install Electron

npm install electron --save-dev


5. Create the Main Application File

main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});



6. Create the HTML File



<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hello Electron</title>
</head>
<body>
  <h1>Hello, Electron!</h1>
  <p>This is a simple Electron application.</p>
</body>
</html>




7. Add a Start Script

{
  "name": "my-electron-app",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^13.1.7"
  }
}


8. Run Your Application


npm start


9. Package Your Application

To create a standalone executable for your application, you can use a tool like electron-packager or electron-builder.

Using electron-packager:





Install electron-packager:

=> npm install electron-packager --save-dev

Package your application:
=>npx electron-packager . my-electron-app --platform=win32 --arch=x64 --out=dist
 
This command packages your application for Windows (use --platform=darwin for macOS and --platform=linux for Linux).


Using electron-builder:

Install electron-builder:
npm install electron-builder --save-dev 


Add build configuration to your package.json:

"scripts": { "start": "electron .", "dist": "electron-builder" },
 "build": { 
 "appId": "com.example.myapp”, 
 "productName": "My Electron App”, 
 "files": [ 
 "main.js”, 
 "index.html”,
 "package.json” 
 ], 
 "win": { 
 "target": "nsis” 
 } 
} 


Build your application:

npm run dist 


Example Configuration

Here’s an example of how you might configure electron-builder in your package.json to create an NSIS installer for a Windows application:


{
  "name": "my-electron-app",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "dist": "electron-builder"
  },
  "build": {
    "appId": "com.example.myapp",
    "productName": "My Electron App",
    "files": [
      "main.js",
      "index.html",
      "package.json"
    ],
    "win": {
      "target": "nsis"
    },
    "nsis": {
      "oneClick": false,          // If true, the installer will be one-click installation
      "allowElevation": true,     // Allow requesting elevation (admin rights) if needed
      "installerIcon": "icon.ico",// Path to the icon for the installer
      "uninstallerIcon": "icon.ico",// Path to the icon for the uninstaller
      "installerHeaderIcon": "icon.ico", // Path to the icon for the installer header
      "createDesktopShortcut": true, // Create a desktop shortcut for the app
      "createStartMenuShortcut": true // Create a start menu shortcut for the app
    }
  }
}


