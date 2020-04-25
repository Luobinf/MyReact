// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"lib/MyReact.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 
 * @param {String} tag 
 * @param {Object} attrs 
 * @param  {String | Object} children 
 */
function createElement(tag, attrs) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    attrs: attrs,
    children: children
  };
}

var Component = function Component() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Component);

  this.props = props;
  this.state = {};
};

var _default = {
  createElement: createElement,
  Component: Component
};
exports.default = _default;
},{}],"lib/MyReactDOM.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MyReact = _interopRequireDefault(require("./MyReact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var MyReactDOM = {
  render: render,
  setAttribute: setAttribute,
  renderComponent: renderComponent
};

function createDomFromVnode(vnode) {
  //vnode可能为空则直接返回
  if (!vnode) {
    return;
  }

  if (Array.isArray(vnode)) {
    var fragment = document.createDocumentFragment();
    vnode.forEach(function (node) {
      var dom = createDomFromVnode(node);
      fragment.append(dom);
    });
    return fragment;
  }

  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(vnode);
  }

  if (_typeof(vnode) === 'object') {
    if (typeof vnode.tag === 'function') {
      var component = createComponent(vnode.tag, vnode.attrs); //创建一个组件

      renderComponent(component);
      return component.$root;
    } else {
      var dom = document.createElement(vnode.tag);
      setAttribute(dom, vnode.attrs);

      if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        vnode.children.map(function (vnodeChild) {
          _render(vnodeChild, dom);
        });
      }

      return dom;
    }
  }
}

function createComponent(constructor, attrs) {
  //创建组件,设置组件属性
  var component; //如果是用class创建的

  if (constructor.prototype instanceof _MyReact.default.Component) {
    component = new constructor(attrs);
  } else {
    //如果是用function创建的
    component = new _MyReact.default.Component(attrs);
    component.constructor = constructor; //constructor重新指向原来的构造函数

    component.render = function () {
      console.log(attrs);
      return this.constructor(attrs); //调用父类的constructor方法使得子类有props和state属性
    };

    console.log(component);
  }

  return component;
}

function _render(vnode, container) {
  //vnode可能为空字符串,null,undefined等
  if (!vnode) {
    return;
  }

  var dom = createDomFromVnode(vnode);
  return container.append(dom);
}

function renderComponent(component) {
  var vnode = component.render();
  console.log('组件返回的vnode', vnode);
  var dom = createDomFromVnode(vnode); //通过虚拟DOM来创建dom

  if (component.$root && component.$root.parentNode) {
    component.$root.parentNode.replaceChild(dom, component.$root);
  }

  component.$root = dom;
}

function render(vnode, container) {
  console.log(vnode, container); //当vnode为class组件时，vnode = {tag: f,attrs:null,children: []}

  container.innerHTML = '';

  _render(vnode, container);
} //给DOM元素设置属性


function setAttribute(dom, attrs) {
  if (!attrs) {
    return;
  }

  for (var key in attrs) {
    if (/^on/.test(key)) {
      dom[key.toLowerCase()] = attrs[key];
    } else if (key === 'style') {
      //这样直接赋值的话，style属性和onclick事件就没法绑定,需要做一个判断
      Object.assign(dom.style, attrs[key]);
    } else {
      dom[key] = attrs[key];
    }
  }
}

