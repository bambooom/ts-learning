/**
 * class 类 
 **/
// 三种访问修饰符 Access Modifiers
class Animal {
    // private -> 私有属性/方法, 不能再声明它的类的外部访问
    // private 在子类中也不允许访问
    // protected 与 private 类似, 但可在子类中访问
    private name;
    // public -> 共有属性或方法, 默认所有都是 public
    public constructor(name) {
        this.name = name;
    }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
// err: Property 'name' is private and only accessible within class 'Animal'.

/** 
 * abstract - 定义抽象类和其中的抽象方法 
 **/
abstract class AnimalB {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}
// 抽象类不允许被实例化
// 所以不能直接使用: let a = new AnimalB('Jack')

// 抽象类的抽象方法必须被子类实现
class Cat extends AnimalB {
  // sayHi function 必须被子类实现, 若未实现这个方法将会报错
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`);
  }
}

let cat = new Cat('Tom');

// 给类加上 TS 的类型, 与接口类似
class AnimalC {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new AnimalC('Jack');
console.log(a.sayHi()); // My name is Jack

/** 
 * implements 实现, 不同类的共有特性提取成接口
*/
interface Alarm{
    alert();
}
interface Light {
    lightOn();
    lightOff();
}
// 接口之间也可以继承
interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}

class Door{
}
// 防盗门是门的子类, 给防盗门添加报警器功能
class SecurityDoor extends Door implements Alarm{
    alert(){
        console.log('SecurityDoor Alert');
    }
}
// 也给车添加报警器, 车灯功能
class Car implements Alarm, Light{
    alert(){
        console.log('Car Alert!');
    }
    lightOn(){
        console.log('Car light on');
    }
    lightOff(){
        console.log('Car light off');
    }
}

// 接口继承类
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};

// 混合类型
// 函数有自己的属性和方法
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;


/** 
 * Generics 泛型: 定义函数/接口/类时, 不预先指定具体类型, 在使用时再指定
*/
// 需要保证输入的是什么类型, 返回的也应是相同类型-> <T>
function createArray<T>(length: number, value: T): Array<T> {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
// 调用时指定具体为 string, 也可以不用指定, 留给类型推论
createArray<string>(3, 'x'); // ['x', 'x', 'x']

// 若有多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
  console.log(tuple[1].length);
  // error: 泛型 T 不一定包含属性 length, 所以不能随意操作它的属性或方法
  return [tuple[1], tuple[0]];
}
swap([7, 'seven']); // ['seven', 7]

// **泛型约束**: 
// 可约束只允许包含 length 的参数
interface Lengthwise {
  length: number;
}
// T extends Lengthwise: T 必须符合 Lengthwise的形状, 也就是必须包含 length
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 使用含有泛型的接口来定义函数的形状
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}
// 使用泛型接口的时候, 需要定义泛型的类型, 例如这里的<any>
let createArrayB: CreateArrayFunc<any>;
createArrayB = function<T>(length: number, value: T): Array<T> {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']

// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };