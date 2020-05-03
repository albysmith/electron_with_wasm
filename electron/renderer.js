const { ipcRenderer: ipc, remote } = require('electron');
const reader = require('./local_modules/read_file')
// require = require("esm")(module);
// const wasm = require('../pkg/x4_debug_parser')
// require('devtron').install();

document.querySelector('#btn').addEventListener('click', () => {
    ipc.send('load-file');
});

document.querySelector('#btn2').addEventListener('click', () => {
    var path = document.getElementById('debug_path').value
    if (path !== '') {
        ipc.send('set-debug-path', path);
        document.getElementById('debug_path').value = '';
        // console.log(document.getElementById('debug_path').value)
    }
});

const wasm = remote.getGlobal('wasm')
console.log(wasm.greet());



// document.querySelector('#btn2').addEventListener('click', () => {
//     remote.dialog.showMessageBox(remote.getCurrentWindow(), {
//         type: 'info',
//         buttons: [],
//         message: 'Hello, how are you?'
//     });
// });

ipc.on('print-debug', (event, data) => {
    const hljs = require("highlight.js/lib/core");  // require only the core library
    hljs.registerLanguage('log', require('./local_modules/log'));
    const highlightedCode = hljs.highlight('log', data.toString()).value
    app_view.innerHTML = highlightedCode;
});