const electron = require('electron');
const fs = require("fs");
var path = require('path');

const { app, BrowserWindow, dialog, ipcMain: ipc } = require('electron');

var documents = app.getPath('documents');
var debug_path = path.join(documents, 'Egosoft', 'X4');
global['file_data']
var cursor;
fs.readdir(debug_path, function (err, items) {
  for (var i = 0; i < items.length; i++) {
    debug_path = path.join(debug_path, items[i], 'x4debug.log')
  }
});


// const Handlebars = require("handlebars");
require = require("esm")(module);
// module.exports = require("./pkg/x4_debug_wasm")
global['wasm'] = require("../pkg/x4_debug_parser");
// console.log(wasm.greet());
const hljs = require("highlight.js/lib/core");  // require only the core library
hljs.registerLanguage('log', require('./local_modules/log'));



function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: 'style/TwoHandedEviscerator.png'
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  ipc.on('load-file', (event, filters) => {
    // dialog.showMessageBox(win, {
    //   type: type,
    //   buttons: [],
    //   message: 'Hello, how are you?'
    // });
    console.log(filters);
    if (typeof filters == 'undefined') {
      file_data = read_debug(debug_path);
      win.webContents.send('print-debug', file_data.data);
      win.webContents.send('filter-buttons', file_data.tags);
    } else {
      var filtered_data = filter_debug(filters)
      win.webContents.send('print-filtered', filtered_data);
      // win.webContents.send('filter-buttons', filtered_data.tags);
    }
  });

  ipc.on('set-debug-path', (event, path) => {
    debug_path = path
  });

  // Open the DevTools.
  //   win.webContents.openDevTools()

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function read_debug(path) {
  let raw_file = fs.readFileSync(path, { encoding: "utf8" });
  // send to wasm
  let parsed_data = wasm.init_filter(raw_file)
  return parsed_data
}

function filter_debug(filters) {
  var filtered_data = ''
  var data = file_data.data
  if (filters.length > 0) {
    for (var i = 0; i < data.length; i++) {
      if (filters.includes(data[i].tag)) {
        filtered_data = filtered_data + data[i].string
      }
    }
  }
  else {
    for (var i = 0; i < data.length; i++) {
      filtered_data = filtered_data + data[i].string
    }
  }
  return filtered_data

}