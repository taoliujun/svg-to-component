const getColor = (color: string | string[] | undefined, index: number, defaultColor: string) => {
    if (color === undefined) {
        return defaultColor;
    }

    const colorType = typeof color;
    const colorLen = color?.length;

    if (colorType === 'string') {
        return color as string;
    }

    if (colorType === 'object' && colorLen) {
        return color[index - 1] || defaultColor;
    }

    return defaultColor;
};

export { getColor };
