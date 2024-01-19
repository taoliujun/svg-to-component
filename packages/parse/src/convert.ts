import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { clone } from 'lodash';
import validateColor from 'validate-color';

type SVGTagNames = keyof SVGElementTagNameMap;
type SVGAttributes = Record<string, string>;
type SVGObject = Record<SVGTagNames, SVGObject[]> & {
    ':@'?: SVGAttributes;
};
type FormatSVGAttributes = (attributes: SVGAttributes) => SVGAttributes;

const parser = new XMLParser({
    allowBooleanAttributes: true,
    attributeNamePrefix: '',
    ignoreAttributes: false,
    preserveOrder: true,
});

const builder = new XMLBuilder({
    attributeNamePrefix: '',
    ignoreAttributes: false,
    suppressEmptyNode: true,
    preserveOrder: true,
});

const rootKey = ':@';
const colorAttributeKeys = ['fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color'];

let originColors: string[] = [];

// Extract the color
const formatColor = (attributes: SVGAttributes) => {
    const output = clone(attributes);

    colorAttributeKeys.forEach((colorKey) => {
        const colorValue = output[colorKey];
        if (colorValue && validateColor(colorValue)) {
            originColors.push(colorValue);
            Reflect.deleteProperty(output, colorKey);
            output[`__prop__color__${colorKey}`] = `${colorValue}__${originColors.length}`;
        }
    });

    return output;
};

// Loop the properties of the SVG
const organizeSvg = (
    obj: SVGObject[],
    opt?: {
        /** Ignore the processing of colors */
        ignoreColor?: boolean;
        /** Handling of each element's attributes */
        formatSVGAttributes?: FormatSVGAttributes;
    },
) => {
    const { ignoreColor = false, formatSVGAttributes } = opt || {};

    if (!obj?.length) {
        return obj;
    }

    const newObj = obj.map((v) => {
        const output: [string, unknown][] = [];

        if (v[rootKey]) {
            // Handling colors
            let newValue = v[rootKey];
            // Remove the width and height of the root element
            if (v.svg) {
                Reflect.deleteProperty(newValue, 'width');
                Reflect.deleteProperty(newValue, 'height');
                // Use em and font-size configuration to control dimensions
                Reflect.set(newValue, 'width', '1em');
            }

            if (formatSVGAttributes) {
                newValue = formatSVGAttributes(newValue);
            }

            if (!ignoreColor) {
                newValue = formatColor(newValue);
            }

            output.push([rootKey, newValue]);
        }

        Object.entries(v)
            .filter(([key]) => {
                return key !== rootKey;
            })
            .forEach(([key, value]) => {
                output.push([
                    key,
                    organizeSvg(value as SVGObject[], {
                        ...opt,
                        // Don't handle the color in the mask element
                        ignoreColor: key === 'mask',
                    }),
                ]);
            });

        return Object.fromEntries(output);
    });

    return newObj as typeof obj;
};

// Code string to xml object
const svgToObj = (content: string, opt?: Parameters<typeof organizeSvg>[1]) => {
    originColors = [];
    const obj = parser.parse(content) as SVGObject[];
    const newObj = organizeSvg(obj, opt);
    return newObj;
};

// XML object to code string
const objToSvg = (obj?: SVGObject[]): string => {
    const tpl = builder.build(obj);
    return tpl;
};

export { rootKey, svgToObj, objToSvg };
export type { SVGObject, SVGAttributes, FormatSVGAttributes };
