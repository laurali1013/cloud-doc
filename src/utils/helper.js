//将数组转成对象
/*
{
  1: {id: "1", title: "first post", body: "*should be aware of this*", createdAt: 1563762965704}
  2: {id: "2", title: "second post", body: "## this is the title", createdAt: 1563762965704}
  3: {id: "3", title: "你好世界", body: "### 这是另外一个小标题欧", createdAt: 1563762965704}
}
*/
export const flattenArr = (arr) => {
    return arr.reduce((map, item) => {
        map[item.id] = item;
        return map;
    }, {});
}
//将对象转换成数组
export const objToArr = (obj) => {
    return Object.keys(obj).map(key => obj[key]);
}