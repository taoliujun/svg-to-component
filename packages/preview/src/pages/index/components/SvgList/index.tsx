import classNames from 'classnames';
import type { FC } from 'react';
import { Suspense, useEffect } from 'react';
import type { SVGIconProps } from '@/svgComponents/utils/types';
import { usePageStoreContext } from '../PageStore';

const components = require.context('@/svgComponents/', true, /\w+\/index\.tsx/, 'sync');

const files = components.keys().map((v) => {
    const path = v.substring(2, v.length - 'index.tsx'.length - 1);
    // 组件可能位于子目录下，导出名只取最后一段（文件夹名即组件名）
    const name = path.split('/').pop() as string;

    return {
        path,
        name,
        component: (components(v) as Record<string, FC<SVGIconProps>>)[name],
    };
});

export const SvgList: FC = () => {
    const { svgComponent, dispatchSvgComponent } = usePageStoreContext();

    useEffect(() => {
        if (files?.length) {
            dispatchSvgComponent({ name: files[0].name, component: files[0].component });
        }
    }, [dispatchSvgComponent]);

    return (
        <Suspense fallback={<div />}>
            <div className="flex h-full flex-wrap content-start gap-x-1 overflow-auto bg-black/10">
                {files.map((v) => {
                    const CurrentIcon = v.component;

                    return (
                        <div
                            key={v.path}
                            className={classNames(
                                'w-[160px] py-4 text-center',
                                CurrentIcon === svgComponent?.component && 'bg-black/5',
                            )}
                        >
                            <button
                                className="flex h-10 w-full items-center justify-center"
                                onClick={() => {
                                    dispatchSvgComponent({ name: v.name, component: CurrentIcon });
                                }}
                            >
                                <CurrentIcon className="text-4xl text-gray-600" />
                            </button>
                            <p className="mt-2">{v.path}</p>
                        </div>
                    );
                })}
            </div>
        </Suspense>
    );
};
