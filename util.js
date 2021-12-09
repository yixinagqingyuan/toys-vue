
import { makeAttrsMap, makeMap, extend, getAndRemoveAttr } from './tools.js';
// 判断是不是普通自封闭标签
export const isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// 创建ast 节点
export function createASTElement(
  tag,
  attrs,
  parent,
) {
  return {
    type: 1,
    tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent,
    children: []
  };
}
// 处理vfor 的情况
export function processFor(el) {
  let exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    const res = parseFor(exp);
    if (res) {
      extend(el, res);
    }
  }
}
export function
