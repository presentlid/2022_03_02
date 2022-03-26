let text = `/* 
* 以下将展示太极图的样式制作过程。
* 首先画圆，将圆垂直分为黑白两半。
*/
#cycle {
    border: solid 1px rgba(0, 0, 0, 0.5);
    width: 200px;
    height: 200px;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: rgb(0, 0, 0);
    background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 100%);
}

/* 
* 画太极中的上半小圆。
* 在上半小圆中有个反色小圆。
*/
#cycle::before {
    width: 100px;
    height: 100px;
    background: white;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background: rgb(0, 0, 0);
    background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 25%, rgba(255, 255, 255, 1) 25%);
}

/* 
* 画太极中的下半小圆。
* 在下半小圆中有个反色小圆。
*/
#cycle::after {
    width: 100px;
    height: 100px;
    background: black;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background: rgb(255, 255, 255);
    background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 25%, rgba(0, 0, 0, 1) 25%);
}
`;

let text1 = '';

let div1 = document.querySelector('#div1');
let css = document.querySelector('#css');
let isTouchDevice = 'ontouchstart' in document.documentElement;

let n = 1;
let printFn = function () {
    setTimeout(() => {
        if (text[n - 1] === '\n') text1 += '<br>';
        else if (text[n-1] === ' ') text1 += '&nbsp;';
        else text1 += text[n - 1];
        css.innerHTML = text.substring(0, n);
        div1.innerHTML = text1;
        window.scrollTo(0, 99999);
        div1.scrollTo(0, 99999);
        if (++n <= text.length) printFn();
    }, 50);
};
printFn();