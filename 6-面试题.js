// 1.你能说一下 cookie 和 Storage(localStorage,sessionStoreage)的认识和区别吗？
// 1.session是一个后端存储空间

// session 和 storage 的区别

//1.存储数据的大小
//  1.session只有4kb大小
//  2.Storage是4M

//2.存储数据的格式
// 1.session是字符串格式的
// 2.Storage是以键值对的格式

//3.通讯相关
//  1.seesion会在请求的时候自动携带
//  2.Storage不会自动携带
//4.时效相关
//  1.session可以设置时效
//  2.Storage：LocalStorage是永久存储，SeesionStorage是会话存储，当窗口关闭或者页面关闭的时候就会呗清除
//5.操作相关
//  1.session操作麻烦，没有对应的API进行操作，前后端都可以操作
//  2.storage有API，只能前端操作


// localStorage和SeesionStorage的区别

// 1 通讯相关
//  Localtorage 可以在任意页面之间进行通讯
//  sessionStorage 只能够在当前（本页面）进行通讯

//  2. 时效性
// Localstorage是永久存储
// sesstionStorage是会话存储

// localStorage和sesstionStorage都具有length属性，可以通过控制台来查看有多少条记录

//3. 共同点
//  存储的数据的格式都只能是字符串，如果想要存储别的数据格式的，需要转为JSON格式




//2. 浏览器如何实现不同标签页的通信？
//1. 使用websocket，node.js中操作，进行长连接，然后由websocket进行通信
//2. 使用localStorage进行通信



//3. 页面渲染过程
//1.解析HTML标签，构建DOM树
//2.解析CSS,构建CSSOM树
//3.把DOM和CSSOM组合成渲染树
//4.在渲染树的基础上进行布局，计算每个节点的几何结构
//5.把每个节点绘制到屏幕中




//4. CSS选择器的优先级

//  !important 大于其他一切的设置
//1. 内联样式：权重值为 1000
//2. ID选择器 权重为 100
//3.  类 伪类 属性选择器 为 10
//4.  标签选择器 为 1
//5.  通配符 ， 子选择 ，相邻 权重为 0
//6.  继承的样式没有权值




//  数据响应式原理  http缓存机制  权限控制  防抖节流  图片懒加载 2022-9-28
//1.观察者模式 https://www.cnblogs.com/suanyunyan/p/16420100.html
// class Observer {
//     // constructor构造函数,在new 这个class 的时候,会自动调用,如果没有写的话,就默认生成一个,
//     // constructor默认返回实例对象this
//     constructor(x, y) {
//         this.x = x
//         this.y = y
//     }

//     toString() {
//         return `(${this.x}${this.y})xxx`
//     }
// }
// 上述代码====
// function Observer(x, y) {
//     //new 关键字做了
//     //1.创建一个新的对象
//     //2. 将构造函数中的作用域赋值给了新的对象(this.指向了新的对象)  (------>拓展:因为会在内存中开辟一个空间,这个空间的引用会交给ab,而这个空间中的this也就指向了ab)
//      //3.以及将这个函数的prototype赋值给这个对象的__proto__属性
//     // 4. 执行构造函数的代码
//     //4. 内部自动返回这个对象
//     this.x = x
//     this.y = y
//     console.log(this)
// }
// Observer.fjqo = function(){
//     console.log('静态成员')
// }
// // 这是构造函数的原型成员上面的方法
// Observer.prototype.youzhemode = function () {
//     // 注意了,这里如果是箭头函数,那么this会指向外层作用域
//     return `(${this.x}${this.y})xxx`
// }



// const ab = new Observer(100, 200)
// // 会顺着原型链向上查找
// console.log(ab.youzhemode())
// Observer.fjqo()




// 实现观察者的例子


/**
 * 观察者:用来观察主体对象的变化
 */


// class Observer {
//     constructor(name) {
//         this.name = name
//     }
//     update(pamras) {
//         console.log(this.name + '接收到了')
//         this.myFunction()
//     }
//     myFunction() {
//         console.log(this.name + '自定义的方法')
//     }
// }

