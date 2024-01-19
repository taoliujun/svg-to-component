import classNames from 'classnames';
import { FC, Suspense, useEffect } from 'react';
import { usePageStoreContext } from '../PageStore';

const components = require.context('@/svgComponents/', true, /\w+\/index\.tsx/, 'sync');

const files = components.keys().map((v) => {
    const path = v.substring(2, v.length - 'index.tsx'.length - 1);

    return {
        path,
        component: components(v)[path],
    };
});

export const SvgList: FC = () => {
    const { svgComponent, dispatchSvgComponent } = usePageStoreContext();

    useEffect(() => {
        if (files?.length) {
            dispatchSvgComponent({ name: files[0].path, component: files[0].component });
        }
    }, [dispatchSvgComponent]);

    return (
        <Suspense fallback={<div />}>
            <div className="flex h-full flex-wrap content-start overflow-auto bg-black/10 gap-x-1">
                {files.map((v) => {
                    const CurrentIcon = v.component;
                    const name = v.path;

                    return (
                        <div
                            key={name}
                            className={classNames(
                                'w-[160px] py-4 text-center',
                                CurrentIcon === svgComponent?.component && 'bg-black/5'
                            )}
                        >
                            <button
                                className="w-full h-10 flex items-center justify-center"
                                onClick={() => {
                                    dispatchSvgComponent({ name, component: CurrentIcon });
                                }}
                            >
                                <CurrentIcon className="text-gray-600 text-4xl" />
                            </button>
                            <p className="mt-2">{name}</p>
                        </div>
                    );
                })}
            </div>
        </Suspense>
    );
};
