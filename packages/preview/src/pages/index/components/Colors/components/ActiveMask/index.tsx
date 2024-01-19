import { FC } from 'react';
import { useStoreContext } from '../Store';

export const ActiveMask: FC = () => {
    const { maskStyles } = useStoreContext();

    return (
        <>
            {maskStyles.map((v, k) => {
                return (
                    <div
                        key={k}
                        style={{
                            position: 'fixed',
                            backgroundColor: 'rgba(59, 130, 240, 0.5)',
                            border: '1px dashed rgba(255, 255, 255, 0.5)',
                            zIndex: Number.MAX_SAFE_INTEGER - 1000 + k,
                            ...v,
                        }}
                    />
                );
            })}
        </>
    );
};
