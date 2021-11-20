

import Dep from './dep.js';
export default class Observer {
  constructor(data) {
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      this.defineReactive(data, keys[i]);
    }

  }
  // 去做响应式
  defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        // 保存数据

      },
      set: function() {
        // 通知更新
      }
    });
  }
}