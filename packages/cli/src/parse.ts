import path, { dirname } from 'path';
import fs from 'fs';
import { glob } from 'fast-glob';
import { Command } from 'commander';
import Progress from 'progress';
import { camelCase, upperFirst } from 'lodash';
import { generateReact, generateComponentUtils } from 'svg-to-component-parse';
import { log, outputMain, outputSecond, outputSuccess } from './log';

const cwdPath = path.resolve();

type Template = 'react' | 'vue';

interface GenerateParams {
    sourcePath: string;
    outputPath: string;
    template?: Template;
    debug?: boolean;
    isPreview?: boolean;
}

const generateUtils = (opts: GenerateParams) => {
    const { outputPath } = opts;

    log(outputSecond(`> Generate util files:`));

    const utilFiles = generateComponentUtils();
    utilFiles.forEach((v) => {
        const { targetFilePath, content } = v;
        const file = path.resolve(outputPath, targetFilePath);
        fs.mkdirSync(dirname(file), { recursive: true });
        fs.writeFileSync(file, content, {
            encoding: 'utf-8',
        });
        log(outputMain(file));
    });
};

const generateComponentFiles = async (opts: GenerateParams) => {
    const { sourcePath, outputPath, template = 'react', debug = false, isPreview = false } = opts;

    log(outputSecond('> Origin SVG files path:'), outputMain(sourcePath));

    const files = await glob(path.resolve(sourcePath, './**/*.svg'));
    const filesLen = files.length;

    log(outputSecond(`> Total files:`, outputMain.bold(filesLen)));

    const bar = new Progress(':bar :percent ', { total: filesLen });

    files.forEach(async (inputFile, index) => {
        const fileInfo = path.parse(inputFile);
        const relativePath = fileInfo.dir.replace(sourcePath, '');
        const content = fs.readFileSync(inputFile, 'utf-8');

        let outputFileName = '';
        let outputFilePath = '';
        let outputFile = '';
        let outputContent = '';

        if (template === 'react') {
            outputFileName = upperFirst(camelCase(fileInfo.name));
            outputFilePath = path.resolve(outputPath, `./${relativePath}`, outputFileName);
            outputFile = path.resolve(outputFilePath, `index.tsx`);
            outputContent = await generateReact(outputFileName, content, {
                isPreview,
            });
        }

        fs.mkdirSync(outputFilePath, { recursive: true });
        fs.writeFileSync(outputFile, outputContent, {
            encoding: 'utf-8',
        });

        if (debug) {
            log(`[${index + 1}/${filesLen}]`, outputMain.bold(fileInfo.base));
            log(outputSecond('source file:'), outputMain(inputFile));
            log(outputSecond('output file:'), outputMain(outputFile));
            log(`\n`);
            log(outputSecond(outputContent));
            log(`\n`);
        } else {
            bar.tick();
        }
    });

    bar.terminate();

    generateUtils(opts);

    log(`\n`);
    log(outputSuccess(`> All done, the output ${template} components path: `), outputMain(outputPath));
};

const program = new Command('parse')
    .description('CLI to parse SVG files to component files')
    .argument('path <string>', 'the directory of the SVG files')
    .option('-t, --template <string>', 'the component type, supports react', 'react')
    .option('-o, --output <string>', 'the output directory of the component files', './svg-component-output')
    .option('--debug', 'output the debug log')
    .action(async (args, opts) => {
        await generateComponentFiles({
            sourcePath: path.resolve(cwdPath, args),
            outputPath: path.resolve(cwdPath, opts.output),
            template: opts.template,
            debug: opts.debug,
        });
    });

export { program as commandParse, generateComponentFiles };
