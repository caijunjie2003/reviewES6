// 1.Es6 新增的 let 和 const 命令，用法类似于var，但是所声明的变量，只在let/const命令所在的代码块有效

var a = 100; //全局作用域

let b = 100; //虽然是块级作用域，但是在全局声明，所以是全局作用域

// const c //const 声明的变量必须赋初始值，并且如果是基本数据类型的话，不能再修改了

function ad() {
  let b = 200; //局部变量，块级作用域
  const c = 300;
}
{
  let a = 10; //块级作用域 === let const 声明的变量只再它所有的代码块有效
  //   var b = 1;
  var abcv = 100;
  console.log(a);
}
console.log(a);
console.log(abcv);

var arr = [];
// for (var i = 0; i < 10; i++) {
//   //   console.log(i);
//   arr[i] = function () {
//     return i; //由于i是全局变量，在全局范围都有效，所有再每次呗赋值的时候，都会修改局部作用域中的值
//   };
// }
// console.log(i, arr[6]()); //10,容易造成内存泄露，只需要再代码块中使用，而var声明的却变为了全局变量

let arr2 = [];
for (let i = 0; i < 10; i++) {
  arr2[i] = function () {
    return i; //let拥有单独的块级作用域，它是局部变量，只作用域当前的代码块中，每个函数都是一个独一的代码块，每次循环都会重新声明一个let变量只作用域当前代码块中
  };
}
// console.log(i); //i 是undefined 未定义的,因为是作用域代码块中
console.log(arr2[6]()); //6
