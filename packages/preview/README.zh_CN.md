[中文](https://github.com/taoliujun/svg-to-component/blob/master/packages/preview/README.zh_CN.md) | [English](https://github.com/taoliujun/svg-to-component/blob/master/packages/preview/README.en_US.md)

[![npm](https://img.shields.io/npm/v/svg-to-component-preview.svg)](https://www.npmjs.com/package/svg-to-component-preview)

运行svg预览器。

![image](https://cdn.jsdelivr.net/gh/taoliujun/svg-to-component/assets/readme/preview.png)

## 安装

### NPM

```bash
npm add svg-to-component-preview
```

## 使用

-   返回模块路径，和预览svg组件的临时存储目录

```javascript
import { packagePath, componentsPath } from 'svg-to-component-preview';

console.log(packagePath, componentsPath);

// 启动预览
spawn(`pnpm`, ['run', 'start'], {
    cwd: previewPackagePath,
    stdio: 'inherit',
});
```
