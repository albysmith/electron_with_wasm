// /*
// Language: Rust
// Author: Andrey Vlasovskikh <andrey.vlasovskikh@gmail.com>
// Contributors: Roman Shmatov <romanshmatov@gmail.com>, Kasper Andersen <kma_untrusted@protonmail.com>
// Website: https://www.rust-lang.org
// Category: common, system
// */

// function log(hljs) {
//   var NUM_SUFFIX = '([ui](8|16|32|64|128|size)|f(32|64))\?';
//   var KEYWORDS =
//     'abstract as async await become box break const continue crate do dyn ' +
//     'else enum extern false final fn for if impl in let loop macro match mod ' +
//     'move mut override priv pub ref return self Self static struct super ' +
//     'trait true try type typeof unsafe unsized use virtual where while yield';
//   var BUILTINS =
//     // functions
//     'drop ' +
//     // types
//     'i8 i16 i32 i64 i128 isize ' +
//     'u8 u16 u32 u64 u128 usize ' +
//     'f32 f64 ' +
//     'str char bool ' +
//     'Box Option Result String Vec ' +
//     // traits
//     'Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug ' +
//     'PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator ' +
//     'Extend IntoIterator DoubleEndedIterator ExactSizeIterator ' +
//     'SliceConcatExt ToString' +
//     // macros
//     'assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! ' +
//     'debug_assert! debug_assert_eq! env! panic! file! format! format_args! ' +
//     'include_bin! include_str! line! local_data_key! module_path! ' +
//     'option_env! print! println! select! stringify! try! unimplemented! ' +
//     'unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!';
//   return {
//     name: 'Log',
//     aliases: ['log'],
//     keywords: {
//       keyword:
//         KEYWORDS,
//       literal:
//         'true false Some None Ok Err',
//       built_in:
//         BUILTINS
//     },
//     lexemes: hljs.IDENT_RE + '!?',
//     illegal: '</',
//     contains: [
//       hljs.C_LINE_COMMENT_MODE,
//       hljs.COMMENT('/\\*', '\\*/', {contains: ['self']}),
//       hljs.inherit(hljs.QUOTE_STRING_MODE, {begin: /b?"/, illegal: null}),
//       {
//         className: 'string',
//         variants: [
//            { begin: /r(#*)"(.|\n)*?"\1(?!#)/ },
//            { begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/ }
//         ]
//       },
//       {
//         className: 'symbol',
//         begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
//       },
//       {
//         className: 'number',
//         variants: [
//           { begin: '\\b0b([01_]+)' + NUM_SUFFIX },
//           { begin: '\\b0o([0-7_]+)' + NUM_SUFFIX },
//           { begin: '\\b0x([A-Fa-f0-9_]+)' + NUM_SUFFIX },
//           { begin: '\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)' +
//                    NUM_SUFFIX
//           }
//         ],
//         relevance: 0
//       },
//       {
//         className: 'function',
//         beginKeywords: 'fn', end: '(\\(|<)', excludeEnd: true,
//         contains: [hljs.UNDERSCORE_TITLE_MODE]
//       },
//       {
//         className: 'meta',
//         begin: '#\\!?\\[', end: '\\]',
//         contains: [
//           {
//             className: 'meta-string',
//             begin: /"/, end: /"/
//           }
//         ]
//       },
//       {
//         className: 'class',
//         beginKeywords: 'type', end: ';',
//         contains: [
//           hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, {endsParent: true})
//         ],
//         illegal: '\\S'
//       },
//       {
//         className: 'class',
//         beginKeywords: 'trait enum struct union', end: '{',
//         contains: [
//           hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, {endsParent: true})
//         ],
//         illegal: '[\\w\\d]'
//       },
//       {
//         begin: hljs.IDENT_RE + '::',
//         keywords: {built_in: BUILTINS}
//       },
//       {
//         begin: '->'
//       }
//     ]
//   };
// }

// module.exports = log;


/*
 Language: Apache Access Log
 Author: Oleg Efimov <efimovov@gmail.com>
 Description: Apache/Nginx Access Logs
 Website: https://httpd.apache.org/docs/2.4/logs.html#accesslog
 */

function accesslog(hljs) {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
  var HTTP_VERBS = [
    "FL", "FLS"
  ];
  // faction subgoals??
  var KEYWORDS =
    'FactionSubgoal_BuildStation';
  // sector names
    var BUILTINS =
    '"Tharka\'s Cascade XV"';
  var ATTR = 'null nil none'
  return {
    name: 'Log',
    keywords: {
      keyword:
        KEYWORDS,
      literal:
        'xenon argon freesplit',
      built_in:
        BUILTINS,
      attribute:
        ATTR
    },
    contains: [
      // IP
      {
        className: 'number',
        begin: '^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b',
        relevance: 5
      },
      // Other numbers
      {
        className: 'number',
        begin: '\\b\\d+\\b',
        relevance: 0
      },
      // component IDs
      {
        className: 'meta',
        begin: '\\b0x((?:[a-zA-Z]+[0-9]|[0-9]+[a-zA-Z])[a-zA-Z0-9]*)\\b',
        relevance: 0
      },
      {
        className: 'meta',
        begin: '\\b0x\\d+\\b',
        relevance: 0
      },
      {
        className: 'meta',
        begin: '\\b0x[A-Za-z]+\\b',
        relevance: 0
      },
      // Requests
      {
        className: 'string',
        begin: '"(' + HTTP_VERBS.join("|") + ')', end: '"',
        keywords: HTTP_VERBS.join(" "),
        illegal: '\\n',
        relevance: 5,
        contains: [{
          begin: 'HTTP/[12]\\.\\d',
          relevance: 5
        }]
      },
      // Dates
      {
        className: 'string',
        // dates must have a certain length, this prevents matching
        // simple array accesses a[123] and [] and other common patterns
        // found in other languages
        begin: /\[\d[^\]\n]{8,}\]/,
        illegal: '\\n',
        relevance: 1
      },
      {
        className: 'string',
        begin: /\[/, end: /\]/,
        illegal: '\\n',
        relevance: 0
      },
      // User agent / relevance boost
      {
        className: 'string',
        begin: '"Mozilla/\\d\\.\\d \\\(', end: '"',
        illegal: '\\n',
        relevance: 3
      },
      // Strings
      {
        className: 'string',
        begin: '"', end: '"',
        illegal: '\\n',
        relevance: 0
      }
    ]
  };
}

module.exports = accesslog;
