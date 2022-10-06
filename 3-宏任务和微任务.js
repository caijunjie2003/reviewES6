// javascript是一门单线程语言，为了不堵塞进程，每当任务进入执行栈,都会被分为同步任务和异步任务  异步任务又被分为 宏任务和微任务
// JS执行时同步和异步任务分别进入不同的执行环境,同步任务进入主线程,异步任务进入任务队列,不同的异步任务会推入不同的任务队列,比如 settimeout,setInterval,AJAX,dom事件,js整体进行宏任务队列,
// Promise的then和catch,async,await等进入微任务队列
// 1.当同步代码执行完毕后,主程序执行栈变空,执行异步任务
//2.主线程会检查微任务是否为空,如果不为空,为便利队列内所有的微任务将其执行完,清空微任务后,再去检查宏任务,如果微任务为空,直接取找宏任务执行
//3.主线程遍历宏任务队列,执行队列中的第一个宏仁物,执行过程中如果遇到了宏任务或者微任务,则继续将他们推入到对应的任务对立,每执行完一次宏任务,都要遍历执行一次微任务队列,将其清空
// 4.执行渲染操作,更新视图
//5.开始下一次的事件循环,重复上述步骤,直到主线程队列和任务队列清空




// 宏任务settimeout,setInterval,Ajax,DOM事件
// 微任务:promise.then/.catch,async/awiat,process.nextTick(node.js环境)
// 每当执行完一个宏任务并且没有微任务和同步任务需要执行后,主线程就读取行下一个宏任务

//script,
//宏任务：
// 微任务：
//h1
// setTimeout(function () {
//   console.log("定时器开始啦"); //4
// });
// //promise一旦被定义就会立即执行，primse并不是完全的同步代码，执行reject或者resolve回调的时候是异步操作，会将.then和.catch放入微任务队列中
// new Promise(function (resolve) {
//   console.log("马上执行for循环啦"); //1
//   for (var i = 0; i < 10000; i++) {
//     i == 99 && resolve();
//   }
//   //微任务1
// }).then(function () {
//   console.log("执行then函数啦"); //3
// });
// //2.
// console.log("代码执行结束");

console.log("1"); //1.
//异步：宏1
setTimeout(function () {
  console.log("2"); //5
  //   微1
  process.nextTick(function () {
    console.log("3"); // 7 
  });
  //   同步
  new Promise(function (resolve) {
    console.log("4"); //6
    resolve(); //微2
  }).then(function () {
    console.log("5"); //8
  });
});
// process.nextTick()从技术上不是事件循环的一部分，任务时候再给定的阶段都可以调用
// process.nextTick() 回调将在事件循环继续之前解析(定义一个动作，并且让这个动作在下一个事件轮询(下一个宏任务之前)的时间点上执行)
//异步:微任务1
process.nextTick(function () {
  console.log("6"); //3
});
// 同步
new Promise(function (resolve) {
  console.log("7"); //2.
  resolve();
  //   微任务2
}).then(function () {
  console.log("8"); //4
});
// 宏任务2
setTimeout(function () {
  console.log("9"); //9
  //   微1
  process.nextTick(function () {
    console.log("10"); //11
  });
  //   同步
  new Promise(function (resolve) {
    console.log("11"); //10
    resolve(); //微2
  }).then(function () {
    console.log("12"); //12
  });
});
//1,7,6,8,2,4,3,5,9,11,10,12
