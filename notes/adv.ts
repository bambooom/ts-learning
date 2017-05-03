/**** Type aliases ****/ 

/* 类型别名 type */

type Name = string;
type NameResolver = ()=> string;
type NameOrResolver = Name | NameResolver;

function getName(name: NameOrResolver): Name {
    if (typeof name === 'string'){
        return name;
    } else {
        return name();
    }
}

/* 字符串字面量类型 type */
// 用来约束几个字符串中的一个
type FocusEventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: FocusEventNames) {
  // do something
}
handleEvent(document.getElementById('hello'), 'dbclick');
// error: dbclick not assigned in FocusEventNames

/**** Tuple ****/
// 不同类型对象的 array

let bamboo: [string, number] = ['bambooom', 28];
let bambooo: [string, number];
// 初始化赋值时, 需要提供所有类型中指定的项
bambooo = ['bambooom', 28];
bamboo.push('helloworld');
// helloworld 是越界元素, 必须满足 string | number
// 且被识别为联合类型,只能访问联合类型的共有属性或方法
console.log(bamboo[2].slice(1))
// error: slice does not exist on type 'string | number'

/**** 枚举 enum ****/

// 枚举赋值为0开始递增的数字, 一一映射
// 且可手动赋值, 其他跟着前一个递增
// 手动赋值可以不是数字, 使用类型断言让 tsc 无视类型检查
// 手动赋值可能造成覆盖的情况, 不会被 tsc 检测到, 需要自行注意
enum Days {Mon = 1, Tue, Wed, Thu, Fri, Sat, Sun = <any>"S"};
console.log(Days["Sun"] === 6); // true
console.log(Days["Mon"] === 0); // true
console.log(Days[6] === "Sun"); // true
console.log(Days[0] === "Mon"); // true 

// 枚举项可以是计算所得, 但是若其后是未手动赋值的项, 则会因为无法获得初始值报错
enum Color {Red = "red".length, Green, Blue};
// Green 和 Blue 无法获得初始值

// 常数枚举, 不能包含计算成员, 否则报错
const enum Directions {
  Up, //0
  Down, //1
  Left, //2
  Right //3
};
//普通枚举
enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}
// 外部枚举 Ambient Enums
// 常出现在声明文件中
declare enum Direct {
  Up,
  Down,
  Left,
  Right
}