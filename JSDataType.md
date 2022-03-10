<!-- 03.10：1.5h -->
# JS 数据类型
不同的数据类型实现不同的功能。
## 数据存储
对于数字的存储，直接按照二进制的值来存储即可。对于字符，则需要先经过编码，获得对应的编码值之后再进行存储。
1. ASCII码，能够存储128个字符信息，其中'0'=48，'A'=65，'a'=97。
2. GB2312，中国国家标准局编写，主要为常见的6000多个汉字进行了编码。但是生僻字如“镕”没有在编码库里边。
3. GBK，微软做的，为20000多个汉字（包括中日韩）和图形符号进行编码。
4. Unicode，已经收录了13万字符（大于16位，2个字节），全世界通用。但是非常占存储空间。
5. UTF-8，对应Unicode编码，但是节省存储空间。鸡贼存法：

<img src="images/i3.jpg" alt="Fig.1">

## JS中7种数据类型
四基二空两对象：数字 number、字符串 string、布尔 boolean、符号 symbol、空 undefined、空 null、对象 object。

数组、函数、日期等属于对象 object，不是JS的数据类型。

### 数字 number
包括整数、小数、科学计数（如1.23e4）。

特殊值：
* +0 和 -0（如 1/+0 不等于 1/-0）
* 无穷大：Infinity = +Infinity。-Infinity
* 不是数字的数字（或者说超出认知的数字）：NaN（Not a Number）

64位浮点数。浮点意思是小数点可以乱动。比如123.456=1.23456e10^2。

<img src="images/i4.jpg" alt="Fig.2">

* 最大数字：Number.MAX_VALUE: 1.7976931348623157e+308
* 最小数字：Number.MIN_VALUE: 5e-324
* 15位10进制有效数字能够精确表示，对于16位10进制有效数字，小于90开头可以（将2^53作为参考值）。比如 9,110,000,000,000,001 无法精确表示。

### 字符串 string
写法：
* 单引号、双引号，这两个方法要时刻注意转义字符的书写。
* 反引号 ``，很多特殊字符都不用再通过转义字符来表示，非常方便。
* 需要转义的特殊字符：\' | \" | \n（换行） | \r（回车） | \t（tab） | \\ | \uFFFF（对应Unicode字符） | \xFF（前256个Unicode字符）

字符串属性：
* 长度 length
* 下标索引
* base64转码，一般用来隐藏招聘启事里的简历，不能作为加密手段，用它来加密只能骗骗外行人。

``` JavaScript
    window.btoa(`alibaba@163.com`)
    // 输出为：'YWxpYmFiYUAxNjMuY29t'
    window.atob('YWxpYmFiYUAxNjMuY29t')
    // 输出为：'alibaba@163.com'
```

### 布尔 boolean
布尔值只有 true 和 false。注意，除了 false 以外，JS还定义了五个等价 false 的值：

<strong>undefined、null、0、NaN 和 ``</strong>

### 空 undefined & null
本质上它们没什么区别，细节上的区别：
* 声明一个变量而没有赋值，那么默认这个变量为 undefined。
* 一个函数没有写 return 或者 return 后面不写东西，那么默认 return 为 undefined。
* 前端程序员<strong>习惯上</strong>把非对象的空值写为 undefined，把对象的空值写为 null。

### 符号 symbol
很不常用。Symbol 的作用是可以创建一个独一无二的值，这个值并不是字符串。更多细节可以<a href="https://zhuanlan.zhihu.com/p/22652486">参考一篇知乎文章</a>。

### 对象 object
内容较多，参考<a href="">下一篇文章</a>。

## 变量声明
JS的变量声明是不指定类型的，变量声明之后，赋什么值，它就是什么类型，即变量类型可以随意更改。变量声明有三种方式：
``` JavaScript
    var x = 3
    // 过时的、不好用的方式
    let x = 3
    // 新的、合理的声明方式
    const x = 3
    // 常量，初始化时一定要赋值，之后不能更改
```
* var 会涉及到变量提升问题，具体可以参考<a href="https://wangdoc.com/javascript/basic/grammar.html#%E5%8F%98%E9%87%8F%E6%8F%90%E5%8D%87">网道教程</a>。

* let 声明，和Java的局部变量特性一样：
  1. 遵循块作用域，作用范围不能超出{}。
  2. 同一个块作用域中不能重复声明。
  3. 声明的时候可以赋值，也可以不赋值。
  4. 先声明再使用。
  5. 全局声明的 let 变量，不会变成 window 的属性。

* const 声明，常量声明。规则和 let 一样，除了：声明时一定要赋值，而且之后不能更改值。

## 类型转换
* number => string
  1. String(num)
  2. num + ``

* string => number
  1. Number(str)
  2. parseInt(str) | parseFloat(str)
  3. s-0

* xxx（任意类型） => boolean
  1. Boolean(xxx)
  2. !!xxx

* xxx（任意类型） => string
  1. String(xxx)
  2. xxx.toString()

``` JavaScript
    // 注意！！！
    1.toString() // 报错！JS以为你要写浮点数
    1..toString() // 正确
    1 .toString() // 正确
```

## 更多
JS语言存在很多意想不到的bug，更多信息可以参考<a href="https://www.jb51.net/onlineread/JavaScript-Garden-CN/">JS秘密花园</a>。

2020年6月JS新增一种数据类型 bigint（<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt">mdn介绍</a>），了解一下就好。原本Javascript中可以用 Number 来表示最大数字，现在 BigInt 可以表示任意大的整数。

