# Vue 객체

```javascript
// Uncaught TypeError: Converting circular structure to JSON
// 에러가 발생하여 객체정보를 문자열로 변환할 수 없다.
// console.log(JSON.stringify(vue));

// Demo: Circular reference 참조가 발생하는 경우를 만들기 위한 객체 선언
var o = {};
o.o = o;
o.x = 100;

// Uncaught TypeError: Converting circular structure to JSON
// 에러가 발생하여 객체정보를 문자열로 변환할 수 없다.
// console.log(JSON.stringify(o));

function stringify(obj) {
  // Note: cache should not be re-used by repeated calls to JSON.stringify.
  // 중복체크를 하기 위해서 이미 참조한 객체를 배열에 저장한다.
  var cache = [];

  // 커스텀 리플레이서 함수를 사용하도록 코딩한다.
  var result = JSON.stringify(obj, function(key, value) {
      if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
          }
          // Store value in our collection
          cache.push(value);
      }
      return value;
  });

  cache = null; // Enable garbage collection
  return result;
}

// 잘 수행된다.
console.log(stringify(o));
// JSON.stringify 대신 stringify 함수를 사용한다.
console.log(stringify(vue));
```
<br>

출력결과: 짧게

```javascript
{
  "_uid": 0,
  "_isVue": true,
  "$options": {
    "components": {},
    "directives": {},
    "filters": {},
    "el": ".container",
    "methods": {calculate: f(event)},
    "staticRenderFns": []
  },
  "_renderProxy": {
    // ... 생략
  },
  "_inactive": false,
  "_isMounted": true,
  "_isDestroyed": false,
  "_isBeingDestroyed": false,
  "operator": "+",
  "c": null,
  "b": 2,
  "a": 1
}
```
<br>

