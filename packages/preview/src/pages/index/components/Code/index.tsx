import { useBoolean, useTimeout } from 'ahooks';
import type { FC } from 'react';
import { useMemo } from 'react';
import { usePageStoreContext } from '../PageStore';

const CopySuccess: FC<{ onHide?: () => void }> = ({ onHide }) => {
    useTimeout(() => {
        onHide?.();
    }, 1500);

    return <span className="text-green-600">Copy Successfully.</span>;
};

export const Code: FC = () => {
    const { svgComponent, svgProps } = usePageStoreContext();

    const colors = useMemo(() => {
        return svgProps.color;
    }, [svgProps.color]);

    const code = useMemo(() => {
        const colorString = colors ? `color={${JSON.stringify(colors)}}` : '';
        return `<${svgComponent?.name} ${colorString} />`;
    }, [colors, svgComponent?.name]);

    const [copyShow, copyShowToggle] = useBoolean();

    return (
        <div className="p-2 leading-none">
            <textarea className="w-full border border-solid border-gray-400 p-1" rows={5} readOnly value={code} />
            <div className="mt-2 flex items-center gap-x-2">
                <button
                    className="bg-green-600 px-4 py-2 text-base font-medium text-white hover:bg-green-700 active:bg-green-800"
                    onClick={() => {
                        window.navigator.clipboard.writeText(code).then(copyShowToggle.setTrue);
                    }}
                >
                    Copy React Code
                </button>
                {copyShow && <CopySuccess onHide={copyShowToggle.setFalse} />}
            </div>
        </div>
    );
};
