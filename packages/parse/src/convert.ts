import { X2jOptions, XMLBuilder, XMLParser, XmlBuilderOptions } from 'fast-xml-parser';

type SVGTagNames = keyof SVGElementTagNameMap;
type SVGAttributes = Record<string, string>;
type SVGObject = Record<SVGTagNames, SVGObject[]> & {
    ':@'?: SVGAttributes;
};
type FormatSVGAttributes = (attributes: SVGAttributes) => SVGAttributes;

const rootKey = ':@';

// Loop the properties of the SVG
const organizeSvg = (obj: SVGObject[]) => {
    if (!obj?.length) {
        return obj;
    }

    const newObj = obj.map((v) => {
        const output: [string, unknown][] = [];

        if (v[rootKey]) {
            // Handling colors
            let newValue = v[rootKey];

            output.push([rootKey, newValue]);
        }

        Object.entries(v)
            .filter(([key]) => {
                return key !== rootKey;
            })
            .forEach(([key, value]) => {
                output.push([key, organizeSvg(value as SVGObject[])]);
            });

        return Object.fromEntries(output);
    });

    return newObj as typeof obj;
};

// Code string to xml object
const svgToObj = (content: string, opt?: X2jOptions) => {
    const parser = new XMLParser({
        allowBooleanAttributes: true,
        attributeNamePrefix: '',
        ignoreAttributes: false,
        preserveOrder: true,
        ...opt,
    });

    const obj = parser.parse(content) as SVGObject[];
    const newObj = organizeSvg(obj);
    return newObj;
};

// XML object to code string
const objToSvg = (obj?: SVGObject[], opt?: XmlBuilderOptions): string => {
    const builder = new XMLBuilder({
        attributeNamePrefix: '',
        ignoreAttributes: false,
        suppressEmptyNode: true,
        preserveOrder: true,
        ...opt,
    });

    const tpl = builder.build(obj);
    return tpl;
};

export { rootKey, svgToObj, objToSvg };
export type { SVGObject, SVGAttributes, FormatSVGAttributes };
