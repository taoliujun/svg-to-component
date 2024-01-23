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
            <textarea className="ds-textarea ds-textarea-bordered w-full" readOnly value={code} />
            <div className="mt-2 flex items-center gap-x-2">
                <button
                    className="ds-btn ds-btn-primary ds-btn-sm"
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
