// run application
const { app, BrowserWindow, ipcMain } = require('electron');
const ipc = ipcMain;
const { read } = require('fs'); const path = require('path');

// // Enable live reload for Electron
// require("electron-reload")(__dirname);

// load index.html
function createWindow () {
  const mainWindow = new BrowserWindow({
    minWidth: 185,
    minHeight: 100,
    width: 875,
    height: 640,
    frame: true, // get rid of the default windows frame
    icon: __dirname + "/icon.png",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),

      // todo make alterations to only use necessary node. remove this later
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.removeMenu() // remove the main menu that loads by default
  mainWindow.webContents.openDevTools() // open devTools on loadup

  mainWindow.loadFile(path.join(__dirname, "src/index.html"));

// * ----- asynchronously communicate between the renderer.js and main.js ----- */
  // handle the renderer parameters

  // * file
  //

  // close the application
  ipc.on("closeApp", () => {
    app.quit()

  });

  // * edit
  //

  // * share
  //

  // * tools
  // toggle dev tools
  ipc.on("toggleDevTools", () => {
    mainWindow.toggleDevTools();
  });

  // refresh the page
  ipc.on("refreshApp", () => {
    mainWindow.reload();
    // process.platform == "darwin" ? "Command+Q" : "Alt+F4"
  });

  // * help
  //
}

// listen for when ready to run the create window function
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



// open file function 