/**
 * 目标对象(被观察者)
 * 包含:更新通知方法,添加订阅方法
 */

// class Subject {
//     constructor() {
//         //  观察者队列
//         this.ObserverList = []
//     }

//     // 添加订阅
//     add(observer) {
//         if (observer && observer.update) {
//             this.ObserverList.push(observer)
//         }
//     }
//     // 移除观察者
//     removeSub(sub) {
//         if (this.ObserverList.length) {
//             let index = this.ObserverList.indexOf(sub)
//             if (index > -1) {
//                 this.ObserverList.splice(index, 1)
//             }
//         }

//     }
//     // 发送通知
//     notify(params) {
//         console.log(params)
//         this.ObserverList.forEach(observer => observer.update(params))
//     }
// }

// 观察者模式,是定义了一个 一对多的依赖关系,当有关状态变更时则执行相应的更新
// 具体的华：有2个对象，观察者和目标对象，观察者观察目标，当目标状态发生变化，就通知观察者去做更新操作
// 目标对象：就是被观察者，维护一个观察者列表，可以用来给已经观察的对象发布消息，这个目标对象可以包含添加观察者的方法，移除观察者的方法，通知方法（自身更新需要通知已经观察的对象）
// 观察者：观察目标对象的类，用来观察主体对象的变化，主要有接受通知的方法，自定义的业务方法..
// 简单来说就是当 对象间存在一对多的关系时，会使用观察者模式，当对象被修改时，则会自动通知依赖它的对象，进行自动更新操作

// let subject = new Subject()//被观察者

// const ob_1 = new Observer('观察者1')//观察者
// const ob_2 = new Observer('观察者2')//观察者

// subject.add(ob_1)
// subject.add(ob_2)
// subject.removeSub(ob_2)

// subject.notify({ test: '老子更新咯' })


// 发布订阅模式
// 发布订阅者模式：在观察者对象和目标对象之间多了一个事件通道，作为中间过渡，目标对象发生变化，不直接通知观察者，而是通过事件通道去通知观察者做更新，因此
// 观察者只需要订阅事件通道的消息即可
// vue的中央事件总线 vueBus就是采用的发布订阅者设计模式
// 消息中心：负责存储消息与订阅者的对应关系，有消息触发的时候，负责通知订阅者
// 订阅者：去消息中心订阅自己需要的消息
// 发布者：满足条件时，通过消息中心发布消息


// 实现一个简单的 Event
let maops = new Map([[1, 'a'], ['test', 'b']])
// Map对象中保存了键值对，且任何对象(包括原始值)都可以作为键或者值
class EvenetEmitter {
    constructor() {
        this.eventMap = new Map()
    }
    // 订阅
    on(evenetName, callback) {
        // 如果有多个订阅者订阅了，依次保存
        if (this.eventMap.has(evenetName)) {
            this.eventMap.get(evenetName).push(callback)
        } else {
            //    没人订阅，直接添加
            // 可能一个订阅者，会有多个监听事件，所以值为数组
            this.eventMap.set(evenetName, [callback]);
        }
        console.log(this.eventMap)
    }
    // 发布
    emit(eventName, ...args) {
        //  取出对应事件名称的所有订阅者
        const evenList = this.eventMap.get(eventName)
        if (evenList && evenList.length) {
            // 将有该事件的所有订阅者的监听事件触发
            evenList.forEach(callback => callback.call(this, ...args))
        } else {
            console.log('没找到对应事件')
        }
    }
    // 移除
    off(evenetName, callback) {
        const eventList = this.eventMap.get(evenetName);
        if (eventList && eventList.length) {
            const filterEventList = eventList.filter(cb => cb === callback);
            this.eventMap.set(evenetName, filterEventList);
        }
    }
}
const emitter = new EvenetEmitter();
// 监听事件
const callback_1 = (...args) => {
    console.log('我是监听事件1', ...args);
};

const callback_2 = (...args) => {
    console.log('我是监听事件2', ...args);
};
// 订阅者订阅自己需要的消息
emitter.on('test', callback_1);
emitter.on('test', callback_2);


setTimeout(() => {
    // 在2秒后，发布消息给test订阅者
    emitter.emit('test', 1, 2, 3);
}, 2000)


setTimeout(() => {
    // 移除test订阅事件
    emitter.off('test');
    console.log('已经移除test')
    // 在2秒后，发布消息给test订阅者
    emitter.emit('test', 1, 2, 3, 5, 6);
}, 2500)
// 优点：
//1.可以帮我我们完成更松耦合的代码编写
//2.拥有更强的拓展性，无论是mvvm mvc 都少不了发布-订阅模式的参与

// 缺点：
//1.创建订阅者本身要消耗内存和事件，当订阅一个消息后，也许消息最后都没发生，但这个订阅者会始终存在内存中,另外，发布-订阅模式会弱化对象之间的联系，
//2.但如果过渡使用的话，会让发布者和订阅者之间的联系被深埋，会导致程序难以跟踪和维护


//2.http缓存机制


//3.图片懒加载



//2022 9-29  Vue双向数据绑定原理

// 1.双向数据绑定原理

// 使用Object.defineProperty + 发布-订阅者模式来实现,核心就说通过Object.dfineProperty方法设置set和get函数来实现数据的劫持,在数据变化时候发布消息给订阅者,触发相应的监听回调,也就是是
// 说数据和视图同步，数据变化，视图跟着变化，视图变化，数据也跟着变化

// 复习-什么是Object.defineProperty
// 1.Object.defineProperty,对象劫持，有3个参数，第一个是需要劫持的对象，第二个是劫持对象的属性，第三个是对象拥有2个属性（get和set），
// get：读取属性时调用的函数，默认值是undefined
// set：写入属性时调用的函数，默认值是undefined

const data = {

}
var properName = ''
Object.defineProperty(data, 'properName', {
    get: () => {
        console.log('调用了Object.defineProperty的get')
        return properName
    },
    set: (newVal) => {
        properName = newVal
        console.log('调用了Object.defineProperty的set', newVal)

    }
})
data.properName // 调用了Object.defineproperty的get
data.properName = 'hello'  //调用了Object.defineproperty的set
console.log(data)
// 首先：vue在初始化的时候，对data数据进行了劫持监听，其中就是监听器Observe，用来监听所有属性
// 若有属性发生变化就需要告诉订阅者 Watcher 看看是否需要更新
// 因为订阅者Watcher 可能会有多个,所有需要一个 消息中心 Dep 来专门收集这些订阅者,在监听器Observe和订阅者Watcher之间进行统一管理


// 2022-9-29
// https://blog.csdn.net/qq_55286942/article/details/125425715?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22125425715%22%2C%22source%22%3A%22qq_55286942%22%7D

//1.说一下innerHtml和innerText的区别和作用？
//作用：都是可以用来获取或者设置元素的内容
//区别：innterHtml可以解析内容中的html标签，innerText不能

//2.javascript由哪3部分组成？
//1.ECMAScript 语法部分：js语言基础
//2.DOM：规定了HTML和XML的方法
//3.BOM：提供了浏览器窗口之间的交互的对象和方法

//3.你用过js的哪些内置对象？
// 1.Object,Array,Boolean,Number,String
//2.Function,Math,Date,Error
// es6:Map,Set,Promise,Proxy


//4.JS的数据类型有哪几种?
// 基本数据类型:number,string,boolean,undefined,null,symbol
//引用数据类型:object

// 5.js书写的基本规范?
//1.代码一定要正确缩进
//2.语句结束使用分号
//3.规范定义JSON对象,补全双引号
//4.变量和函数在使用前进行声明
//5.以大写字母开头命名构造桉树,全大写命名常量
//6.代码段使用花括号包裹
//7.变量名使用驼峰命名

