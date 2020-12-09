const { app, BrowserWindow } = require('electron');
//确定是开发环境还是生产环境
const isDev = require('electron-is-dev');

let mainWindow;

app.on('ready', () =>{
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    const urlLocation = isDev ? "http://localhost:3000/" : "dummyurl";
    mainWindow.loadURL(urlLocation);
})