출력결과: 길게
```javascript
{
  "_uid": 0,
  "_isVue": true,
  "$options": {
    "components": {
      __proto__: Object
    },
    "directives": {
      __proto__: Object
    },
    "filters": {
      __proto__: Object
    },
    "el": ".container",
    "methods": {
      calculate: f (event),
      __proto__: Object
    },
    "staticRenderFns": [
      null,
      null,
      null,
      null,
      null
    ]
  },
  "_renderProxy": {
    "_uid": 0,
    "_isVue": true,
    "$children": [

    ],
    "$refs": {

    },
    "_watcher": {
      "deep": false,
      "user": false,
      "lazy": false,
      "sync": false,
      "expression": "function () {\n      vm._update(vm._render(), hydrating)\n    }",
      "id": 1,
      "active": true,
      "dirty": false,
      "deps": [
        {
          "id": 1,
          "subs": [
            null
          ]
        },
        {
          "id": 4,
          "subs": [
            null
          ]
        },
        {
          "id": 2,
          "subs": [
            null
          ]
        },
        {
          "id": 3,
          "subs": [
            null
          ]
        }
      ],
      "newDeps": [

      ],
      "depIds": {

      },
      "newDepIds": {

      }
    },
    "_inactive": false,
    "_isMounted": true,
    "_isDestroyed": false,
    "_isBeingDestroyed": false,
    "_events": {

    },
    "_watchers": [
      null
    ],
    "_data": {
      "a": 1,
      "b": 2,
      "c": null,
      "operator": "+"
    },
    "operator": "+",
    "c": null,
    "b": 2,
    "a": 1,
    "_vnode": {
      "tag": "div",
      "data": {
        "staticClass": "container"
      },
      "children": [
        {
          "tag": "h1",
          "children": [
            {
              "text": "Type 2 numbers and choose operation.",
              "elm": {

              },
              "raw": false,
              "isStatic": false,
              "isRootInsert": false,
              "isComment": false,
              "isCloned": false
            }
          ],
          "elm": {

          },
          "key": "__static__0",
          "raw": false,
          "isStatic": true,
          "isRootInsert": false,
          "isComment": false,
          "isCloned": false
        },
        {
          "text": " ",
          "elm": {

          },
          "raw": false,
          "isStatic": false,
          "isRootInsert": false,
          "isComment": false,
          "isCloned": false
        },
        {
          "tag": "form",
          "data": {
            "staticClass": "form-inline"
          },
          "children": [
            {
              "tag": "input",
              "data": {
                "directives": [
                  {
                    "name": "model",
                    "value": 1,
                    "expression": "a",
                    "modifiers": {
                      "number": true
                    }
                  }
                ],
                "staticClass": "form-control",
                "domProps": {
                  "value": "1"
                },
                "on": {
                  "input": {

                  }
                }
              },
              "elm": {
                "_prevClass": "form-control",
                "_value": "1"
              },
              "raw": false,
              "isStatic": false,
              "isRootInsert": false,
              "isComment": false,
              "isCloned": false
            },
            {
              "text": " ",
              "elm": {

              },
              "raw": false,
              "isStatic": false,
              "isRootInsert": false,
              "isComment": false,
              "isCloned": false
            },
            {
              "tag": "select",
              "data": {
                "directives": [
                  {
                    "name": "model",
                    "value": "+",
                    "expression": "operator",
                    "modifiers": {

                    }
                  }
                ],
                "staticClass": "form-control",
                "on": {
                  "change": {

                  }
                }
              },
              "children": [
                {
                  "tag": "option",
                  "children": [
                    {
                      "text": "+",
                      "elm": {

                      },
                      "raw": false,
                      "isStatic": false,
                      "isRootInsert": false,
                      "isComment": false,
                      "isCloned": false
                    }
                  ],
                  "elm": {

                  },
                  "key": "__static__1",
                  "raw": false,
                  "isStatic": true,
                  "isRootInsert": false,
                  "isComment": false,
                  "isCloned": false
                },
                {
                  "text": " ",
                  "elm": {

                  },
                  "raw": false,
                  "isStatic": false,
                  "isRootInsert": false,
                  "isComment": false,
                  "isCloned": false
                },
                {
                  "tag": "option",
                  "children": [
                    {
                      "text": "-",
                      "elm": {

                      },
                      "raw": false,
                      "isStatic": false,
                      "isRootInsert": false,
                      "isComment": false,
                      "isCloned": false
                    }
                  ],
                  "elm": {

                  },
                  "key": "__static__2",
                  "raw": false,
                  "isStatic": true,
                  "isRootInsert": false,
                  "isComment": false,
                  "isCloned": false
                },
                {
                  "text": " ",
                  "elm": {

                  },
                  "raw": false,
                  "isStatic": false,
                  "isRootInsert": false,
                  "isComment": false,
                  "isCloned": false
                },
                {
                  "tag": "option",
                  "children": [
                    {
                      "text": "*",
                      "elm": {

                      },
                      "raw": false,
                      "isStatic": false,
                      "isRootInsert": false,
                      "isComment": false,
                      "isCloned": false
                    }
                  ],
                  "elm": {

                  },
                  "key": "__static__3",
                  "raw": false,
                  "isStatic": true,
                  "isRootInsert": false,
                  "isComment": false,
                  "isCloned": false
                },
                {
                  "text": " ",
                  "elm": {

                  },
                  "raw": false,
                  "isStatic": false,
                  "isRootInsert": false,
                  "isComment": false,
                  "isCloned": false
                },
                {
                  "tag": "option",
                  "children": [
                    {
                      "text": "/",
                      "elm": {

                      },
                      "raw": false,
                      "isStatic": false,
                      "isRootInsert": false,
                      "isComment": false,
                      "isCloned": false
                    }
                  ],
                  "elm": {

                  },
                  "key": "__static__4",
                  "raw": false,
                  "isStatic": true,
                  "isRootInsert": false,
                  "isComment": false,
                  "isCloned": false
                }
              ],
              "elm": {
                "_prevClass": "form-control"
              },
              "raw": false,
              "isStatic": false,
              "isRootInsert": false,
              "isComment": false,
              "isCloned": false
            },
            {
              "text": "  ",
              "elm": {

              },
              "raw": false,
              "isStatic": false,
              "isRootInsert": false,
              "isComment": false,
              "isCloned": false
            },
            {
              "tag": "input",
              "data": {
                "directives": [
                  {
                    "name": "model",
                    "value": 2,
                    "expression": "b",
                    "modifiers": {
                      "number": true
                    }
                  }
                ],
                "staticClass": "form-control",
                "domProps": {
                  "value": "2"
                },
                "on": {
                  "keyup": {

                  },
                  "input": {

                  }
                }
              },
              "elm": {
                "_prevClass": "form-control",
                "_value": "2"
              },
              "raw": false,
              "isStatic": false,
              "isRootInsert": false,
              "isComment": false,
              "isCloned": false
            },
            {
              "text": " ",
              "elm": {

              },
              "raw": false,
              "isStatic": false,
              "isRootInsert": false,
              "isComment": false,
              "isCloned": false
            },
            {
              "tag": "button",
              "data": {
                "staticClass": "btn btn-primary",
                "attrs": {
                  "type": "submit"
                },
                "on": {
                  "click": {

                  }
                }
              },
              "children": [
                {
                  "text": "\n        Calculate\n      ",
                  "elm": {

                  },
                  "raw": false,
                  "isStatic": false,
                  "isRootInsert": false,
                  "isComment": false,
                  "isCloned": false
                }
              ],
              "elm": {
                "_prevClass": "btn btn-primary"
              },
              "raw": false,
              "isStatic": false,
              "isRootInsert": false,
              "isComment": false,
              "isCloned": false
            }
          ],
          "elm": {
            "_prevClass": "form-inline"
          },
          "raw": false,
          "isStatic": false,
          "isRootInsert": false,
          "isComment": false,
          "isCloned": false
        },
        {
          "text": " ",
          "elm": {

          },
          "raw": false,
          "isStatic": false,
          "isRootInsert": false,
          "isComment": false,
          "isCloned": false
        },
        {
          "tag": "h2",
          "children": [
            {
              "text": "Result: 1  +  2 = ",
              "elm": {

              },
              "raw": false,
              "isStatic": false,
              "isRootInsert": false,
              "isComment": false,
              "isCloned": false
            }
          ],
          "elm": {

          },
          "raw": false,
          "isStatic": false,
          "isRootInsert": false,
          "isComment": false,
          "isCloned": false
        },
        {
          "text": " ",
          "elm": {

          },
          "raw": false,
          "isStatic": false,
          "isRootInsert": false,
          "isComment": false,
          "isCloned": false
        },
        {
          "tag": "pre",
          "children": [
            {
              "text": "{\n  \"a\": 1,\n  \"b\": 2,\n  \"c\": null,\n  \"operator\": \"+\"\n}",
              "elm": {

              },
              "raw": false,
              "isStatic": false,
              "isRootInsert": false,
              "isComment": false,
              "isCloned": false
            }
          ],
          "elm": {

          },
          "raw": false,
          "isStatic": false,
          "isRootInsert": false,
          "isComment": false,
          "isCloned": false
        }
      ],
      "elm": {
        "_prevClass": "container"
      },
      "raw": false,
      "isStatic": false,
      "isRootInsert": true,
      "isComment": false,
      "isCloned": false
    },
    "_staticTrees": [
      null,
      null,
      null,
      null,
      null
    ],
    "$slots": {

    }
  },
  "_inactive": false,
  "_isMounted": true,
  "_isDestroyed": false,
  "_isBeingDestroyed": false,
  "operator": "+",
  "c": null,
  "b": 2,
  "a": 1
}
```
