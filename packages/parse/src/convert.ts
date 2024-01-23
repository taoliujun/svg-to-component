import { X2jOptions, XMLBuilder, XMLParser, XmlBuilderOptions } from 'fast-xml-parser';

type SVGTagNames = keyof SVGElementTagNameMap;
type SVGAttributes = Record<string, string>;
type SVGObject = Record<SVGTagNames, SVGObject[]> & {
    ':@'?: SVGAttributes;
};
type FormatSVGAttributes = (attributes: SVGAttributes) => SVGAttributes;

const ROOT_KEY = ':@';

// Code string to xml object
const svgToObj = (content: string, opt?: X2jOptions) => {
    const parser = new XMLParser({
        allowBooleanAttributes: true,
        attributeNamePrefix: '',
        ignoreAttributes: false,
        preserveOrder: true,
        ...opt,
    });

    return parser.parse(content) as SVGObject[];
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

    return builder.build(obj);
};

export { ROOT_KEY, svgToObj, objToSvg };
export type { SVGObject, SVGAttributes, FormatSVGAttributes };
