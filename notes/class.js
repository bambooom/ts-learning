var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * class 类
 **/
// 三种访问修饰符 Access Modifiers
var Animal = (function () {
    // public -> 共有属性或方法, 默认所有都是 public
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
// err: Property 'name' is private and only accessible within class 'Animal'.
/**
 * abstract - 定义抽象类和其中的抽象方法
 **/
var AnimalB = (function () {
    function AnimalB(name) {
        this.name = name;
    }
    return AnimalB;
}());
// 抽象类不允许被实例化
// 所以不能直接使用: let a = new AnimalB('Jack')
// 抽象类的抽象方法必须被子类实现
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // sayHi function 必须被子类实现, 若未实现这个方法将会报错
    Cat.prototype.sayHi = function () {
        console.log("Meow, My name is " + this.name);
    };
    return Cat;
}(AnimalB));
var cat = new Cat('Tom');
// 给类加上 TS 的类型, 与接口类似
var AnimalC = (function () {
    function AnimalC(name) {
        this.name = name;
    }
    AnimalC.prototype.sayHi = function () {
        return "My name is " + this.name;
    };
    return AnimalC;
}());
var a = new AnimalC('Jack');
console.log(a.sayHi()); // My name is Jack
var Door = (function () {
    function Door() {
    }
    return Door;
}());
// 防盗门是门的子类, 给防盗门添加报警器功能
var SecurityDoor = (function (_super) {
    __extends(SecurityDoor, _super);
    function SecurityDoor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecurityDoor.prototype.alert = function () {
        console.log('SecurityDoor Alert');
    };
    return SecurityDoor;
}(Door));
// 也给车添加报警器, 车灯功能
var Car = (function () {
    function Car() {
    }
    Car.prototype.alert = function () {
        console.log('Car Alert!');
    };
    Car.prototype.lightOn = function () {
        console.log('Car light on');
    };
    Car.prototype.lightOff = function () {
        console.log('Car light off');
    };
    return Car;
}());
// 接口继承类
var Point = (function () {
    function Point() {
    }
    return Point;
}());
var point3d = { x: 1, y: 2, z: 3 };
function getCounter() {
    var counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
/**
 * Generics 泛型: 定义函数/接口/类时, 不预先指定具体类型, 在使用时再指定
*/
// 需要保证输入的是什么类型, 返回的也应是相同类型-> <T>
function createArray(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
// 调用时指定具体为 string, 也可以不用指定, 留给类型推论
createArray(3, 'x'); // ['x', 'x', 'x']
// 若有多个类型参数
function swap(tuple) {
    console.log(tuple[1].length);
    // error: 泛型 T 不一定包含属性 length, 所以不能随意操作它的属性或方法
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']); // ['seven', 7]
// T extends Lengthwise: T 必须符合 Lengthwise的形状, 也就是必须包含 length
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
// 使用泛型接口的时候, 需要定义泛型的类型, 例如这里的<any>
var createArrayB;
createArrayB = function (length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
};
createArray(3, 'x'); // ['x', 'x', 'x']
// 泛型类
var GenericNumber = (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
