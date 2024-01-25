[中文](https://github.com/taoliujun/svg-to-component/blob/master/packages/parse/README.zh_CN.md) | [English](https://github.com/taoliujun/svg-to-component/blob/master/packages/parse/README.en_US.md)

[![npm](https://img.shields.io/npm/v/svg-to-component-parse.svg)](https://www.npmjs.com/package/svg-to-component-parse)

SVG代码转React组件代码。

## 安装

### NPM

```bash
npm add svg-to-component-parse
```

## 使用

-   SVG代码转React组件代码

```javascript
import { generateReact } from 'svg-to-component-parse';

const result = generateReact('YourComponentName', '<svg>...your svg code</svg>');
```

-   获取React组件代码的helper包

React组件代码中引用了helper、utils模块，本方法提供了这些模块的代码和相对路径。

```javascript
import { generateComponentUtils } from 'svg-to-component-parse';

const result = generateComponentUtils();
```
