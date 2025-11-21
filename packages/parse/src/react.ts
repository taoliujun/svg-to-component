import { camelCase, uniq } from 'lodash';
import { format as prettierFormat } from 'prettier';
import { readFileSync } from 'fs';
import path from 'path';
import { objToSvg, svgToObj } from './convert';

// generate utils
const generateComponentUtils: () => {
    targetFilePath: string;
    content: string;
}[] = () => {
    return [
        ['./utils/helper.ts', './template/react/helper.tpl.ts'],
        ['./utils/types.ts', './template/react/types.tpl.ts'],
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
    let code = readFileSync(path.resolve(__dirname, './template/react/component.tpl.ts'), {
        encoding: 'utf-8',
    })
        ?.replaceAll(`$componentName$`, componentName)
        ?.replaceAll(`$content$`, content);

    if (uniq(colors).length === 1) {
        code = code?.replaceAll(`$colors$`, JSON.stringify(new Array(colors.length).fill('currentColor')));
    } else {
        code = code?.replaceAll(`$colors$`, JSON.stringify(colors));
    }

    return code;
};

// To React
const generateReact = async (
    componentName: string,
    content: string,
    opts?: {
        isPreview?: boolean;
    },
) => {
    const { isPreview = false } = opts || {};

    const originColors: string[] = [];

    const xmlObj = svgToObj(content, {
        updateTag: (tagName, _, attrs) => {
            if (tagName === 'svg') {
                Reflect.deleteProperty(attrs, 'width');
                Reflect.deleteProperty(attrs, 'height');
                // Use em and font-size configuration to control dimensions
                Reflect.set(attrs, 'width', '1em');

                // spread props
                Reflect.set(attrs, 'props', '{...props}');
            }
            // convert color value to getColor
            if (tagName !== 'mask') {
                ['fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color'].forEach((k) => {
                    const value = attrs[k];
                    if (value && !['none', 'transparent'].includes(value)) {
                        originColors.push(value);
                        const index = originColors.length;

                        // Reflect.deleteProperty(attrs, k);
                        Reflect.set(attrs, k, `{getColor(color, ${index}, ${value})}`);

                        if (isPreview) {
                            Reflect.set(attrs, `data-preview-color-${k}-index`, index);
                            Reflect.set(attrs, `data-preview-color-${k}-value`, value);
                        }
                    }
                });
            }
            // camelCase attrs name
            Object.entries(attrs).forEach(([k, v]) => {
                if (!k.startsWith('data-')) {
                    Reflect.deleteProperty(attrs, k);
                    Reflect.set(attrs, camelCase(k), v);
                }
            });
            return tagName;
        },
    });

    let code = objToSvg(xmlObj, {});

    // spread props
    code = code.replaceAll(`props="{...props}"`, `{...props}`);

    // inject correct getColor function
    code = code.replaceAll(/"{getColor\((.+?), (.+?), (.+?)\)}"/g, `{getColor($1,$2,'$3')}`);

    code = generateComponentCode(componentName, code, originColors);

    code = await prettierFormat(code, {
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