//6. == 和 === 区别
//1. == 只判断值
//2. === 判断值和类型

//7.offsetWidth/offsetHeight 返回值包含 content + padding + border + 包含滚动条0
//clentWidth / clientHegiht :返回值 包含 content + padding ,没有包含border边框和滚动条
//scrollWidth / scrollHeight 返回值 包含 content + padding + 溢出内容的尺寸

//说一下元素节点,文本节点,属性节点的nodeType,nodeNmae,nodeValue分别是什么?
// 1.nodeType        nodeName          nodeValue
// 元素节点 1   元素标签名(div,a,span) null(没有值)
// 属性节点  2   属性名                属性值
// 文本节点  3    #text            节点内容

//8. 说一下数组的pop，push，unshift，shift方法？
//pop()方法，尾部删除
//push()方法，尾部添加
//unshift()头部添加
//shift()头部删除

//9.说一下 ajax请求的说话 get和post 方式的区别
//get：
// 参数是跟着url后面的
// 安全性不高
// 传输数据较小，速度快
// get一般用于获取，删除

// post
// 参数放在请求体中
// 安全性相对高
// 传输数据大，但速度也相对慢
// post一般用于修改或者添加

//10.解释一下什么是JSON？
//1.json是一种轻量级的数据交换格式，一般用于数据传输
//2.里面只允许出现双引号
//3.JSON的语法表示三种类型值，简单值（字符串，数字，布尔值，null）数组，对象

//11.dom事件委托什么原理，有什么优缺点？
//事件委托机制：事件冒泡机制(吧子元素的事件 委托给父元素执行)
//有点：
//1.可以大量节省内存占用，减少事件注册
//2.当新增子元素时，无需对其进行事件绑定
// 缺点
// 1.可能会出现事件误判

//12.js的事件流模型都有什么？
//1.‘事件冒泡’：事件逐级向上传播
//2.‘事件捕获’ ：事件逐级向下传播，一直到最具体的
//3.DOM事件流：事件捕获，目标阶段，事件冒泡

//13.什么是js的事件流？
//事件流就说从页面接受事件的顺序，这些事件连起来就形成了一个像液体一样的整体，这个整体中的事件又有着自己的执行顺序，这就是事件流

// 14.如何阻止事件冒泡
// 调用事件对象的stopPropagation()

//15.如何阻止默认事件
// 调用事件对象的 preventDefault()

// 16.split()和join()的区别
// split 以指定字符分割字符串返回一个数组 String方法
// join 是以指定字符连接数组的每一项，返回一个字符串 Array方法

// 17.js中如何检测一个变量是一个String类型？
//使用 typeof
//使用 constructor，找到该变量的构造函数
//Object.prototype.toString.call(变量)//Object.prototype.toString是以特殊字符串的形式输出this的类型
// Object.prototype.toString.call('12121')  '[Object string]'


// 18.typeof返回有哪些数据类型？
//1.string number boolean undefined object funciton Symbol（es6新增）
// 拓展-----> Symbol是es6引入了一种新的数据类型Symbol，表示独一无二的值，最大的用法是用来定义对象的唯一属性名
// 由于每一个 Symbol的值都是不相等的，所以Symbol作为对象的属性名，可以保证属性不重名
// let sy = Symbol("key1")
// let fn = []
// console.log(typeof fn)
// console.log(typeof sy) symbol
// let syObject = {
//     [sy]: 'kk'
// }
// console.log(syObject)

// 19. 如何判断一个变量是不是NAN？
// 使用isNaN来判断(判断前会将参数转换为number类型)

