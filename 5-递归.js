//递归的概念:就是函数调用函数本身,递归一定要有出口和入口

// function fun1() {
//   console.log("套娃,草你妈");
//   fun1(); //直接崩溃,死循环,没有结束条件
// }
// fun1();

// 打印N次结果
// let i = 0;
// function fun1(un) {
//   i++;
//   //   出口,结束条件
//   if (i < un) {
//     fun1();
//   }
//   console.log("hello word");
// }
// fun1(5);




// 实现 n个数字的和 n=5--->1+2+3+4+5
// function fun2(un) {
//   // 减到
//   if (un === 1) {
//     return 1;
//   }
//   //   逆向思维:将传递的数字进行累减
//   return un + fun2(un - 1);
//   //5 + 4 + 3 + 2 + 1//先不执行相加,一直套娃,最后相加
// }
// fun2(3);

// 求一个数字,各个位数的和
function fun3(un) {
  if (un < 10) {
    return un;
  }
  //  un % 10 第一位数(取余)
  return (un % 10) + fun3(un / 10);
}
fun3(312);
//求和1-100
// function sun(n) {}
