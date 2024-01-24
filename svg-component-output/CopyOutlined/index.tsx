import type { FC } from 'react';
import { getColor } from '../utils/helper';
import type { SVGIconProps } from '../utils/types';

export const CopyOutlined: FC<SVGIconProps> = ({ color, ...props }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill={getColor(color, 1, 'none')}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            {...props}
        >
            <path
                d="M7 9.25H12.5C13.74 9.25 14.75 10.26 14.75 11.5V17C14.75 18.24 13.74 19.25 12.5 19.25H7C5.76 19.25 4.75 18.24 4.75 17V11.5C4.75 10.26 5.76 9.25 7 9.25Z"
                stroke={getColor(color, 2, 'currentColor')}
                strokeWidth="1.5"
            />
            <path
                d="M9.25 7C9.25 5.76 10.26 4.75 11.5 4.75"
                stroke={getColor(color, 3, 'currentColor')}
                strokeWidth="1.5"
            />
            <path
                d="M17 14.75C18.24 14.75 19.25 13.74 19.25 12.5"
                stroke={getColor(color, 4, 'currentColor')}
                strokeWidth="1.5"
            />
            <path
                d="M19.25 7C19.25 5.76 18.24 4.75 17 4.75"
                stroke={getColor(color, 5, 'currentColor')}
                strokeWidth="1.5"
            />
            <path d="M19.25 8.5V11" stroke={getColor(color, 6, 'currentColor')} strokeWidth="1.5" />
            <path d="M13 4.75H15.5" stroke={getColor(color, 7, 'currentColor')} strokeWidth="1.5" />
        </svg>
    );
};
CopyOutlined.defaultProps = {
    color: ['none', 'currentColor', 'currentColor', 'currentColor', 'currentColor', 'currentColor', 'currentColor'],
};
