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

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({
      width: config.WINDOW_DEFAULT_WIDTH, // here I have set the width and height
      height: config.WINDOW_DEFAULT_HEIGHT,
      // frame: true,
      // transparent: true,
      // minimizable: true,
      // maximizable: true,
      // closable: true,
  });

   // Load Remote Url
  mainWindow.loadURL(startUrl);

  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  // // Build menu from template
  // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // // Insert menu
  // Menu.setApplicationMenu(mainMenu);
});


// Create menu template
// const mainMenuTemplate =  [
//   // Each object is a dropdown
//   {
//     label: 'File',
//     submenu:[
//       {
//         label:'',
//         click(){
//           createAddWindow();
//         }
//       },
//       {
//         label:'',
//         click(){
//           mainWindow.webContents.send('item:clear');
//         }
//       },
//       {
//         label: '',
//         accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
//         click(){
//           app.quit();
//         }
//       }
//     ]
//   }
// ];

// If OSX, add empty object to menu
// if(process.platform == 'darwin'){
//   mainMenuTemplate.unshift({});
// }

// // Add developer tools option if in dev
// if(isDevelopment){
//   mainMenuTemplate.push({
//     label: 'Developer Tools',
//     submenu:[
//       {
//         role: 'reload'
//       },
//       {
//         label: 'Toggle DevTools',
//         accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
//         click(item, focusedWindow){
//           focusedWindow.toggleDevTools();
//         }
//       }
//     ]
//   });
// }