// Basic init
const electron = require('electron');
const { ipcMain, ipcRenderer } = require('electron');
const { app, BrowserWindow } = electron;
const bundlerProcesses = require('./backend/create-config/create-webpack-config.js');
// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname);

// To avoid being garbage collected
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png',
  });
});

let parsedFilesInfo;
ipcMain.on('check-root-directory', (event, rootDirPath) => {
  bundlerProcesses
    .indexFilesFromRoot(rootDirPath)
    .then(res => {
      console.log('file index done. back in main_process');

      // set globally so other emitters in main can access it without always passing the object back and forth
      parsedFilesInfo = res;
      event.sender.send('webpack-config-check', res);
    })
    .catch(e => console.log(e));
});

ipcMain.on('run-webpack', (event, { createNewConfig }) => {
  parsedFilesInfo.createNewConfig = createNewConfig;
  bundlerProcesses
    .runWebpack(parsedFilesInfo)
    .then(res => {
      console.log('finished creating webpack config');
    })
    .catch(e => console.log('this is the error:', e));
});

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg); // prints "ping"
//   event.returnValue = 'pongiiiii';
// });
