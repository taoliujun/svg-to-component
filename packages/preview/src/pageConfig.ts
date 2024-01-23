import { trim } from 'lodash';
import type { PageConfig } from '@/../config/pageConfig';

const distPath = '';

/** 编译配置 */
export const pageConfig: PageConfig = {
    title: 'svg preview',
    autoSizeUnit: 750,
    distPath,
    publicPath: '',
    devServer: {
        historyApiFallback: {
            index: distPath ? `/${trim(distPath, '/')}/` : '/',
        },
    },
};
