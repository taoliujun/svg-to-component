import type { FC } from 'react';
import { useMemo, useRef, useState } from 'react';
import { ActiveMask } from './components/ActiveMask';
import { ColorControl } from './components/ColorControl';
import { Mode } from './components/Mode';
import type { StoreType } from './components/Store';
import { ModeEnum, StoreContext } from './components/Store';

export const Colors: FC = () => {
    const [singColors, dispatchSingColors] = useState<StoreType['singColors']>([]);
    const [groupColors, dispatchGroupColors] = useState<StoreType['groupColors']>([]);
    const [multiColors, dispatchMultiColors] = useState<StoreType['multiColors']>([]);

    const groupColorsIndexMap = useRef<StoreType['groupColorsIndexMap']['current']>({});

    const [mode, dispatchMode] = useState<StoreType['mode']>(ModeEnum.SINGLE);

    const isSingle = useMemo(() => mode === ModeEnum.SINGLE, [mode]);
    const isGroup = useMemo(() => mode === ModeEnum.GROUP, [mode]);
    const isMulti = useMemo(() => mode === ModeEnum.MULTI, [mode]);

    const [maskStyles, dispatchMaskStyles] = useState<StoreType['maskStyles']>([]);

    return (
        <StoreContext.Provider
            value={{
                singColors,
                dispatchSingColors,
                groupColors,
                dispatchGroupColors,
                multiColors,
                dispatchMultiColors,
                groupColorsIndexMap,
                mode,
                dispatchMode,
                isSingle,
                isGroup,
                isMulti,
                maskStyles,
                dispatchMaskStyles,
            }}
        >
            <Mode />
            <ColorControl />
            <ActiveMask />
        </StoreContext.Provider>
    );
};
