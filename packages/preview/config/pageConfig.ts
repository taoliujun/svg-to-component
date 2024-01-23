import type { WebpackOptionsNormalized } from 'webpack';

/** 页面配置项 */
export interface PageConfig {
    /** 标题 */
    title?: string;
    /**
     * 页面路径
     * @description 默认根目录，注意：多个入口同时打包，则以第一个配置为准
     * @example admin/v2 则访问的是 https://yourDomain/admin/v2/pagePath/index.html
     */
    distPath?: string;
    /**
     * 静态资源部署目录
     * @description 相对于distPath，默认/static，注意：多个入口同时打包，则以第一个配置为准
     * @example assets 则访问的是 https://yourDomain/distPath/assets/chunkFile.ext
     */
    publicPath?: string;
    /** 模版变量 */
    templateParameters?:
        | Record<
              /** 数据统计 */
              'dataTrack',
              string
          >
        | Record<string, string>;
    /**
     * 自适应viewport的基准宽度
     * @description 默认不开启，注意：多个入口同时打包，则以第一个配置为准
     */
    autoSizeUnit?: number;
    /** devServer */
    devServer?: NonNullable<WebpackOptionsNormalized['devServer']>;
}
