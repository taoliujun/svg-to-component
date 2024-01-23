import fs from 'fs';
import path from 'path';
import type { PageConfig } from '../pageConfig';

// 源码目录
const SourcePath = path.resolve(`src`);
// 默认html模板
const DefaultTemplate = path.join(SourcePath, 'layout/default.html');

export const nodeModules = 'node_modules';

// 根据npm包的路径获取包名
export const getNpmNameWithPath = (filePath: string): string => {
    if (!filePath?.includes(nodeModules)) {
        return '';
    }
    const paths = filePath.split('/');
    return paths[paths.indexOf(nodeModules) + 1] || '';
};

// 获取页面配置
const getPageConfig = (filePath: string): PageConfig | null => {
    const file = path.join(filePath, 'pageConfig.ts');

    if (!fs.existsSync(file)) {
        return null;
    }

    // eslint-disable-next-line
    const { pageConfig } = require(file);

    return pageConfig as PageConfig;
};

/** page的打包配置 */
interface PageBundleConfig {
    entry: string;
    chunk: string;
    template: string;
    filename: string;
    config: ReturnType<typeof getPageConfig>;
}

/** 获取入口 */
export const getEntryFile = (): PageBundleConfig => {
    const currentPagePath = SourcePath;

    const template = DefaultTemplate;

    return {
        entry: path.join(currentPagePath, 'index.tsx'),
        chunk: `main`,
        template,
        filename: `index.html`,
        config: getPageConfig(currentPagePath),
    };
};
