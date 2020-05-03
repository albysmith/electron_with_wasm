mod utils;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[macro_use]
extern crate serde_derive;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(Default, Debug, Clone, Serialize, Deserialize)]
struct Entry {
    string: String,
    time: f64,
    tag: String,
    message: String,
}

#[derive(Default, Debug, Clone)]
struct DataPerTag {
    tags: Vec<String>,
    data: Vec<Entry>,
}

#[wasm_bindgen]
pub fn greet() -> String {
    "Text".to_string()
}

#[wasm_bindgen]
pub fn init_filter(file_data: String, structs: Option<Box<[JsValue]>>) -> JsValue {
    if let Some(i) = structs {
        return JsValue::NULL;
    } else {
        let parsed_data = parse_debug(file_data);
        return parsed_data;
    }
}

fn parse_debug(file_data: String) -> JsValue {
    let mut logdata = vec![];
    let mut tag_list = vec![];
    let log = file_data.replace("\r\n", " NEWLINE ");
    let mut timeflag = false;
    let mut string = String::new();
    let mut message = String::new();
    let mut time = 0.0;
    let mut enum_flag = String::new();
    for word in log.split_whitespace() {
        if timeflag {
            // println!("{}",word);
            string.push_str(&format!(" {}", word));
            if let Ok(t) = word.parse::<f64>() {
                time = t;
            } else {
                time = 0.0;
            }
            timeflag = false;
        } else if let Some(tag) = sort_log(word) {
            if !tag_list.contains(&tag) {
                tag_list.push(tag.clone());
                tag_list.sort();
            }
            // do something with the old string and get it out of here
            if string.contains("======================================")
                || string.contains("(error: 14)")
                || string.contains(".sig")
                || (string.contains("*** Context:md") && !string.contains("NEWLINE"))
            {
                string = word.to_string();
                message = String::new();
                timeflag = true;
            } else {
                string = string.replace("NEWLINE", "\r\n");
                message = message.replace("NEWLINE", "\r\n");
                set_entry_struct(&mut logdata, string, time, message, enum_flag);
                string = word.to_string();
                message = String::new();
                timeflag = true;
            };
            enum_flag = tag;
        } else if timeflag == false {
            string.push_str(&format!(" {}", word));
            message.push_str(&format!("{} ", word))
        }
    }
    let rust_type = (tag_list, logdata);
    let js_type = JsValue::from_serde(&rust_type);
    if let Ok(i) = js_type {
        return i;
    } else {
        return JsValue::NULL;
    }
}

fn sort_log(entry: &str) -> Option<String> {
    if entry.contains("[") && entry.to_string().pop() == Some(']') {
        let mut tag = entry.replace("[", "").replace("]", "").to_lowercase();
        if tag == "=error=".to_string() {
            tag = "error".to_string()
        }
        return Some(tag);
    } else {
        return None;
    }
}

fn set_entry_struct(
    logdata: &mut Vec<Entry>,
    word: String,
    time: f64,
    message: String,
    tag: String,
) {
    logdata.push(Entry {
        string: word,
        time: time,
        message: message,
        tag: tag,
    })
}
