import type { FC } from 'react';
import { useMemo } from 'react';
import { ModeEnum, useStoreContext } from '../Store';

export const Mode: FC = () => {
    const { mode, dispatchMode } = useStoreContext();

    const modes: {
        value: ModeEnum;
        label: string;
    }[] = useMemo(() => {
        return [
            { value: ModeEnum.SINGLE, label: 'single' },
            { value: ModeEnum.GROUP, label: 'group' },
            { value: ModeEnum.MULTI, label: 'multi' },
        ];
    }, []);

    return (
        <div className="flex items-center gap-4 p-2">
            {modes.map((v) => {
                return (
                    <label key={v.value} className="label inline-flex cursor-pointer items-center">
                        <input
                            type="radio"
                            name="mode"
                            className="radio mr-1"
                            value={v.value}
                            checked={v.value === mode}
                            onChange={() => {
                                dispatchMode(v.value);
                            }}
                        />
                        <span className="label-text">
                            <span className="capitalize">{v.label}</span>&nbsp;Color
                        </span>
                    </label>
                );
            })}
        </div>
    );
};
