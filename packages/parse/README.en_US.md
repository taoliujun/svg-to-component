[中文](https://github.com/taoliujun/svg-to-component/blob/master/packages/parse/README.zh_CN.md) | [English](https://github.com/taoliujun/svg-to-component/blob/master/packages/parse/README.en_US.md)

[![npm](https://img.shields.io/npm/v/svg-to-component-parse.svg)](https://www.npmjs.com/package/svg-to-component-parse)

Convert the SVG code to the React component code.

## Installation

### NPM

```bash
npm add svg-to-component-parse
```

## Usage

-   Convert the SVG code to the React component code.

```javascript
import { generateReact } from 'svg-to-component-parse';

const result = generateReact('YourComponentName', '<svg>...your svg code</svg>');
```

-   Get the code of the related module of the React component

The helper and utils modules are referenced in the React component code, and this method provides the code and relative paths of these modules.

```javascript
import { generateComponentUtils } from 'svg-to-component-parse';

const result = generateComponentUtils();
```
