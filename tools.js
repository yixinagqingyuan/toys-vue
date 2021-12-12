// 提取attr 中的重要信息，其他的都不重要可以舍弃
export function 
makeAttrsMap(attrs) {
  const map = {};
  for (let i = 0, l = attrs.length; i < l; i++) {
    map[attrs[i].name] = attrs[i].value;
  }
  return map;
}

// 创建一个map retrun 一个函数，来判断在当前函数中是否能找到， 我们在工作做也可以使用这个套路，能高度解耦
export function makeMap(
  str,
) {
  const map = Object.create(null);
  const list = str.split(',');
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return val => map[val];
}


/**
 * 将属性混合到目标对象中
 */
export function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
}
// 获取当前attr对应的值
export function getAndRemoveAttr(
  el,
  name
) {
  let val;
  if ((val = el.attrsMap[name]) != null) {
    const list = el.attrsList;
    for (let i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break;
      }
    }
  }
  return val;
}