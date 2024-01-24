import type { FC } from 'react';
import { getColor } from '../utils/helper';
import type { SVGIconProps } from '../utils/types';

export const CloseOutlined: FC<SVGIconProps> = ({ color, ...props }) => {
    return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1em" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0001 13.0608L18.4421 19.5027L19.5027 18.4421L13.0608 12.0001L19.5031 5.55773L18.4425 4.49707L12.0001 10.9394L5.55773 4.49707L4.49707 5.55773L10.9394 12.0001L4.49747 18.4421L5.55813 19.5027L12.0001 13.0608Z"
                fill={getColor(color, 1, 'currentColor')}
            />
        </svg>
    );
};
CloseOutlined.defaultProps = {
    color: ['currentColor'],
};
