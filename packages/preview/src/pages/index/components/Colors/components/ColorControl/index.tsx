import { clone } from 'lodash';
import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ColorPicker } from '../../../ColorPicker';
import { usePageStoreContext } from '../../../PageStore';
import { useStoreContext } from '../Store';

/**
 * Get all the elements available under the SVG.
 * Use index and element to form key-value pairs.
 */
const getMultiElementsWithIndex = (element: HTMLElement) => {
    let allElements: Record<string, HTMLElement> = {};

    const childNodes = Array.from(element.childNodes) as HTMLElement[];

    childNodes.forEach((e) => {
        const previewObjs = (e.dataset || {}) as Record<string, string>;
        const previewKeys = Object.keys(previewObjs);
        const fineKey = previewKeys.find((v) => {
            return v.toLowerCase().startsWith('previewcolor') && v.toLowerCase().endsWith('index');
        });
        if (fineKey) {
            allElements[previewObjs[fineKey]] = e;
        }
        allElements = {
            ...allElements,
            ...getMultiElementsWithIndex(e),
        };
    });

    return allElements;
};

// reset colors
const useResetColors = () => {
    const { svgComponent, dispatchSvgProps } = usePageStoreContext();
    const { dispatchSingColors, dispatchGroupColors, dispatchMultiColors, groupColorsIndexMap } = useStoreContext();

    useEffect(() => {
        // The following syntax is just for the purpose of introducing variables and forming complete dependencies.
        if ((svgComponent?.component?.defaultProps?.color as unknown) !== false) {
            dispatchSvgProps({
                color: undefined,
            });
        }
    }, [dispatchSvgProps, svgComponent?.component?.defaultProps?.color]);

    const originColors = useMemo(() => {
        return (svgComponent?.component?.defaultProps?.color || ['currentColor']) as string[];
    }, [svgComponent?.component?.defaultProps?.color]);

    useEffect(() => {
        dispatchSingColors([originColors[0]]);
        dispatchMultiColors(originColors);
        dispatchGroupColors([...new Set(originColors)]);

        const maps: typeof groupColorsIndexMap.current = Object.fromEntries(
            [...new Set(originColors)].map((currentColor, currentKey) => {
                const indexes: number[] = [];
                originColors.forEach((v, k) => {
                    if (v === currentColor) {
                        indexes.push(k);
                    }
                });
                return [currentKey, indexes];
            }),
        );

        groupColorsIndexMap.current = maps;
    }, [dispatchGroupColors, dispatchMultiColors, dispatchSingColors, groupColorsIndexMap, originColors]);
};

const useAllColors = () => {
    const { singColors, groupColors, multiColors, isSingle, isGroup, isMulti } = useStoreContext();

    const allColors = useMemo(() => {
        if (isSingle) {
            return singColors;
        }
        if (isGroup) {
            return groupColors;
        }
        if (isMulti) {
            return multiColors;
        }
        return [];
    }, [groupColors, isGroup, isMulti, isSingle, multiColors, singColors]);

    return allColors;
};

// toggle mask shown
const useActiveElement = () => {
    const { svgElement } = usePageStoreContext();
    const { groupColorsIndexMap, isSingle, isGroup, isMulti, dispatchMaskStyles } = useStoreContext();

    const singElement = useRef<HTMLElement>();
    const groupElements = useRef<Record<string, HTMLElement[]>>({});
    const multiElements = useRef<Record<string, HTMLElement>>({});

    useEffect(() => {
        if (!svgElement) {
            return;
        }
        singElement.current = svgElement;
        multiElements.current = getMultiElementsWithIndex(svgElement);
        groupElements.current = Object.fromEntries(
            Object.entries(groupColorsIndexMap.current).map(([groupIndex, indexes]) => {
                const elements = indexes.map((v) => {
                    return multiElements.current[v + 1];
                });
                return [groupIndex, elements];
            }),
        );
    }, [groupColorsIndexMap, svgElement]);

    const showActiveElement = useCallback(
        (index: number) => {
            if (!svgElement) {
                return;
            }

            const dataSetIndex = (index + 1).toString();

            let findElement: (HTMLElement | undefined)[] = [];

            if (isSingle) {
                findElement = [singElement.current];
            } else if (isGroup) {
                findElement = groupElements.current[index];
            } else if (isMulti) {
                findElement = [multiElements.current?.[dataSetIndex]];
            }

            const styles = findElement
                .filter((v) => Boolean(v))
                .map((v) => {
                    const { width, height, left, top } = v.getBoundingClientRect();
                    return {
                        width: `${width}px`,
                        height: `${height}px`,
                        left: `${left}px`,
                        top: `${top}px`,
                        display: `block`,
                    };
                });

            dispatchMaskStyles(styles);
        },
        [dispatchMaskStyles, isGroup, isMulti, isSingle, svgElement],
    );

    const hideActiveElement = useCallback(() => {
        dispatchMaskStyles([]);
    }, [dispatchMaskStyles]);

    return { showActiveElement, hideActiveElement };
};

const useChangeColors = () => {
    const { dispatchSvgProps } = usePageStoreContext();
    const {
        dispatchSingColors,
        dispatchGroupColors,
        multiColors,
        dispatchMultiColors,
        groupColorsIndexMap,
        isSingle,
        isGroup,
        isMulti,
    } = useStoreContext();

    const onChangeColors = useCallback(
        (inputColor: string, index: number) => {
            if (isSingle) {
                dispatchSingColors([inputColor]);
                dispatchSvgProps({
                    color: inputColor,
                });
            }
            if (isGroup) {
                dispatchGroupColors((prev) => {
                    const newColors = clone(prev);
                    newColors[index] = inputColor;

                    const svgColors: string[] = clone(multiColors);

                    newColors.forEach((v, k) => {
                        const indexes = groupColorsIndexMap.current[k];
                        indexes.forEach((v1) => {
                            svgColors[v1] = v;
                        });
                    });

                    dispatchSvgProps({
                        color: svgColors,
                    });

                    return newColors;
                });
            }
            if (isMulti) {
                dispatchMultiColors((prev) => {
                    const newColors = clone(prev);
                    newColors[index] = inputColor;

                    dispatchSvgProps({
                        color: newColors,
                    });

                    return newColors;
                });
            }
        },
        [
            dispatchGroupColors,
            dispatchMultiColors,
            dispatchSingColors,
            dispatchSvgProps,
            groupColorsIndexMap,
            isGroup,
            isMulti,
            isSingle,
            multiColors,
        ],
    );

    return { onChangeColors };
};

export const ColorControl: FC = () => {
    useResetColors();

    const allColors = useAllColors();

    const { onChangeColors } = useChangeColors();
    const { showActiveElement, hideActiveElement } = useActiveElement();

    return (
        <div className="flex items-center gap-2 p-2">
            {allColors.map((v, k) => {
                return (
                    <div
                        key={k}
                        onMouseEnter={() => {
                            showActiveElement(k);
                        }}
                        onMouseLeave={hideActiveElement}
                    >
                        <ColorPicker
                            color={v}
                            onChange={(c) => {
                                onChangeColors(c, k);
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};
