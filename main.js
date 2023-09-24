console.log('TOKENGEN 1.2.0.3\nhttps://jh-shop.kr/discord');
const CDEX = require('./rsc/rndrCdex.js');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
let mainWindow;
let victim;
let login = false;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 830,
        height: 1120,
        minWidth: 830,
        minHeight: 1100,
        maxHeight: 1130,
        resizable: true,
        center: true,
        autoHideMenuBar: true,
        webPreferences: {
            devTools: false,
            preload: path.join(__dirname, './rsc/preload.js') //devTools: false
        }
    });
    mainWindow.loadFile('./rsc/login.html');
};

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        };
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    };
});

ipcMain.on('msg', async (event, msg) => {
    victim = event.sender;
    try {
        if (msg['msg'] == 'command') {
            if (msg['cmd'] == 'startGen') {
                if (login) {
                    runningGen = true;
                    CDEX.go();
                    CDEX.cdex(msg, victim);
                    var config = {
                        'msg': 'weblog',
                        'type': 'genmsg',
                        'text': 'Log : gen start'
                    };
                    victim.send('msg', config);
                } else {
                    var config = {
                        'msg': 'fire',
                        'icon': 'warning',
                        'title': 'Warning',
                        'text': 'Abnormal access detected!'
                    };
                    victim.send('msg', config);
                };
            } else if (msg['cmd'] == 'stopGen') {
                if (login) {
                    CDEX.stop();
                } else {
                    var config = {
                        'msg': 'fire',
                        'icon': 'warning',
                        'title': 'Warning',
                        'text': 'Abnormal access detected!'
                    };
                    victim.send('msg', config);
                };
            } else if (msg['cmd'] == 'login') {
                if (login) {
                    var config = {
                        'msg': 'fire',
                        'icon': 'warning',
                        'title': 'Warning',
                        'text': 'Abnormal access detected!'
                    };
                    victim.send('msg', config);
                } else {
                    var gin = await CDEX.gin(msg['nickname'], mainWindow, victim);
                    login = gin;
                };
            } else if (msg['cmd'] == 'reload') {
                mainWindow.loadFile('./rsc/index.html');
            };
        }
    } catch (e) {
        var config = {
            'msg': 'fire',
            'icon': 'error',
            'title': 'Error Occurred',
            'text': e
        };
        victim.send('msg', config);
    };
});
