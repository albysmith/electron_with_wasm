// foo.js
const fs = require("fs");

function read_file(path) {
    return fs.readFileSync(path, { encoding: "utf8" });
}