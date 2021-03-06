# JS（JavaScript） 引言
Lee爵士提出了HTML概念，Lie先生提出了CSS概念，Brendan创建了JavaScript。
## JS 历史发展
1995年，Brendan进入网景公司，为其浏览器开发了JS功能。

1996年8月，微软的 IE3 发布，支持JScript（微软实现的JS，现已经基本不用），浏览器大战开始，每家浏览器脚本不太一样。1996年11月，网景向ECMA提交语言标准，由于JS带了“Java”，涉及版权问题，因此JS语言标准叫做“ECMAScript”。

1997年，第一版 ECMAScript 发布，1999年，第三版发布，使用最广的一个版本。第四版新增很多功能，但是流产。

2001年，IE6 随着 Windows XP 一起发布，2004年，IE6 全球市场占用率80%以上。由于 IE6 的成功，微软解散了 IE6 开发团队，只是做简单维护。2010年，中国大部分浏览器还是 IE6。<strong>但是 IE6 不兼容W3C标准，尤其是CSS。</strong>

2004年，谷歌发布Gmail在线页面，将网页的功能从看新闻和图片的局限中拓宽出来。2005年，AJAX的发明使得前端技术正式出现。在此之前，网页都是由后端和设计师完成。

2006年，jQuery 发布，是目前最长寿的JS库，因为jQuery对大多浏览器（尤其是IE）兼容性非常好。jQuery非常火，直到IE不行了才没那么火。

2008年，谷歌的 Chrome 发布，Chrome 主打“快”这一特点。2016年，全球份额62%，随后前端极速发展。

2009年，ECMAScript 第五版发布，新增一些功能。

2010年，iPhone4 发布，而和微软联合的诺基亚手机业务逐年衰退，手机端没有使用IE，前端程序员非常开心。另外，制作智能手机页面使得前端需求不断增加。

2015年，ECMAScript 第六版发布，新浏览器都支持这一版，之后每年发布一版，版本号以年份命名。现在，纸上标准ECMAScript往往落后于浏览器的JS实现，先实现，在写进ECMAScript标准。

2016年，淘宝天猫宣布不再支持 IE6、7、8。

这里有个<a href="https://www.bilibili.com/video/av15989846/">纪录片</a>也是介绍JS历史的。

## JS 的缺陷

JS设计阶段非常仓促，Brendan主要目的是为了向公司交差，因此只用了十天来设计JS。另外JS过早标准化，1995年定稿，1996年申请JS国际标准，从推出到宣布国际标准，前后时间间隔不到两年时间，相比之下，C语言被推出后过了20年才有国际标准。因此，JS有些较为明显的设计缺陷，让人感觉它不是门好语言。以下提一些JS的具体缺陷，参考<a href="http://www.ruanyifeng.com/blog/2011/06/10_design_defects_in_javascript.html">JS的10个设计缺陷</a>：

1. 不适合开发大型程序。JS没有如何将代码分布在多个文件的规范；允许同名函数的重复定义，后面的定义可以覆盖前面的定义，很不利于模块化加载。
2. 标准库小。只能完成一些基本操作，很多功能都不具备。
3. null和undefined：null属于对象（object）的一种，意思是该对象为空；undefined则是一种数据类型，表示未定义。两者容易让人混淆，但是在编程实践中，null几乎没用。
4. 全局变量难以控制。JS任何一个函数内部都可以生成全局变量，这大大加剧了程序的复杂性。
``` JavaScript
  for (var i = 0; i < 5; i++) {}; 
  console.log(i);
  // 答案是：不会报错，且打印了“5”！！！这样执行完之后，i会保留下来。将“var”换成“let”才会正常报错，i才会成为局部变量。
```
5. 自动插入尾行分号。末尾不加分号，编译器不会报错，但是有时候会因此出现一些难以察觉的错误。
6. NaN，表示无穷大。但是注意：
``` JavaScript
    NaN === NaN; // 结果为 false
    NaN !== NaN; // true
    alert( 1 + NaN ); // NaN
```
7. == 和 ===。== 用来判断两个值是否相等。当两个值的类型不同时，则会转换为相同类型来进行比较，因此会出现一些很奇怪的结果（推荐都使用 === 来进行精确判断）：

``` JavaScript
　　"" == "0" // 结果为 false

　　0 == "" // true

　　0 == "0" // true

　　false == "false" // false

　　false == "0" // true

　　false == undefined // false

　　false == null // false

　　null == undefined // true

　　" \t\r\n" == 0 // true
```
## 如何看待JS缺陷
随着语言标准的不断更新，JS缺陷有些可能被弥补，有些也可能会一直伴随着JS的发展。学习JS需要遵守良好的编程规范，这样大部分设计缺陷都可以回避。JS的前途还是很光明的，因为JS目前是网页编程唯一的语言，而且node.js将JS拓宽到了后端服务器编程。

## 学习要求
* 软要求
  1. 逻辑能力
  2. 质疑自己
  3. 抽象思维
* 硬要求
  1. 了解足够多的概念，能向别人表达出来。
  2. 工作经验/踩坑经验。通过做“个人”项目来获得经验，团队项目容易出现划水现象。
  3. 代码量：亲手写1000行，新手；10000行，熟手；50000行，专家。统计代码行数可以使用 cloc（count lines of code）。所谓的专家可以说是“将专业领域内所有的坑都踩过的人”。


