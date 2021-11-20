
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
export default class Compiler {
  constructor(template) {
    // 保存当前模板字符串
    this.html = template;
    this.index = 0;
    const ast = this.parse();
    this.optimize(ast);
    this.render = this.generate(ast);
  }
  // parse 转换为ast
  parse() {
    const stack = [];
    return this.parseHTML({

    });
  }
  // 做一些优化，达到可以生成代码的地步
  optimize() { }
  // 生成代码
  generate() {
  }
  // 咱也效仿大佬们来个访问者模式
  //源码中传入对应的配置，实现两个文件对象之间的通信
  parseHTML(options) {
    const stack = [];
    let last, lastTag;
    while (this.html) {
      //源码中利用做了很多兼容处理，比如处理注释内容，处理Doctype，处理条件注释，我们主要为了理解，暂不处理
      last = this.html;
    }
  }
  // 定义辅助函数,改变在模板中的位置
  function advance(n) {
  index += n;
  // 截取后半部分的html
  this.html = this.html.substring(n);
}

};
