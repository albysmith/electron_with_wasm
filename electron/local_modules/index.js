import * as wasm from '../pkg/x4_debug_parser.js';

// require = require("esm")(module);
// const wasm = require("../pkg/x4_debug_parser.js");
const hljs = require("highlight.js/lib/core");  // require only the core library

console.log(wasm.greet());

const app_view = document.getElementById('app')

// separately require languages
hljs.registerLanguage('log', require('./local_modules/log'));
var data = "hello"
const highlightedCode = hljs.highlight('log', data.toString()).value
app_view.innerHTML = highlightedCode;

