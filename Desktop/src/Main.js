const electron = require('electron');
const path = require('path');
const isDevelopment = require('electron-is-dev');
const url = require('url');
const config = require('./Config.js')

// SET ENV
process.env.NODE_ENV = 'development';

// Set url 
const startUrl = isDevelopment ? config.APP_DEV_URL : config.APP_REMOTE_HOME_URL;

const { app, BrowserWindow, Menu, ipcMain } = electron;

let starterWindow;
let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
  // Create new window
  starterWindow = new BrowserWindow({
      width: config.WINDOW_MIN_WIDTH,
      height: config.WINDOW_MIN_HEIGHT,
      icon : config.ICON,
      frame: false,
      title : "Hello Back!",
      // transprent: true,
      minimizable: false,
      maximizable: false,
      // closable: true,
  });

   // Load Local Url
  starterWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'resources/starterPage/index.html'),
    protocol: 'file:',
    slashes:true
  }));

  setTimeout(()=>{

      // Create new window
      mainWindow = new BrowserWindow({
          width: config.WINDOW_DEFAULT_WIDTH,
          height: config.WINDOW_DEFAULT_HEIGHT,
          frame: true,
          icon : config.ICON
          // transprent: true,
          // minimizable: false,
          // maximizable: false,
          // closable: true,
      });

      // Load Remote Url
      mainWindow.loadURL(startUrl);

      // Quit app when closed
      mainWindow.on('closed', function(){
        app.quit();
      });

      // Close the starter window
      starterWindow.close();
  },18000)
});