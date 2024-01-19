import { camelCase, clone } from 'lodash';
import { format as prettierFormat } from 'prettier';
import { readFileSync } from 'fs';
import path from 'path';
import type { FormatSVGAttributes } from './convert';
import { objToSvg, rootKey, svgToObj } from './convert';

// generate utils
const generateComponentUtils: () => {
    targetFilePath: string;
    content: string;
}[] = () => {
    return [
        ['./utils/helper.ts', './template/react/helper.tpl'],
        ['./utils/types.ts', './template/react/types.tpl'],
    ].map((v) => {
        return {
            targetFilePath: v[0],
            content: readFileSync(path.resolve(__dirname, v[1]), {
                encoding: 'utf-8',
            }),
        };
    });
};

// generate component template string
const generateComponentCode = (componentName: string, content: string, colors: string[]) => {
    const code = readFileSync(path.resolve(__dirname, './template/react/component.tpl'), {
        encoding: 'utf-8',
    })
        ?.replaceAll(`$componentName$`, componentName)
        ?.replaceAll(`$content$`, content)
        ?.replaceAll(`$colors$`, JSON.stringify(colors));

    return code;
};

// Additional SVG attribute handling
const formatSVGAttributes: FormatSVGAttributes = (attributes) => {
    const newValue = clone(attributes);
    Object.keys(newValue).forEach((v1) => {
        // CamelCase attribute name
        const camelCaseKey = camelCase(v1);
        if (camelCaseKey !== v1) {
            newValue[camelCase(v1)] = newValue[v1];
            Reflect.deleteProperty(newValue, v1);
        }
    });

    return newValue;
};

// To React
const generateReact = (
    componentName: string,
    content: string,
    opts?: {
        isPreview?: boolean;
    },
) => {
    const { isPreview = false } = opts || {};

    const xmlObj = svgToObj(content, {
        formatSVGAttributes,
    });

    if (xmlObj[0][rootKey]) {
        Reflect.set(xmlObj[0][rootKey], '__props__', '{...props}');
    }

    let code = objToSvg(xmlObj);

    // inject props
    code = code.replace(`__props__="{...props}"`, `{...props}`);

    const colors: string[] = [];

    // inject color
    const colorMatchs = code.matchAll(/__prop__color__([^=]+)="(.+?)__([^"]+)"/g);
    // eslint-disable-next-line no-restricted-syntax
    for (const v of colorMatchs) {
        const [matchColorOrigin, matchColorKey, matchColorValue, matchColorIndex] = v;

        let replaceCode = `${matchColorKey}={getColor(color, ${matchColorIndex}, '${matchColorValue}')}`;
        if (isPreview) {
            replaceCode += ` data-preview-color-${matchColorKey}-index="${matchColorIndex}"`;
            replaceCode += ` data-preview-color-${matchColorKey}-value="${matchColorValue}"`;
        }
        code = code.replace(matchColorOrigin, replaceCode);
        colors.push(matchColorValue);
    }

    code = generateComponentCode(componentName, code, colors);

    code = prettierFormat(code, {
        printWidth: 120,
        tabWidth: 4,
        semi: true,
        singleQuote: true,
        endOfLine: 'lf',
        trailingComma: 'es5',
        parser: 'babel-ts',
    });

    return code;
};

export { generateReact, generateComponentUtils };
