
const comment = /^<!\--/;
export default class Compiler {
  constructor(template) {
    const ast = this.parse(template);
    this.optimize(ast);
    this.render = this.generate(ast);
  }
  // parse 转换为ast
  parse(template) {
    console.log(template);
    // 这里就是编译原理的知识，我们使用状态机去解析字符串
    for (let s of template) {
      console.log(s);
    }
  }
  // 做一些优化，达到可以生成代码的地步
  optimize() { }
  // 生成代码
  generate() {
  }
  // 咱也效仿大佬们来个访问者模式
  parseHTML(html, options) {
    const stack = [];
    while (html) {
      
    }
  }
};