var _default = MyReactDOM;
exports.default = _default;
},{"./MyReact":"lib/MyReact.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _MyReact = _interopRequireDefault(require("./lib/MyReact"));

var _MyReactDOM = _interopRequireDefault(require("./lib/MyReactDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var name = 'hello world!!!';
var number = 200;

function handleClick(e) {
  console.log('事件对象', e);
} //JSX会转换成虚拟DOM，虚拟DOM是一个对象，每一个虚拟DOM对象都包含tag，attrs，children属性。


var htmlDOM = _MyReact.default.createElement("div", {
  className: 'wrapper'
}, name, " ", number, _MyReact.default.createElement("button", {
  onClick: handleClick,
  style: {
    color: 'red'
  }
}, "\u70B9\u51FB"), _MyReact.default.createElement(App, null)); // console.log(htmlDOM)  //这个最后结果是React元素也即虚拟DOM


var hobbies = ['打球', '吃饭', '打豆豆'];

function Hobby(props) {
  return _MyReact.default.createElement("div", null, "\u6211\u7684\u5174\u8DA3\u662F", _MyReact.default.createElement("ul", null, props.hobbies.map(function (hobby) {
    return _MyReact.default.createElement("li", null, hobby);
  })));
}

var Job =
/*#__PURE__*/
function (_MyReact$Component) {
  _inherits(Job, _MyReact$Component);

  function Job() {
    _classCallCheck(this, Job);

    return _possibleConstructorReturn(this, _getPrototypeOf(Job).apply(this, arguments));
  }

  _createClass(Job, [{
    key: "render",
    value: function render() {
      return _MyReact.default.createElement("div", null, "\u524D\u7AEF\u5F00\u53D1");
    }
  }]);

  return Job;
}(_MyReact.default.Component);

var App =
/*#__PURE__*/
function (_MyReact$Component2) {
  _inherits(App, _MyReact$Component2);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return _MyReact.default.createElement("div", {
        className: "title"
      }, _MyReact.default.createElement("span", null, "\u4F60\u597D"), _MyReact.default.createElement("button", {
        onClick: this.alert.bind(this)
      }, "\u70B9\u51FB\u6253\u5370\u5185\u5BB9"), _MyReact.default.createElement(Job, {
        className: "job"
      }), _MyReact.default.createElement(Hobby, {
        hobbies: hobbies
      }));
    }
  }, {
    key: "alert",
    value: function alert() {
      console.log(this);
    }
  }]);

  return App;
}(_MyReact.default.Component);

_MyReactDOM.default.render(_MyReact.default.createElement(App, null), document.getElementById('root')); //此时App就是一个组件
//上面相当于
//MyReactDOM.render(MyReact.createElement(App, null), document.getElementById('root'));
// MyReactDOM.render(htmlDOM,document.getElementById('root'))
//Myreact.createElement函数的第三个参数开始都是第一个参数的子节点。
//Myreact.createElement('div',{className: 'title'},name,number,Myreact.createElement.createElement(...))
//babel通过调用React.createElement函数将JSX语法转换成下面这个样子。
//将上面的JSX转换为React.createElement函数的参数 tag，attrs，children
//babel的jsx转换插件会将jsx转换成下面的这种形式
//  let element = {
//     tag: 'div',
//     attrs: {
//         className: 'wrapper'
//     },
//     children: [
//         'hello world!!!', '',200,{
//         tag: 'button',
//         attrs: {
//             onclick: handleClick,
//             style: {
//                 color: 'red'
//             }
//         },
//         children: ['点击']
//     }]
// }
//调用render函数将虚拟DOM渲染到页面上去
// render(htmlDOM,document.getElementById('root'))
// render(MyReact.createElement(App, null),document.getElementById('root'))
// function render(vnode,container) {
//     console.log(vnode)
//     console.log(1)
//     if(typeof vnode === 'string' || typeof vnode === 'number') {
//         let dom = document.createTextNode(vnode)
//         container.append(dom)
//     }
//     if(typeof vnode === 'object') {
//         if( typeof vnode.tag === 'function') {
//             console.log(vnode.tag)  //是一个构造函数，则创建一个组件
//             let component = createComponent(vnode.tag)
//             console.log('test')
//         }
//         let dom = document.createElement(vnode.tag,vnode.attrs)
//         // setAttribute(dom,vnode.attrs)
//         if(Array.isArray(vnode.children) && vnode.children.length > 0) {
//             vnode.children.forEach( child => {
//                 //递归
//                 render(child,dom)
//             })
//         }
//         container.append(dom)
//     }
// }
// function createComponent(constructor,attrs) {
//     let component = new constructor(attrs)
//     console.log(component)
//     console.log(2020)
// }
},{"./lib/MyReact":"lib/MyReact.js","./lib/MyReactDOM":"lib/MyReactDOM.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55315" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/简易实现React.e31bb0bc.js.map