//20.解释一下什么是JS变量提升 与块级作用域
//变量提升：通过var定义声明的变量，会提升到它当前所在作用域的最开始的部分
//拓展----->为什么会变量提升？
// 因为js引擎会分为2步：1.预解析 2.代码执行
//1.变量提升 把所有var 声明的变量提升到当前作用域的最前面，不提升赋值操作，只提升声明部分
//2.函数提升 把所有的函数声明提升到当前作用域的最前面，不调用函数,
// 所以我们再函数声明前调用函数也能调用，以及可以使用还没声明的var变量也是因为预解析
//什么是块级作用域？
//1.js作用域分为：全局作用域和函数作用域，es6中新增了块级作用域，使用let声明的变量只能再块级作用域中访问，有暂时性死区的特性(声明前不可使用，因为不会变量提升)
// 可以理解为{}包裹的代码段就是一个块级作用域，，if语句和for语句中的{}代码也属于块级作用域，js整体代码为一个块级作用域，再其他作用域中，不能调用块级作用域里面定义的变量，


//21. null 和undefined的区别吗？
// null：空值，代表一个空对象指针，typeof null*1
// undefined：定义为赋值的变量的类型就是，typeof undefined*1


//22.什么是原型链
// 我们在访问一个对象上面的属性或者方法的时候，如果没有，则会顺着该对象的__proto__属性向上查找，直到找到null为止，而这个由__proto__形成的链式结构，就被称为原型链
// Object是所有对象的父类也是原型链最顶层的原型
// 拓展---》每个对象都有__proto__属性，因为他们都是通过构造函数，实例化new出来的，它的隐式原型属性，指向了创建该对象的构造函数的原型对象，为了实现继承，js通过__proto__将对象和原型
// 联系起来组成原型链，就可以让对象访问到不属于自己的属性或者方法
// 在拓展--->比如我们在声明了，字符串，数字，boolean，后，使用了tostring方法，但是这些基本数据类型身上是没有这些方法的，所以js后台会进行一些包装的操作，就是基本包装类型吗
// 比如string.indexof()，其实内部做了 new String() 再调用indexOf() ，这个包装会在使用完后被立即清除,其实他们都是访问了原型链上的属性或者方法

//23.你可以说一说 prototype和 proro的关系吗
// prototype：所有的函数都有一个prototype属性，它就是函数的原型对象
// proto：所有的实例对象上都会有一个__proto__属性，它指向这个实例对象的构造函数的原型
// constructor:构造函数的原型可以通过constructor属性访问到这个构造函数

// 函数也是object，所以它也是由构造函数实例出来的，所以它也具有__proto__属性，它的原型也具有，也会顺着__proto__向上查找，直到找到空函数为止，所以我们才能通过Number.isNaN，Array.isArryay...等来访问到构造函数上的一些方法，
// 实例对象的__proto__(原型链)尽头是null，函数的__proto__(原型链)尽头是空函数



//23.说一下你常用的数组方法
//1.Array.push()
//2.Array.pop()
//3.Arry.shift()
//4.Array.unshift()
//5.Array.isArray()
//6.Array.map()
//7.Array.forEach()
//8.reduce()
//9.join()//以某字符为连接符，连接所有的元素
//concat()//合并数组
// filter() 过滤
// splice()增删改
// includes()查询
// slice() 可从数组中返回选定的元素
let arrr = ['a', 'b', 'c', 'd']//从start开始，end结束，但不包括end
console.log(arrr.slice(1, 3))

//24.说下你常用的string方法？
//trim()去除收尾的空格
//split()以某字符切割字符串的每一项，为数组的每一项
//replace()替换匹配的字符
//indexOf()
//lastIndexof()
// concat
// slice(0,3) 返回 0-3，不含3之间的字符


//25 深拷贝与浅拷贝有什么区别，如何实现？
// let obj = {
//     name: '杰哥'
// }
// let obj2 = obj
// obj2.name = '修改后的杰哥'
// console.log(obj, obj2)

// 深拷贝和浅拷贝都是主要针对于Array和Object对象
// 浅拷贝：只赋值指向某个对象的指针（引用地址），而不是复制对象本身，新旧对象还是共享一块内存
// 深拷贝：会创建另外一个一模一样的对象，新对象和旧对象不共享内存，修改新对象不会影响到旧对象
// 说一下深拷贝的实现方法
//1.使用JSON.parse(JSON.stringfiy())方法
//2.手写递归，将引用数据类型赋予新的引用地址

