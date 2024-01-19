import {
    CSSProperties,
    ContextType,
    Dispatch,
    MutableRefObject,
    SetStateAction,
    createContext,
    useContext,
} from 'react';

export enum ModeEnum {
    SINGLE,
    GROUP,
    MULTI,
}

export const StoreContext = createContext(
    {} as {
        singColors: string[];
        dispatchSingColors: Dispatch<SetStateAction<string[]>>;
        groupColors: string[];
        dispatchGroupColors: Dispatch<SetStateAction<string[]>>;
        multiColors: string[];
        dispatchMultiColors: Dispatch<SetStateAction<string[]>>;

        groupColorsIndexMap: MutableRefObject<Record<number, number[]>>;

        mode: ModeEnum;
        dispatchMode: Dispatch<SetStateAction<ModeEnum>>;

        isSingle: boolean;
        isGroup: boolean;
        isMulti: boolean;

        maskStyles: CSSProperties[];
        dispatchMaskStyles: Dispatch<SetStateAction<CSSProperties[]>>;
    }
);

export type StoreType = ContextType<typeof StoreContext>;

export const useStoreContext = () => {
    return useContext(StoreContext);
};
