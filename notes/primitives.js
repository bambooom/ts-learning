/*
- 原始数据类型:  Primitive data types
    - boolean
    - number
    - string
    - null
    - undefined
    - ES6 Symbol
    - any
- 对象类型 Object types
- Union Types: 取值可多种类型
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
