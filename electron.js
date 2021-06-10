const { app, BrowserWindow } = require('electron');
const userDataPath = app.getPath('userData');
// try {
//     require('electron-reloader')(module)
// } catch (_) { }

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Time Tracker",
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    // win.webContents.openDevTools();
    win.loadFile('dist/index.html');

    win.webContents.on('dom-ready', () => {
        win.webContents.send('userDataPath', userDataPath);
    });
}

app.on('ready', createWindow);