import type { SVGAttributes } from 'react';

interface SVGIconProps extends Omit<SVGAttributes<SVGElement>, 'color'> {
    color?: string | string[];
}

export type { SVGIconProps };
