import path from 'path';
import { Command } from 'commander';
import { packagePath as previewPackagePath, componentsPath } from 'svg-to-component.preview';
import { log, outputMain } from './log';
import { generateComponentFiles } from './parse';
import { spawn } from 'child_process';

const cwdPath = path.resolve();

const program = new Command('preview')
    .description('CLI to preview the svg files, and use the coloring tool')
    .argument('path <string>', 'the directory of the SVG files')
    .option('--debug', 'output the debug log')
    .action(async (args, opts) => {
        await generateComponentFiles({
            sourcePath: path.resolve(cwdPath, args),
            outputPath: componentsPath,
            template: 'react',
            debug: opts.debug,
            isPreview: true,
        });

        log(outputMain(`> run ${previewPackagePath} server...`));

        const wp = spawn(`pnpm`, ['run', 'dev'], {
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
