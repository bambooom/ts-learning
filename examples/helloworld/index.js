/**
 * 编译后的 js 文件
 **/

var Greeting = (function() {
    function Greeting(message) {
        this.message = message;
    }
    // 返回的是纯 HTML
    Greeting.prototype.greet = function() {
        return "<h2>" + this.message + "</h2>";
    };
    return Greeting;
}());
// 新实例
var helloWorld = new Greeting('Hello World!');
// HTML 插入 document 中
document.body.innerHTML = helloWorld.greet();