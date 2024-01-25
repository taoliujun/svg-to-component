[中文](https://github.com/taoliujun/svg-to-component/blob/master/README.zh_CN.md) | [English](https://github.com/taoliujun/svg-to-component/blob/master/README.en_US.md)

本项目实现以下功能：

-   [CLI](./packages/cli/)，提供命令行工具：
    -   调用parse功能，将SVG文件转换为React组件文件。
    -   调用preview功能，预览SVG文件。
    -   查看 [README](./packages/cli/README.md)。
    -   查看 [CHANGELOG](./packages/cli/CHANGELOG.md)。
-   [parse](./packages/parse/)，将SVG代码转换为React代码，且支持配置多色。
    -   查看 [README](./packages/parse/README.md)。
    -   查看 [CHANGELOG](./packages/parse/CHANGELOG.md)。
-   [preview](./packages/preview/)，在浏览器中预览SVG文件，并可交互后复制组件代码。
    -   查看 [README](./packages/preview/README.md)。
    -   查看 [CHANGELOG](./packages/preview/CHANGELOG.md)。

对于普通使用者，使用CLI包即可。具体使用见各包的README。
