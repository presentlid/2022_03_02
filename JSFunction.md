<!-- 03.21: 0.5h -->
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
