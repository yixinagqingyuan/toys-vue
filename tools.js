// 提取attr 中的重要信息，其他的都不重要可以舍弃
export function makeAttrsMap(attrs) {
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
