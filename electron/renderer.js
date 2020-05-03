const { ipcRenderer: ipc, remote } = require('electron');
const reader = require('./local_modules/read_file')
const hljs = require("highlight.js/lib/core");  // require only the core library
hljs.registerLanguage('log', require('./local_modules/log'));

// require = require("esm")(module);
// const wasm = require('../pkg/x4_debug_parser')
// require('devtron').install();

document.querySelector('#btn').addEventListener('click', () => {
    var element = document.getElementById('filter')
    if(typeof(element) != 'undefined' && element != null){
        let values = getSelectValues(element)
        ipc.send('load-file', values);
        // console.log(document.getElementById('filter').value);
    } else {
        ipc.send('load-file');
    }
    
});

// document.querySelector('#btn2').addEventListener('click', () => {
//     var path = document.getElementById('debug_path').value
//     if (path !== '') {
//         ipc.send('set-debug-path', path);
//         document.getElementById('debug_path').value = '';
//     }
// });

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
    var string_data = '';
    for (var i=0; i<data.length; i++) {
        string_data = string_data + data[i].string
    }
    const highlightedCode = hljs.highlight('log', string_data).value
    app_view.innerHTML = highlightedCode;
});

ipc.on('print-filtered', (event, data) => {
    const highlightedCode = hljs.highlight('log', data).value
    app_view.innerHTML = highlightedCode;
});

ipc.on('filter-buttons', (event, data) => {
    var button_code = '<label>Select Tags for Filter</label><br><br><select id=\"filter\" class=\"select-view\" multiple size=\"' + data.length + '\">';
    for (var i=0; i<data.length; i++) {
        button_code = button_code + '<option class=\"select-view-item\" value=\"' + data[i] + '\">' + data[i] + '</option>'
    }
    button_code = button_code + '</select>';
    filter_buttons.innerHTML = button_code;
});


function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }