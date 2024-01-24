import type { FC } from 'react';
import { getColor } from '../utils/helper';
import type { SVGIconProps } from '../utils/types';

export const InfoOutlined: FC<SVGIconProps> = ({ color, ...props }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill={getColor(color, 1, 'none')}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            {...props}
        >
            <path
                d="M12 19.3125C16.0386 19.3125 19.3125 16.0386 19.3125 12C19.3125 7.96142 16.0386 4.6875 12 4.6875C7.96142 4.6875 4.6875 7.96142 4.6875 12C4.6875 16.0386 7.96142 19.3125 12 19.3125Z"
                stroke={getColor(color, 2, 'currentColor')}
                strokeWidth="1.5"
                strokeMiterlimit="10"
            />
            <path d="M12 7V8.5" stroke={getColor(color, 3, 'currentColor')} strokeWidth="1.5" strokeMiterlimit="10" />
            <path d="M12 10V17" stroke={getColor(color, 4, 'currentColor')} strokeWidth="1.5" strokeMiterlimit="10" />
        </svg>
    );
};
InfoOutlined.defaultProps = {
    color: ['none', 'currentColor', 'currentColor', 'currentColor'],
};
