import { Command } from 'commander';
import { commandParse } from './parse';
import { commandPreview } from './preview';

const program = new Command();

program.name('svg-to-component').description('svg file parse and preview.').version('1.0.0');
program.addCommand(commandParse);
program.addCommand(commandPreview);

program.parse();
