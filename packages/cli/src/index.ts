import { Command } from 'commander';
import { commandParse } from './parse';
import { commandPreview } from './preview';
import pkg from './pkg-info.json';

const program = new Command();

program.name(pkg.name).description(pkg.description).version(pkg.version);
program.addCommand(commandParse);
program.addCommand(commandPreview);

program.parse();
