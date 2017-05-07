## Typescript React example

~ [官网 tutorial](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)

### Setup

```
proj/
├─ dist/
└─ src/
   └─ components/
```

- TypeScript 文件再 `src` 下
- 通过 `webpack` 将所有代码以及相关的第三方包打包在一个 `bundle.js` 文件中, 放在 `dist` 文件夹下 
- `npm init` 初始化 `package.json`
- `npm install -g webpack` 全局安装 `webpack``
- `npm install --save react react-dom @types/react @types/react-dom`
    - 安装 `react` 及 `react-dom`
    - `@types/*` 是第三方包的声明文件
    - 通常会直接在项目内部寻找是否存在声明文件, 若不存在则会寻找 `@types/*`
- `npm install --save-dev typescript awesome-typescript-loader source-map-loader`
    - 安装开发中需要的依赖包
    - `awesome-typescript-loader` 是让 webpack 使用 `tsconfig.json` 中的配置来编译 ts 文件
    - `source-map-loader` 是使用 sourcemap 告诉 webpack 生成自己的 scouremap(?)
- 添加 `tsconfig.json` 配置文件
- coding
    - 添加组件...
        - 使用 JSX 需要给文件的扩展名为 `.tsx`
    - 添加 `index.html`
- 添加 webpack 配置文件 `webpack.config.js`
    - 主要为 namspace pattern
    - 即 module 把自己放到一个全局变量名下
- `webpack` 直接一个命令打包
- 打开 `index.html` 即可看到结果