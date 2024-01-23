import type { ContextType, Dispatch, FC, PropsWithChildren, SVGAttributes, SetStateAction } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

interface SVGProps {
    color?: string | string[];
}
type SVGIconProps = Omit<SVGAttributes<SVGElement>, 'color'> & SVGProps;

type SvgComponent = FC<SVGIconProps>;

const PageStoreContext = createContext(
    {} as {
        svgComponent: { name: string; component: SvgComponent } | null;
        dispatchSvgComponent: Dispatch<SetStateAction<{ name: string; component: SvgComponent } | null>>;
        svgProps: SVGProps;
        dispatchSvgProps: (input: Partial<SVGProps>) => void;
        svgElement: HTMLElement | null;
        dispatchSvgElement: Dispatch<SetStateAction<HTMLElement | null>>;
    },
);

type PageStoreType = ContextType<typeof PageStoreContext>;

export const usePageStoreContext = () => {
    return useContext(PageStoreContext);
};

export const PageStore: FC<PropsWithChildren> = ({ children }) => {
    const [svgComponent, dispatchSvgComponent] = useState<PageStoreType['svgComponent']>(null);

    const [svgProps, setSvgProps] = useState<PageStoreType['svgProps']>({});
    const dispatchSvgProps: PageStoreType['dispatchSvgProps'] = useCallback((input) => {
        setSvgProps((prev) => ({ ...prev, ...input }));
    }, []);

    const [svgElement, dispatchSvgElement] = useState<PageStoreType['svgElement']>(null);

    return (
        <PageStoreContext.Provider
            value={{
                svgComponent,
                dispatchSvgComponent,
                svgProps,
                dispatchSvgProps,
                svgElement,
                dispatchSvgElement,
            }}
        >
            {children}
        </PageStoreContext.Provider>
    );
};
