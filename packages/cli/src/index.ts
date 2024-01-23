import { Command } from 'commander';
import { commandParse } from './parse';
import { commandPreview } from './preview';
import pkg from '../package.json';

const program = new Command();

program.name('svg-to-component').description('svg file parse and preview.').version(pkg.version);
program.addCommand(commandParse);
program.addCommand(commandPreview);

program.parse();
