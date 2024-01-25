import type { FC } from 'react';

export const Header: FC = () => {
    return (
        <div className="flex h-16 items-center border-b border-solid border-b-slate-200 shadow-md">
            <span className="ml-2 text-2xl font-bold">Preview SVG</span>
        </div>
    );
};
