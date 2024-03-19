"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const _ObjectPool = class {
  /**
   * 构造函数
   */
  constructor() {
    __publicField(this, "_objs");
    this._objs = new Array();
  }
  /**
   * 放回一个对象
   * @param obj
   */
  pushObj(obj) {
    this._objs.push(obj);
  }
  /**
   * 取出一个对象
   * @returns {*}
   */
  popObj() {
    if (this._objs.length > 0) {
      return this._objs.pop();
    } else {
      return null;
    }
  }
  /**
   * 清除所有缓存对象
   */
  clear() {
    while (this._objs.length > 0) {
      this._objs.pop();
    }
  }
  /**
   * 取出一个对象
   * @param ref Class
   * @return Object
   *
   */
  pop(ref) {
    if (!_ObjectPool._content[ref]) {
      _ObjectPool._content[ref] = [];
    }
    var list = _ObjectPool._content[ref];
    if (list.length) {
      return list.pop();
    } else {
      return new ref();
    }
  }
  /**
   * 放入一个对象
   * @param obj
   *
   */
  push(obj) {
    if (obj == null) {
      return false;
    }
    var ref = obj.constructor;
    if (!_ObjectPool._content[ref]) {
      return false;
    }
    _ObjectPool._content[ref].push(obj);
    return true;
  }
  /**
   * 清除所有对象
   */
  clearAll() {
    _ObjectPool._content = {};
  }
  /**
   * 清除某一类对象
   * @param ref Class
   * @param clearFuncName 清除对象需要执行的函数
   */
  clearClass(ref, clearFuncName = null) {
    var list = _ObjectPool._content[ref];
    while (list && list.length) {
      var obj = list.pop();
      if (clearFuncName) {
        obj[clearFuncName]();
      }
      obj = null;
    }
    _ObjectPool._content[ref] = null;
    delete _ObjectPool._content[ref];
  }
  /**
   * 缓存中对象统一执行一个函数
   * @param ref Class
   * @param dealFuncName 要执行的函数名称
   */
  dealFunc(ref, dealFuncName) {
    var list = _ObjectPool._content[ref];
    if (list == null) {
      return;
    }
    var i = 0;
    var len = list.length;
    for (i; i < len; i++) {
      list[i][dealFuncName]();
    }
  }
};
let ObjectPool = _ObjectPool;
__publicField(ObjectPool, "_content", {});
var objectPool = new ObjectPool();
exports.objectPool = objectPool;
