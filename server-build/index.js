/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ignore-styles */ \"ignore-styles\");\n\n__webpack_require__(/*! @babel/register */ \"@babel/register\")({\n  ignore: [/(node_modules)/],\n  presets: ['@babel/preset-env', '@babel/preset-react']\n});\n\n__webpack_require__(/*! ./server */ \"./server/server.js\");\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/parthchugh/wedlite-frontend/server/server.js: Support for the experimental syntax 'jsx' isn't currently enabled (35:5):\\n\\n\\u001b[0m \\u001b[90m 33 | \\u001b[39m\\u001b[36mconst\\u001b[39m \\u001b[33mNoMatchPage\\u001b[39m \\u001b[33m=\\u001b[39m () \\u001b[33m=>\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m 34 | \\u001b[39m  \\u001b[36mreturn\\u001b[39m (\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 35 | \\u001b[39m    \\u001b[33m<\\u001b[39m\\u001b[33mLayout\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m    \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 36 | \\u001b[39m      showSearchBar\\u001b[33m=\\u001b[39m{\\u001b[36mfalse\\u001b[39m}\\u001b[0m\\n\\u001b[0m \\u001b[90m 37 | \\u001b[39m    \\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 38 | \\u001b[39m      \\u001b[33m<\\u001b[39m\\u001b[33mdiv\\u001b[39m style\\u001b[33m=\\u001b[39m{{flex\\u001b[33m:\\u001b[39m \\u001b[35m1\\u001b[39m\\u001b[33m,\\u001b[39mheight\\u001b[33m:\\u001b[39m window\\u001b[33m.\\u001b[39minnerHeight\\u001b[33m,\\u001b[39m display\\u001b[33m:\\u001b[39m \\u001b[32m'flex'\\u001b[39m\\u001b[33m,\\u001b[39malignItems\\u001b[33m:\\u001b[39m \\u001b[32m'center'\\u001b[39m \\u001b[33m,\\u001b[39m justifyContent\\u001b[33m:\\u001b[39m \\u001b[32m'center'\\u001b[39m}}\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\nAdd @babel/preset-react (https://git.io/JfeDR) to the 'presets' section of your Babel config to enable transformation.\\nIf you want to leave it as-is, add @babel/plugin-syntax-jsx (https://git.io/vb4yA) to the 'plugins' section to enable parsing.\\n    at Parser._raise (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:757:17)\\n    at Parser.raiseWithData (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:750:17)\\n    at Parser.expectOnePlugin (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:8849:18)\\n    at Parser.parseExprAtom (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:10164:24)\\n    at Parser.parseExprSubscripts (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9688:23)\\n    at Parser.parseMaybeUnary (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9668:21)\\n    at Parser.parseExprOps (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9538:23)\\n    at Parser.parseMaybeConditional (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9511:23)\\n    at Parser.parseMaybeAssign (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9466:21)\\n    at Parser.parseParenAndDistinguishExpression (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:10306:28)\\n    at Parser.parseExprAtom (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:10039:21)\\n    at Parser.parseExprSubscripts (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9688:23)\\n    at Parser.parseMaybeUnary (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9668:21)\\n    at Parser.parseExprOps (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9538:23)\\n    at Parser.parseMaybeConditional (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9511:23)\\n    at Parser.parseMaybeAssign (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9466:21)\\n    at Parser.parseExpression (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9418:23)\\n    at Parser.parseReturnStatement (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:11570:28)\\n    at Parser.parseStatementContent (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:11251:21)\\n    at Parser.parseStatement (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:11203:17)\\n    at Parser.parseBlockOrModuleBlockBody (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:11778:25)\\n    at Parser.parseBlockBody (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:11764:10)\\n    at Parser.parseBlock (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:11748:10)\\n    at Parser.parseFunctionBody (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:10751:24)\\n    at Parser.parseArrowExpression (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:10720:10)\\n    at Parser.parseParenAndDistinguishExpression (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:10334:12)\\n    at Parser.parseExprAtom (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:10039:21)\\n    at Parser.parseExprSubscripts (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9688:23)\\n    at Parser.parseMaybeUnary (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9668:21)\\n    at Parser.parseExprOps (/Users/parthchugh/wedlite-frontend/node_modules/@babel/core/node_modules/@babel/parser/lib/index.js:9538:23)\");\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "@babel/register":
/*!**********************************!*\
  !*** external "@babel/register" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/register\");\n\n//# sourceURL=webpack:///external_%22@babel/register%22?");

/***/ }),

/***/ "ignore-styles":
/*!********************************!*\
  !*** external "ignore-styles" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ignore-styles\");\n\n//# sourceURL=webpack:///external_%22ignore-styles%22?");

/***/ })

/******/ });