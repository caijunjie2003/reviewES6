// ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这呗称为解构
const obj = {
  name: {
    xiaoname: {
      xiaoname2: "哈了哦",
    },
  },
};
const {
  // 连续解构 + 重命名，注意的是前面的解构的变量无法使用
  name: {
    xiaoname: { xiaoname2 },
  },
} = obj;
// console.log(xiaoname2);

// es6中可以从数组中提取值，按照对应位置，对变量进行赋值
// 这种写法属于 模式匹配，只要等号两边的模式相同，左边的变量就会呗赋予对应的值
let [a, b, c] = [1, 2, 3];
console.log(a, b, c);
