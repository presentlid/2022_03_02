<!-- 03.21: 0.5h，03.22: 1.5h 03.23：2h -->
# JS 函数
函数是对象。
## 定义
四种方法。
``` JavaScript
    // 具名函数：
    function 函数名(形式参数1, 形式参数2) {
        语句;
        return 返回值;
    }; 

    // 匿名函数，也叫函数表达式：
    let 函数名 = function(形式参数1, 形式参数2) {
        语句;
        return 返回值;
    }; 
    // 注意！！！如果等式右边写成具名函数的样子，即给函数起了名字 xxx，那么这个函数名 xxx 只能作用于等式右边部分，其他情况下使用名字 xxx 会报错，说你没有声明！

    // 箭头函数：
    let f1 = x => x*x;
    let f2 = (x,y) => x+y;
    let f3 = (x,y) => ({name: x, age: y}) // 注意！！！箭头函数右边如果是对象，那么必须加“圆括号”，否则JS将会以为是代码块！

    // 构造函数：
    let fn = new Function('x','y','return x+y');
    // 基本没人用，但是能让你知道函数是谁构造的。所有函数都是 Function 构造出来的，Function 本身也是由 Function 构造出来的。
```

## 函数调用
``` JavaScript
    let fn = () => console.log('hi');
    fn;
    // 这样写不会执行fn函数

    let fn = () => console.log('hi');
    fn();
    // 这样写会执行fn函数，打印出 hi。
```
要区别 fn 和 fn() 这两种写法。fn 保存的只是函数的地址，fn() 才会调用函数。

## 函数要素
<a href='#1'>调用时机</a>

<a href='#2'>作用域</a>

<a href='#3'>闭包</a>

<a href='#4'>形式参数</a>

<a href='#5'>返回值</a>

<a href='#6'>调用栈</a>

<a href='#7'>函数提升</a>

### 调用时机 <a id = 1></a>

``` JavaScript
    let a = 1;
    function fn() {
        console.log(a);
    }
    fn();
    a = 2;
    // 结果打印：1

    let a = 1;
    function fn() {
        console.log(a);
    }
    a = 2;
    fn();
    // 结果打印：2
```

需要注意的是 setTimeout() 的表现
``` JavaScript
    let i = 0;
    for (i = 0; i < 6; i++) {
        setTimeout(()=>{
            console.log(i);
        }, 0);
    }
    // 打印：6 6 6 6 6 6
    // 个人认为：如果 setTimeout 里的变量(如变量 i)在 setTimeout 函数所在代码块以外定义，那么就会出现以上“for循环代码块循环结束后 setTimeout 才执行，i = 6，所以结果为 6 个 6”的情况。

    let i = 0;
    for (i = -1; i < 5; i++) {
        let j = i;
        setTimeout(()=>{
            console.log(j);
        }, 0);
        j++; // 这句代码凸显 setTimeout 的执行时间。
    }
    // 打印：0 1 2 3 4 5
    // 此时 setTimeout 里的变量 j 在 for循环里，每循环一次，变量 j 就会被释放掉，因此 setTimeout 在每次循环结束时都要赶紧打印变量 j。

    for (let i = 0; i < 6; i++) {
        setTimeout(()=>{
            console.log(i);
        }, 0);
    }
    // 打印：0 1 2 3 4 5
    // 常见的 let for循环也是打印 0 1 2 3 4 5。
```

### 作用域 <a id = 2></a>
作用域一般和变量联系起来。window的属性是全局变量，作用域包含整个JS世界；其他都是局部变量，作用域在某对花括号中。
``` JavaScript
    function f1() {
        let a = 1;
        function f2() {
            let a = 2;
            console.log(a); // a = 2
        }
        console.log(a); // a = 1
        a = 3;
        f2();
    }
    f1();
```
作用域规则：
* 查找a的声明时，就向上取最近的作用域（以花括号作为标志），简称“就近原则”。
* 查找a的过程与函数执行无关，但a的值与函数执行有关。这里涉及到编译原理中的术语“静态作用域”（与之相对的是“动态作用域”）。

### 闭包 <a id = 3></a>
如果一个函数用到了外部的变量，那么 这个函数+这个变量 就称为“闭包”。
``` JavaScript
    function f1() {
        let a = 1;
        function f2() {
            /* ---------闭包------------ */
            let a = 2;
            function f3() {
                console.log(a)
            }
            /* ------------------------- */
            a = 22;
            f3();
        }
        console.log(a); // a = 1
        a = 3;
        f2();
    }
    f1();
```

### 形式参数 <a id = 4></a>
形式参数的本质是变量声明，与形式参数对应的是实际参数。
``` JavaScript
    function add(x,y) {
        return x+y;
    } // 这里的 x 和 y 就是形式参数。
    add(1,2); // 这里的 1 和 2 就是实际参数。

    // add 函数还可以这么写，这样可以清楚地看见变量声明过程。
    function add() {
        var x = arguments[0]
        var y = arguments[1]
        return x+y
    } 
```
arguments 保存了函数被调用时传过来的所有实际参数内容，也因此，JS写函数时参数可以非常灵活：
``` JavaScript
    function add(x) {
        return x+arguments[1];
    }
    add(1,2); // 结果为 3
    
    function add(x,y,z) {
        return x+y;
    }
    add(1,2); // 结果为 3
```

