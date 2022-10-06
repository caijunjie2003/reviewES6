//** 本总结,参考阮一峰大神ES6入门  */

//Promise 是 异步编程的一种解决方式,比传统的解决方案---回调函数和事件更加强大和合理,它最早由社区提出,Es6将其统一了用法,原生提供了Promise对象
// Promise 简单来说就是一个容器,里面保存着某个未来才会结束的结果(通常是一个异步操作),从语法上说Promise是一个对象,可以用它来获取异步操作的消息,提供统一的API,各种异步操作都可以使用同样的方法进行处理

// Promise对象有2个特点
//1.对象的状态不受外界影响,promise对象代表一个异步操作,有三种状态:pending(进行中),fulfilled(已成功),rejected(已失败).只有异步操作的结果,才可以决定是当前是哪一种状态,任何其他操作都无法改变这个状态,
// 这也是promise 名字的又来,意味着承诺,表示其他手段无法更改
//2. 一旦状态改变,就不会再变,任何时候都可以得到这个结果,promise对象的状态改变只有两种情况:pending->fulfilled/ pending-rejected ,只要着两种情况其一发生,状态就凝固不会在变,这时就称为 resolved(已定性),
// 再通过对promise对象添加会回调函数,也会立即得到这个结果,与事件处理异步编程完全不同,不需要等待触发时机,随时都可以得到异步操作的结果

// 好处: 可以将异步操作以同步操作的流程表达出来,避免层层嵌套的回调函数,并且提供了统一的Api,使得控制异步操作变得更为容易
// 缺点:无法取消Promise,一旦创建它就会立即执行,无法中途取消,不设置回调函数,promise内部抛出的错误不会反应到外部,处于pending状态时,无法得知到了哪一阶段

// Promise构造函数接收一个函数作为参数,改函数的两个参数分别是 : resolve,reject
// resolve:function : 将Promise对象的状态从pending -> fulfilled成功,将异步操作的结果作为参数抛出去
// reject: 将Promise对象的状态 从pending ->rejected 失败,再异步操作失败时调用,将异步操作的草屋,作为参数抛出去
const fun1 = (val) => {
  return new Promise((resolve, reject) => {
    if (val) {
      resolve("成功");
    } else {
      reject(new Error("error,错误"));
    }
  });
};

// Promise实例生成后,可以使用then方法分别指定 resolve /rejected状态的回调函数,但是一般不建议这样写
// 分别接收一个参数为Promise对象resolve / rejecet抛出的异步操作结果
// fun1("123").then(
//   (res) => {
//     console.log(res);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

// fun1("123")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// 如果p1 和 p2 都是Promiuse 实例,但是p2的resolve方法将p1作为参数,那么p1的状态就会传递给p2,也就是说p1决定了p2
// 的状态,p2会在p1的状态为resolved/rejected时立即执行
// const p1 = new Promise(function (resolve, reject) {});

// const p2 = new Promise(function (resolve, reject) {
//   resolve(p1);
// });

// const p1 = new Promise(function (resolve, reject) {
//   setTimeout(() => reject(new Error("fail")), 3000);
// });

// const p2 = new Promise(function (resolve, reject) {
//   // 由于返回的是p1,所以自己本身的状态就会无效,由p1的状态决定p2
//   setTimeout(() => resolve(p1), 1000);
// });

// p2.then((result) => console.log(result)).catch((error) => console.log(error));

// new Promise((resolve, reject) => {
//   // resolve/reject 并不会终结promise的参数函数的执行,一般情况下我们在resolve,reject promsie的使命就完成了,所以一般都会加上return
//  return resolve(1);
//   console.log(1);
// }).then((res) => {
//   console.log(res);
// });

// 如何解决回调地域
// new Promise((resolve, reject) => {
//   resolve(1);
// })
//   .then((res) => {
//     // then方法的返回是一个新的Promise实例,因此可以采用链式写法,可以解决回调地域
//     return { a: "121" };
//   })
//   .then(
//     (res) => {
//       console.log("resolved", res);
//     },
//     // 一般不建议怎么写,触发需要单独处理某个promise抛出的错误处理逻辑十分复杂
//     (err) => {
//       console.log("reject", err);
//     }
//   )
//   .catch((err) => {
//     //   前面所有promise中,任意一个抛出的错误,都会被最后一个catch捕获
//   })
// fi na lly绿
//   .finally(() => {
//     //   finally 方法用于指定不管promise对象最后状态如何,都会执行的操作
//   });

const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return { val: id };
});
// console.log(promises)
// Promise().all()用于将多个Promise实例,包装成一个新的Promise实例,如果传的不是promise对象,会调用Promise.resolve()方法,将参数转为Promise对象
// 合成的promise新实例的状态由 数组中的promise决定,1.状态都为fulfilled成功,才会变成fulfilled,所有fulfilled的返回值组成一个数组,传递给then接收2.其中一个为rejected,就为rejected,第一个reject的实例的返回值会被catch接收
Promise.all(promises)
  .then(function (posts) {
    // ...
    console.log("resolved", posts);
  })
  .catch(function (reason) {
    // ...
    console.log(reason);
  });

//   Promise().race()
// 和all一样,但是不同的是,但有一个实例先改变状态,就会跟着改变,那个率先改变状态的返回值,就会传递给新包装的实例的回调函数

// Promise.allSettled()
// 有时候,我们希望等一组异步操作都结束了,不管每一个操作是成功还说失败,再进行下一步操作,all和race都无法满足,音译:都解决了~

// Promise.resolve()
// 有时,我们需要将现有对象转为Promise对象,Promise.resolve就起到这个作用
// Promise.resolve('foo')===>等价于 new Promsie((resolve,rejecet)=>resolve('foo'))
//1.参数是一个Promise对象,则原封不动的返回这个实例
//2.参数是一个具有then属性的对象,Promise.resolve()会将这个对象转为Promise对象,然后立即执行这个对象的then方法
//3.如果是一个原始值||不具有then方法,则返回一个新的Promise对,状态为resolveed
// 4.不带有任何参数,就会得到一个resolved状态的Promise对象

// Promsie.reject()
// 返回一个新的Promiuse实例,该实例状态为rejected
