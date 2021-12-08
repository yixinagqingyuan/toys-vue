
import { makeAttrsMap, makeMap } from './tools.js';
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

