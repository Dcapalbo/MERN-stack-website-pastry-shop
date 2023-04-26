"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistor = exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _reduxPersist = require("redux-persist");

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _dataSweetSlice = _interopRequireDefault(require("./data-sweet-slice"));

var _dataSelectSlice = _interopRequireDefault(require("./data-select-slice"));

var _dataUserSlice = _interopRequireDefault(require("./data-user-slice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootReducer = (0, _toolkit.combineReducers)({
  dataSweets: _dataSweetSlice["default"].reducer,
  dataType: _dataSelectSlice["default"].reducer,
  userLogin: _dataUserSlice["default"].reducer
});
var persistConfig = {
  key: "root",
  storage: _storage["default"]
};
var persistedReducer = (0, _reduxPersist.persistReducer)(persistConfig, rootReducer);
var store = (0, _toolkit.configureStore)({
  reducer: persistedReducer
});
exports.store = store;
var persistor = (0, _reduxPersist.persistStore)(store);
exports.persistor = persistor;