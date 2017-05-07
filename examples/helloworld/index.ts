class Greeting {
    // 没有这个声明, 报错: this.message 处, Property 'message' does not exist on type 'Greeting'
    public message: string;
    constructor(message: string){
        this.message = message;
    }
    // 返回的是纯 HTML
    greet(){
        return `<h2>${this.message}</h2>`;
    }
}
// 新实例
var helloWorld = new Greeting('Hello World!');
// HTML 插入 document 中
document.body.innerHTML = helloWorld.greet();