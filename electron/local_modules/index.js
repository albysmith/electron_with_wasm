// require = require("esm")(module);
// const wasm = require("../../pkg/x4_debug_parser.js");



const hljs = require("highlight.js/lib/core");  // require only the core library
// separately require languages
hljs.registerLanguage('log', require('./local_modules/log'));
const highlightedCode = hljs.highlight('log', data.toString()).value
document.getElementById('app').innerHTML = highlightedCode;

