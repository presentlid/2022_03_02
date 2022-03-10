<!-- 03.10：2h -->
# JS 对象
JS的对象可以理解为“无序的”数据集合或者键值对的集合。

声明对象：
``` JavaScript
    // 写法：
    let obj = {
        `name`: `xxx`,
        `age`: 18
    } // 常见的简写
    let obj = new Object({
        `name`: `xxx`
    }) // 规范写法，写起来比上一种要麻烦
    console.log({
        'name': 'xxx',
        'age': 18
    }) // 匿名对象
```

## 对象的键 key

键名是字符串，不是标识符，因此键名可以起得非常花里胡哨；<strong>键名的引号可以省略，省略之后就必须按照标识符的规则来起名，最终键名还是以字符串的形式进行存储</strong>，比如：

``` JavaScript
    let obj = {
        1: 'a',
        3.2: 'b',
        1e2: '',
        '1e2': '',
        .123: '',
        0xFF: ''
    }
    // Object.keys(obj)
    // => ['1', '100', '255', '3.2', '1e2', '0.123']
    // 上述中，没有加引号的键名被JS从标识符的角度来解析，加了引号的键名则直接进行存储。
```

使用变量中的内容来作为键名：

``` JavaScript
    let x = 'key'
    let obj = {
        x: 'value', // 键名为：'x'
        [x]: 'value' // 键名为：'key'
    }
```

## 对象的隐藏属性
JS中每一个对象都有一个隐藏属性，这个隐藏属性存储着由共同属性组成的对象的地址，这个对象叫做原型，而隐藏属性保存着原型的地址。

## 对象的增删改查
### 删除属性
``` JavaScript
    let obj = {'xxx': undefined}
    // 以下例子均以这个声明为标准

    delete obj.xxx | delete obj['xxx']
    // 两种方法删除对象中键名为'xxx'的属性。新人推荐右边写法，不容易搞乱。
    'xxx' in obj === true
    // 为真，表示对象obj中存在这个键名为'xxx'的属性
    'xxx' in obj && obj['xxx'] === undefined
    // 为真，表示对象obj含有键名为'xxx'的属性，且该属性的值为 undefined
    obj['xxx'] === undefined
    obj['something'] === undefined
    // 注意！！！这两个判断都为真，但是从首行中观察可以发现我们声明了'xxx'而没有声明'something'！所以，obj['xxx'] === undefined 不能判断对象是否存在属性'xxx'，必须要通过关键字 in 来判断对象中是否有某个属性。
```

### 查看属性
``` JavaScript
    let obj = {'xxx': undefined}

    Object.keys(obj)
    // 查看obj“自身”的属性，
    console.dir(obj)
    // 查看obj“自身”和“公有”的属性，这个时候隐藏属性就会被打印出来
    obj.hasOwnProperty('toString')
    // 判断对象中有没有属性'toString'，如果有，那么这个属性是自身的还是公有的。
```
'xxx' in obj 和 obj.hasOwnProperty('xxx') 的区别：in 判断对象的属性包括了公有属性，而 hasOwnProperty 只查询该对象“自身”的属性。

## 增加/修改属性
``` JavaScript
    let obj = {'name': 'xxx'}

    // 直接赋值：
    obj['name'] = 'yyy' | obj.name = 'yyy'
    let key = 'age'; obj[key] = '18'

    // 批量赋值（ES 6推出的assign函数）：
    Object.assign(obj,{
        'age': 18,
        'gender': 'man'
    })

```
隐藏属性也可以通过键名'\_\_proto__'来修改，但是这样效率很低，一个类比就是：一个人已经在这个世界上了，他的亲生父亲是'\_\_proto__'指向的对象，然后突然你又说他的亲生父亲是xxx，就很奇怪。如果你想设立一个属于自己的原型，那么推荐使用 Object.create(你的原型的名字)：
``` JavaScript
    let common = {'country': 'China'}
    let person = Object.create(common)
    person['name'] = 'xxx'
```

