/*
- 原始数据类型:  Primitive data types
    - boolean
    - number
    - string
    - null
    - undefined
    - ES6 Symbol
    - any
- Union Types: 取值可多种类型
- 对象类型 Object types
  - interface 接口: 定义对象的类型
- 函数类型 function

- 类型断言 Type Assertion
  - 绕过编译器类型推断, 手动指定类型
- 声明文件
- 内置对象: https://github.com/Microsoft/TypeScript/tree/master/src/lib
*/
/*
 data type: boolean
*/
var isDone = false;
// new Boolean() 创建的对象是 Boolean 对象, 不是 boolean type
var createdByNewBoolean = new Boolean(1);
// err: Type 'Boolean' is not assignable to type 'boolean'.
// 'boolean' is a primitive, but 'Boolean' is a wrapper object.
// 但直接调用 Boolean 返回的是 boolean 类型
var createdByBoolean = Boolean(1);
/*
data type: number
*/
var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法, 会被编译为十进制数字
var binaryLiteral = 10;
// ES6 中的八进制表示法, 会被编译为十进制数字
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;
/*
data type: string
*/
var myName = 'bambooom';
var myAge = 28;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".\nI'll be " + (myAge + 1) + " years old in August.";
/*
data type: 空值/null/undefined
*/
// 用 void 表示
function alertName() {
    alert('My name is bambooom');
}
// 声明一个 void 类型的变量没有什么用，
// 因为你只能将它赋值为 undefined 和 null
var unusable = undefined;
// undefined 和 null 是所有类型的子类型
// 没有问题
var num = undefined;
// 没有问题
var un;
var number = un;
// 但 void 不可以, 例如:
var u;
var numb = u;
// err: Type 'void' is not assignable to type 'number'
/*
any 类型 -> 允许被赋值为任意类型
*/
var favoriteNumber = 'seven';
favoriteNumber = 7;
// any 之任性: 允许访问任何属性, 允许调用任何方法
var anyThing = 'hello';
console.log(anyThing.whatIsThis);
console.log(anyThing.whatIsThis.whatIsThat);
anyThing.sayHello();
// 不声明类型, TS2.1 前则默认为 any
// TS2.1 开始, 对最后一次赋值来检查类型
var something; // something: any
something = 'seven';
something = 7;
something.setName('Jerry Lee');
/* Type Inference 类型推论 */
// 即没有明确指定时, 进行推测
var anotherNumber = 'eight'; // <- 推论, anotherNumber: string
anotherNumber = 8;
// err: Type 'number' is not assignable to type 'string'
/*
Union Types
*/
var maybeANumber;
maybeANumber = 'seven';
maybeANumber = 7;
// 只能访问类型共有的属性和方法
function getLength(something) {
    var length = something.length;
    // err: Property 'length' does not exist on type 'string|number'.
    var toStr = something.toString();
    // ok!
    return length;
}
// Union Type 在赋值后被推断类型
var bNumber;
bNumber = 'seven';
console.log(bNumber.length); // 5
bNumber = 7;
console.log(bNumber.length); //error
// 加问号表示可选属性, 可以不存在该属性
var bambooom = {
    id: 666666,
    name: 'bamboo',
    age: 28,
    website: 'http://bambooom.github.io'
};
// error: 确定属性和可选属性必须是任意属性的子集
// 如果前面定义了任意属性的值是 string, 则所有属性的值都应该是 string
// 但是 age 设置为了 number -> incompatible
bambooom.id = 77777;
// error: readonly 属性在初始化后不能再被赋值
// 且 readonly 属性的初始化是在第一次给对象赋值时
// 并不是第一次给只读属性赋值时
/*
data type: array 数组
*/
var fibonacci = [1, 1, 2, 3, 5];
var anotherFi = [1, '1', 2, 3, 5];
// error: -> (number}string)[]
/* 泛型 Generic:　Array<elemType> */
var genericFi = [1, 1, 2, 3, 5];
var oneFi = [1, 1, 2, 3, 5];
// array-like object 不是数组
/* function
- function declaration
function sum(x,y){
  return x + y;
}
- function expression
let sumFunc = function(x,y){
  return x + y;
}
*/
// 函数需要考虑输入和输出两方面的类型
// y 为可选参数, 必须在必需参数后面
function sum(x, y) {
    return x + y;
}
// 若参数有默认值, 则自动识别为可选参数, 且不受位置限制
var sunFunc = function (x, y) {
    if (x === void 0) { x = 7; }
    return x + y;
};
var aSearchFunc;
aSearchFunc = function (source, keyword) {
    return source.search(keyword) !== -1;
};
// ...rest 参数获取其他参数, 且必须放在最后
function push(array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (element) {
        array.push(element);
    });
}
var a = [];
push(a, 1, 2, 3); //a = [1,2,3]
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
/* 类型断言
- 在需要断言的变量前加上 <Type>
  <类型>值
or
  值 as 类型 (React 的 JSX 的 ts 版本中必须使用这种)
*/
function getStrOrNumLength(something) {
    if (something.length) {
        return something.length;
    }
    else {
        return something.toString().length;
    }
}
jQuery('#foo');
// 声明文件会单独放在一个文件中
// -> jQuery.d.ts
/// 三斜线开头表示引用了声明文件
/// <reference types="react" />
// 需要安装对应的声明模块
// npm install @types/jquery --save-dev 
