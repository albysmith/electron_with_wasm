mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// #[wasm_bindgen]
// extern {
//     fn alert(s: &str);
// }

// #[wasm_bindgen]
// pub fn greet() {
//     alert("Hello, {{project-name}}!");
// }


#[wasm_bindgen(module = "E:/Rust/Projects/electron_with_wasm/electron/local_modules/read_file.js")]
extern "C" {
    #[wasm_bindgen(catch)]
    fn read_file(path: &str) -> Result<String, JsValue>;
}