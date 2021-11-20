
import Observer from "./observer.js";
import Compiler from './compiler.js';
export default class Vue {
  constructor(options) {
    //1、首先进行第一步，对传入参数做处理
    // 首先需要拿到当前的配置，拿到当前的数据给他保存起来
    // 2、我们我们知道 this.xxx 我们是直接能访问到的，所以我们还需要做一层代理，方便能直接访问到定义的变量
    this._init(options);
  }
  // 数据代理方法
  proxy(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          // 是不是对应到当前data 中的key 啊
          // 并且注意，这是形成了闭包
          return data[key];
        },
        set(val) {
          //直接赋值
          // 当然源码中，还有优化
          if (data[key] === val) return;
          // 否则才执行
          // 这其实就是细节
          data[key] = val;
        }
      });
    }
    );
  }
  _init(options) {
    this.$options = options;
    this.$data = options.data;
    this.proxy(this.$data);
    this.$observer = new Observer(this.$data, this.$render);
    if (this.$options.el) {
      this.$mount(this.$options.el);
    }
  }
  $mount(el) {
    const options = this.$options;
    let template = options.template;
    if (!options.render) {
      if (options.template) {
        // 在这里我们没有
      } else if (el) {
        template = this.getOuterHTML(el);
      }
      // 当前我们是不是已经拿到template
      options.render = new Compiler(template).render;
    }
  }
  // 他其实做的相当简单啊，他就是拿到当前的el下的所有的内容
  getOuterHTML(el) {
    // 我们需要先做一层判断，防止el直接是个dom
    if (el.outerHTML) {
      return el.outerHTML;
    } else {
      // 他就是个正常选择器
      const selected = document.querySelector(el);
      const container = document.createElement('div');
      //由于appendchild 自带移动能力所以必须要复制一份
      container.appendChild(selected.cloneNode(true));
      return container.innerHTML;
    }

  }
}

