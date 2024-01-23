import type { CSSProperties, ContextType, Dispatch, FC, SetStateAction } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ColorPicker } from '../ColorPicker';
import { usePageStoreContext } from '../PageStore';

const StoreContext = createContext(
    {} as {
        styles: CSSProperties;
        dispatchStyles: (input: CSSProperties) => void;
        boxBackground: string;
        dispatchBoxBackground: Dispatch<SetStateAction<string>>;
    },
);

type StoreType = ContextType<typeof StoreContext>;

const useStoreContext = () => {
    return useContext(StoreContext);
};

const SvgRender: FC = () => {
    const { svgComponent, svgProps, dispatchSvgElement } = usePageStoreContext();
    const { styles } = useStoreContext();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dom = ref.current?.firstElementChild as HTMLElement;
        if (dom && svgComponent?.name) {
            dispatchSvgElement(dom);
        }
    }, [dispatchSvgElement, svgComponent?.name]);

    const SvgComponent = svgComponent?.component;

    if (!SvgComponent) {
        return null;
    }

    return (
        <div ref={ref}>
            <SvgComponent style={styles} {...svgProps} />
        </div>
    );
};

const FontSize: FC = () => {
    const { styles, dispatchStyles } = useStoreContext();

    const size = useMemo(() => {
        return (styles.fontSize as string).replace('px', '');
    }, [styles.fontSize]);

    return (
        <div className="inline-flex h-full items-center">
            size:&nbsp;
            <input
                className="range"
                type="range"
                min={20}
                max={400}
                value={size}
                onChange={(e) => {
                    dispatchStyles({
                        fontSize: `${e.target.value}px`,
                    });
                }}
            />
        </div>
    );
};

const Background: FC = () => {
    const { boxBackground, dispatchBoxBackground } = useStoreContext();

    return (
        <div className="inline-flex h-full items-center">
            background:&nbsp;
            <ColorPicker color={boxBackground} onChange={dispatchBoxBackground} />
        </div>
    );
};

export const Preview: FC = () => {
    const [styles, setStyles] = useState<StoreType['styles']>({
        fontSize: '200px',
    });
    const dispatchStyles: StoreType['dispatchStyles'] = useCallback((input) => {
        setStyles((prev) => {
            return {
                ...prev,
                ...input,
            };
        });
    }, []);

    const [boxBackground, dispatchBoxBackground] = useState<StoreType['boxBackground']>('#fff');

    return (
        <StoreContext.Provider value={{ styles, dispatchStyles, boxBackground, dispatchBoxBackground }}>
            <div className="flex h-full w-full flex-col">
                <div className="flex h-12 items-center gap-x-2 bg-black/5 px-2">
                    <FontSize />
                    <Background />
                </div>
                <div
                    className="flex flex-1 items-center justify-center overflow-auto"
                    style={{
                        background: boxBackground,
                    }}
                >
                    <SvgRender />
                </div>
            </div>
        </StoreContext.Provider>
    );
};
