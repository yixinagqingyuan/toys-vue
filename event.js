// 他主要实现两个功能
//1、实现响应式系统
// 2、基于发布订阅模式

// 在讲解之前呢，我们先了解一下什么叫发布订阅模式

// 所谓发布订阅模式就是实现一对多的关系，当一个对象的值改变时，那么依赖的对象的值都发生改变,当然上面他只是个现象，那么他的本质其实是利用数组的能力，实现依赖项的改变
// 好接下来我们举个例子，我们实现一个事件系统
class _Event {
  constructor() {
    // 我们需要有一个对象,来存储订阅者
    this.clienlist = {};
  }
  //添加订阅者
  addlisten(key, fn) {
    // 先判断当前的对象里面有没有这个订阅者
    if (!this.clienlist[key]) {
      //如果没有，我添加一个
      this.clienlist[key] = [];
    }
    // 如果有，给回调事件放进去
    this.clienlist[key].push(fn);
  }
  // 发布某一个订阅
  trigger(key) {
    if (this.clienlist[key]) {
      this.clienlist[key].forEach(fn => {
        fn();
      });
    }
  }
}
// 这样是是不是通知对应的订阅者去做他们的事情了
const event = new _Event();
event.addlisten('change', () => {
  console.log(11111);
});
// 这样是不是就发布了
event.trigger('change');
// 好，以上就是我们简单的发布订阅模式，理解了这个以后，就可以开始vue 的编写之路了