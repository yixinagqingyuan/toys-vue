
import { unicodeRegExp } from './regExp.js';
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);// 匹配开始标签
const startTagClose = /^\s*(\/?)>/; //匹配开始标签的结束就是'>'
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配普通的属性
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;// 匹配vue 内置的一些指令attribute 和属性
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
    const stack = [];// 
    let root; // 存储ats 节点的root
    let currentParent;
    this.parseHTML({
      chars(text, start, end) {
        console.log(text, start, end);
      }
    });
    return root;
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
      let textEnd = last.indexOf('<');
      if (textEnd === 0) {
        // 如果遇见开始标签
        const startTagMatch = this.parseStartTag();
        //如果找到头标签
        if (startTagMatch) {
          // 如果找到了，那么就压入栈中等待匹配，利用栈的结构，能找出匹配的接口，// 如果有兴趣可以去刷有效的括号跟这个原理类似
          stack.push(startTagMatch);
          // 并且跳出循环
          continue;
        }
      }
      let text, rest, next;
      // 这时候的操作是为了去除标签之间的空格
      if (textEnd >= 0) {
        rest = this.html.slice(textEnd);
        // 源码中有很多判断，比如包含< 符号有可能是个文本所以需要剔除，在这里不作为我们做流程处理
        text = this.html.substring(0, textEnd);
      }
      //小于0 那么就只可能是-1 也就是通篇找不到一个标签了，那么就只可能是个文本
      if (textEnd < 0) {
        // 拿到文本部分
        rest = html.slice(textEnd);

      }
      // 这些空节点需要删除掉，所以前移字符串
      if (text) {
        this.advance(text.length);
      }
      // 此时就需要处理文本内容，变成ast 
      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    }
  }
  parseStartTag() {
    const start = this.html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
        start: this.index
      };
      this.advance(start[0].length);
      let end, attr;
      // 通过一个while 取到所有的普通属性，和动态属性
      while (!(end = this.html.match(startTagClose)) && (attr = this.html.match(dynamicArgAttribute) || this.html.match(attribute))) {
        attr.start = this.index;
        this.advance(attr[0].length);
        attr.end = this.index;
        match.attrs.push(attr);
      }
      if (end) {
        this.advance(end[0].length);
        match.end = this.index;
        // 处理attr内容
        const l = match.attrs.length;
        const attrs = new Array(l);
        for (let i = 0; i < l; i++) {
          const args = match.attrs[i];
          const value = args[3] || args[4] || args[5] || '';
          attrs[i] = {
            name: args[1],
            //源码中做了一些兼容处理，比如转义符啥的，我们这里暂不处理
            value
          };
        }
        match.attrs = attrs;
        return match;
      }
    }
  }
  // 定义辅助函数,改变在模板中的位置
  advance(n) {
    this.index += n;
    // 截取后半部分的html
    this.html = this.html.substring(n);
  }

};
