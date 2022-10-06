function asyncFn() {
  console.log("这一段业务逻辑，希望在最后执行");
}
// node.js也是单线程的,在它的事件轮询过程中,同一时间节点只会处理一个时间,再每个事件节点上,系统只会处理一个事件,即使你的电脑有多个cup核心,也无法同事并行的处理多个事件,这使得node.js适合处理 I/O型的应用,不适合那种CPU运算下

// 再这种处理模式下,process.nextTic()的意思就是定义一个动作,在下一个事件轮询(下一个宏任务执行前)的时间节点上运行(可以理解为异步)
process.nextTick(asyncFn);
console.log("同步1");
console.error("同步2");
setTimeout(() => {
  console.log("异步1");
}, 100);
// 输出:msg2,msg,这一段业务逻辑，希望在最后执行