<strong>注意，JS在传参过程中，形式参数复制了实际参数的内容，这个操作过程在存储空间 stack 中实现：</strong>

``` JavaScript
    let a = 1, b = 1;
    function add1(x,y) {
        x = 2;
        return x+y;
    }
    add1(a, b);
    console.log(a); // a = 1

    let c = ({val: 1}), d = ({val: 1});
    function add2(x,y) {
        x.val = 2;
        return x+y;
    }
    add2(c, d);
    console.log(c); // a.val = 2

    // 看起来好像 a 没被修改，而 c 被修改了，实际上是因为 a 和 c 的内容都保存在 stack 中，而形式参数只复制 stack 中的内容，因此才会出现以上“a 被修改而 c 没有被修改”的情况。因为 c 给的是对象地址，因此 add2 执行“x.val = 2”时会影响对象中的内容。
```

### 返回值 <a id = 5></a>
* 每个函数都有返回值，不写 return 就返回 undefined。
* 函数执行完了之后才会返回。
* 只有函数有返回值，比如 “1+2” 值为 3，但<strong>不能</strong>说 “1+2”的返回值为 3。

### 调用栈 <a id = 6></a>
JS 引擎在调用一个函数前，需要把函数所在的环境 push 到一个数组里，这个数组叫做调用栈。等函数执行完了，就会把环境 pop 出来，然后return到之前的环境，执行后续代码。

递归，顾名思义，先递进后回归，递归非常影响调用栈，递进一次则压一次栈。据统计，Chrome 压栈大概为 12578 次，Node大概 12536 次，Firefox大概 26773 次。

如果调用栈压入过多，就会爆栈，程序崩溃。

### 函数提升 <a id = 7></a>


``` JavaScript
    fn();
    function fn() {};
    // 不报错，函数提升，即不管你把具名函数声明在哪里，它都会跑到第一行。

    fn();
    let fn = function() {};
    // 报错，没有函数提升，这是赋值，右边的匿名函数声明不会提升。
```

### arguments 和 this <a id = 8></a>
每个函数都有，除了箭头函数。

arguments：
* 形式参数要保存的内容就放在函数的 arguments 中。
* arguments 是<strong>伪数组</strong>。

``` JavaScript
    function fn() {
        console.log(this);
        console.log(arguments);
    }

    fn(1,2,3,4);
    // 打印 Arguments 1 2 3 4
    // 1. 直接给函数传参，那么参数内容全部保存到 arguments 中。

    fn.call(1,2,3,4);
    // 打印 Number(1) 换行 Arguments...
    // 2. 注意！！！用 call 传参，则第一个参数会传给 this ！
```

this：

JS 常用的 this 写法：
``` JavaScript
    function Person(name) {
        this.name = name;
    }
    Person.prototype['sayHi'] = function() {
        console.log(this.name);
    }
    let person = new Person('xxx');

    person.sayHi(); // 小白写法，因为 传 this 表达隐晦。
    person.sayHi.call(person); // 大师写法，这样 this 传的是什么就一清二楚。
```
上述代码中，其实 person.sayHi() 自动将 person 传给 sayHi，这样 sayHi 就可以通过 this 引用 person。

由于大师写法语义清晰，所以在调用函数时<strong>一定要用大师写法，一定要用大师写法，一定要用大师写法，</strong>因为小白写法你已经会了。

在大师写法中，如果不用 this，但又要给 arguments 值，那么就把 undefined 或者 null 给 this 即可：...cal(undefined, 参数1, 参数2, ...)。

需要注意的<strong>“变态”要点</strong>有四点，标号在以下代码中。
``` JavaScript
    function fn() {console.log(this)}

    fn();
    // 打印 window。
    // 1. this 不做修饰时默认指向 window。

    fn.call(1);
    // 打印 Number(1)。获得两个结论：
    // 2. 目前可以用 call 来传 this。
    // 3. call 修饰 this 时，如果不做任何规则，那么 JS 将传过来的内容转为对象。除非写 call(undefined)，这样其实等价于第 1 点，即指向 window。

    function fn2() {
        'use strict'
        console.log(this);
    }
    fn.call(1);
    // 打印 1。
    // 4. call 修饰 this，且函数中加了规则'use strict'，这样 JS 就不会将传过来的内容转为对象，而是你给什么，JS 就用什么。
```

## 箭头函数
箭头函数没有 arguments 和 this。就算你用 call 都没效果。
``` JavaScript
    console.log(this); // this = window
    let fn = () => console.log(this)
    fn() // window
    fn.call({name:'xxx'}) // window，就算 call 也没用。
```

## 立即执行函数
<strong>在 ES 5 时代</strong>，为了得到局部变量，则必须引入一个函数，如果这个函数有名字，那么又会因为局部变量而产生一个全局函数，得不偿失。于是这个函数必须时匿名的，声明这个函数然后加 () 执行它。但 JS 认为这种语法不合法，由此出现了以下代码：

``` JavaScript
    ! function () {
        var a = 1
        console.log(a)
    } ()
    // 匿名函数前面加个运算符，~、+、- 可以替代 !，或者用 () 把匿名函数括住也行。但相对来说 ! 是最安全的，其他方法或多或少会出现 bug。
```