let oCopyObject = {
    name: '你爹',
    age: 20,
    color: ['orange', 'green', 'blue'],
    frined: {
        name: '你野爹'
    }
}
const copyObject = (targetObj = {}) => {
    if (typeof targetObj !== 'object' && !targetObj) return targetObj
    let result
    result = targetObj instanceof Array ? [] : {}
    // 循环该应用地址
    for (let key in targetObj) {
        //    只拷贝自身属性，不拷贝原型属性
        if (targetObj.hasOwnProperty(key)) {
            // 入口，当对象或者数组的某一项为object时，递归处理
            // 出口：当对象或者数组某一项不为object时，直接用该项赋值
            result[key] = isObject(targetObj[key]) ? copyObject(targetObj[key]) : targetObj[key]
        }
    }
    return result
}
function isObject(obj) {
    return typeof obj === 'object' && typeof obj !== 'null'

}
// console.log(copyObject(oCopyObject))

// 什么是函数的柯里化？
// 就是把一个多参数的函数，转化为单参数的函数
const add = (x, y) => {
    return x + y
}
add(2, 3)

// 简单封装一个通用柯里化转化函数 curry 将普通函数转换为柯里化的函数
// 柯里化之后
function curry(fn, currArgs) {      // 这里的fn就是sum方法
    return function () {
        console.log(arguments)
        let args = [].slice.call(arguments);
        // 首次调用时未提供参数currArgs，因此不用进行拼接执行
        if (currArgs !== undefined) {
            args = args.concat(currArgs);  // 这里的currArgs是上次递归传递进来的，也就是上次递归的args
        }
        // 递归调用
        if (args.length < fn.length) {
            return curry(fn, args);
        }
        return fn.apply(null, args);   // 这里调用了apply方法，将收集起来的args参数全都传入fn中
    }
}
const sum = (a, b, c) => {
    return a + b + c
}
const fn = curry(sum)
// console.log(fn(1)(2)(3))


//判断Array类型的几种方式
//1.Array.isArray()
//2.instanceof Array
//3. Object.prototype.toString() === '[object Array]'
//4.constructor === Array

//说一下this指向
//1.全局作用域用 this指向全局对象window
//2.对象内部的函数，this指向对象本身
//3.构造函数中的this，指向实例
//4.call，apply.bind ，this指向第一个参数
//5.箭头函数中的this永远指向外岑作用域，箭头函数中没有this

//什么是AJAX，如何实现AJAX
//1.AJAX是一种能够实现网页局部刷新的技术，通过在后台与服务器进行少量数据交换，使网页实现异步更新，这意味者可以不重载整个页面的情况下，对网页部分内容进行更新（局部刷新）
// AJAX是基于XMLHTTPRequest对象
//实现步骤
//1.创建核心对象XMLhttpRequest镀锡
//2.利用open方法打开与服务器的连接
//3.利用send方法发送请求（如果是post请求，需要额外设置请求头）
//4.监听服务器响应，接收返回值


//什么是高阶函数

// 浏览器的渲染过程
//1.浏览器解析HTML文件，构建DOM树，并行请求CSS/图片/JS
//2.下载好CSS文件后，开始构建CSS树
//3.CSS树构建结束后，和DOM树一起生成渲染树
//4.布局：计算出每个节点在屏幕中的位置
//5.显示：将每个节点绘制在屏幕上


//javaScript如何实现继承
//1.实例继承
//2.原型继承
//3.构造函数继承

//什么是javascript的作用域链
//函数在指向过程中，先从自己的内部寻找变量，如果找不到，再从创建当前函数的所在作用域去找，从此往上，也就是向上一级查找，直到找到全局作用域为止,如果本作用域中有的话，则不会向上查找
// 当再作用域访问变量/方法的时候，会找离自己最近的那个变量/方法(就近原则)
