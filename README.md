# TypeScript 学习

```
|____notes (语法笔记)
|____examples (两个官网例子)
| |____helloworld (最简单的 hello world)
| |____react (使用 react 的 hello world)
|____README.md
|____node_modules (ignored)
|____public
| |____index.html (页面真正入口)
|____build (ignored, 生产环境代码 bundle.js 等)
|____src (实际主要 coding 文件夹)
| |____App.css
| |____App.test.tsx
| |____App.tsx
| |____index.css
| |____index.tsx
| |...
|____tsconfig.json
|____tslint.json
|____yarn.lock
```

## env
### 安装
```bash
$ npm install -g typescript
```
### 编译
```bash
$ tsc hello.ts
```
-> hello.js 为编译结果

### 编辑器
我的选择是 [Visual Studio Code](https://code.visualstudio.com/):
- 和 TypeScript 本身一样, 都是微软家出的, 内置 Typescript 支持
- 编辑器本身也是用 TypeScript 写的
- 轻量级
- 也挺好看的~

## demo
- 目标: trading demo
- url: https://bambooom.github.io/ts-learning/

### 进展
#### 17.5.7 init demo

```
$ create-react-app my-app --scripts-version=react-scripts-ts
```

~平时用习惯了的 `create-react-app` 原来有 TypeScript 版本
- 且已经启用了 `yarn` 来管理包
- 预设好了 `tsconfig.json` 和 `tslint.json` 配置文件
- 和普通一样使用 `npm start` 即可在 `http://localhost:3000/` 中看到 demo 页面

#### 17.5.13 deploy

deploy 方法:
- `package.json` 中添加 `"homepage": "https://bambooom.github.io/ts-learning/",`
- `yarn add --dev gh-pages`
- `package.json` 中添加:
```
    // ...
    "scripts": {
      // ...
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
    }
```
- `yarn run deploy`

#### 17.5.21 页面基本完成
- 基本页面结构/样式确定
- TODO:
  - [x] 从某个远端获取 init 数据 (使用 [jsonbin](https://jsonbin.org/) 模拟)
  - ~~设定定时任务, 任意更新股价信息等~~
  - [x] 页面数据处理逻辑, 即基本买卖功能实现

#### 17.5.23 data from remote
- 使用 [jsonbin](https://jsonbin.org/) 简单存储 `data.json` 中数据作为初始数据
  - api: https://jsonbin.org/bambooom/ts-trading-demo-data
- App 中在 `ComponentDidMount` 时通过 `fetch` 获取 remote data 并存入 state
  - 参考: 
    * [使用 Fetch - Web API 接口 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
    * [Fetch API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

#### 17.5.26 基本买卖功能完成
- jsonbin 不太稳定, 使用 myjson.com 为备用
  - 缺点是修改之后, url 也会变更
- 基于条件判断完成业务逻辑, 不够优雅
- 定时任务较复杂, 暂时放弃
- deploy version 1.0.0
- TODO:
  - [ ] 取消订单