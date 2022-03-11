<!-- 03.11：1h -->
# JS 对象分类
有很多对象拥有一样的属性和行为，需要把它们分为同一类，这样创建类对象时就非常方便。还有很多对象拥有各自的属性和行为，用不同的分类来把它们区分开来。类是针对对象的分类，有无数种。

## 构造函数
``` JavaScript
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype['run'] = function() { // 共有
        console.log('跑');
    }

    let d1 = new Dog('二哈');
```

构造函数的意思就是构造对象的函数。书写格式：new Xxx(参数)，并且完成四件事：
* 自动创建空对象
* 自动为空对象关联原型，原型的地址为Xxx.prototype
* 自动将空对象作为 this 关键字运行构造函数
* 自动 return this

书写规范问题：
* 所有构造函数的首字母大写。
* 所有被构造出来的对象，首字母小写。
* new 后面的函数使用名词形式（如 new Person()、new Object()），其他函数使用动词开头（如createSquare(width)、createElement('div')）。

<strong>如何确定一个对象的原型？原型公式：对象名.__proto__ = 对应构造函数.prototype </strong>。

<strong>唯一一个</strong>使得原型公式不成立的对象就是<strong>对象的根</strong>：Object.prototype。这个对象的原型被赋值为空，即 Object.prototype.\_\_proto__ = null。

## 数组对象
定义：
* let arr = [1,2,3]
* let arr = new Array(1,2,3)
* let arr = new (3) // 数组长度为3

数组对象自身属性：length。数组对象共有属性：push、pop、shift、unshift、join等。

## 函数对象
``` JavaScript
    let fn = function (参数) {
        语句
    }
    function fn(参数) {
        语句
    }
    let fn = (参数) => {语句} // 注意！！！如果语句中涉及到 this，则不能使用箭头函数。
```

## 终极问题
* window 是谁构造的？
  
  答：window.constructor = Window
* window.Object 是谁构造的？
  
  答：window.Object.constructor = Function
* Function 是谁构造的？
  
  答：window.Function.constructor = Function。浏览器（JS世界中的上帝）构造了 Function，然后指定它的构造函数是自己。

## ES 6 替代原型写法的新语法：class
``` JavaScript
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype['run'] = function () { // 共有
        console.log('跑');
    }

    let d1 = new Dog('二哈');
    /* ----------------------------------------------- */
    class Dog {
        name = '';
        constructor(name) {
            this.name = name;
        }
        run = function () {
            console.log('跑');
        }
    }

    let d1 = new Dog('二哈');
```
关于JS类和对象的新语法更多信息可以参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes">类 mdn</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0">对象初始化 mdn</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment">解构赋值 mdn</a>。ES 6 所有新语法概览可以参考：<a href="https://fangyinghang.com/es-6-tutorials/">点击查看</a>。
