//

import path from 'path';

const packagePath = path.resolve(__dirname, '../..');
const sourcePath = path.join(packagePath, './src');
const componentsPath = path.resolve(sourcePath, './svgComponents');

export { packagePath, componentsPath };
