const {app, BrowserWindow} = require('electron');
const EmitterBase = require('events');
class Emitter extends EmitterBase {}
const eventEmitter = new Emitter();


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

/* Keep a global reference of the window object, if you don't, the window will
be closed automatically when the JavaScript object is garbage collected.*/
let mainWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 650,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false
    });

    //Removes top menu
    mainWindow.removeMenu();

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


/**
 * At this point, the Electron boilerplate ends and the actual code begins.
 * You can tell because there are semicolons here.
 * I'm not a monster.
 * Author: Connor McDermid
 * License: GNU General Public License v3.0
 * Copyright (c) 2019 Connor McDermid
 * Part of the blinkOS project.
 */
function firstButton() {
    eventEmitter.emit('firstButtonClicked');
}
eventEmitter.on('firstButtonClicked', () => {
    if (mainWindow === null) {
        createWindow();
    }
    mainWindow.loadURL(`file://${__dirname}/page2.html`); //When using/editing this code, not that here we use backticks (`) not single-quotes (') or double-quotes (").
                                                          //This is important to ensure that the ${__dirname} variable works.

});