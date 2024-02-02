import path from 'path';
import { Command } from 'commander';
import { spawn } from 'child_process';
import fs from 'fs';
import { log, outputError, outputMain } from './log';
import { generateComponentFiles } from './parse';

const cwdPath = path.resolve();

const program = new Command('preview')
    .description('CLI to preview the svg files, and use the coloring tool')
    .argument('path <string>', 'the directory of the SVG files')
    .option('--debug', 'output the debug log')
    .action(async (args, opts) => {
        let previewPackagePath: string = '';
        let componentsPath: string = '';
        try {
            const previewPkg = await import('svg-to-component-preview');
            previewPackagePath = previewPkg.packagePath;
            componentsPath = previewPkg.componentsPath;
        } catch (e) {
            if ((e as NodeJS.ErrnoException).code === 'ERR_MODULE_NOT_FOUND') {
                //
                log(
                    outputError(
                        `The package "svg-to-component-preview" is optional, install it first:\n`,
                        `1. npm install svg-to-component-preview`,
                    ),
                );
            }
            return;
        }

        fs.rmSync(componentsPath, { recursive: true, force: true });
        fs.mkdirSync(componentsPath);

        await generateComponentFiles({
            sourcePath: path.resolve(cwdPath, args),
            outputPath: componentsPath,
            template: 'react',
            debug: opts.debug,
            isPreview: true,
        });

        log(outputMain(`> run ${previewPackagePath} server...`));

        const wp = spawn(`pnpm`, ['run', 'start'], {
            cwd: previewPackagePath,
            stdio: 'inherit',
        });
        wp.stdout?.on('data', (data) => {
            process.stdout.write(data);
        });
        wp.stderr?.on('data', (data) => {
            process.stderr.write(data);
        });
        wp.on('exit', (code) => {
            log(code);
        });
    });

export const commandPreview = program;
