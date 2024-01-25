import path from 'path';
import os from 'os';
import fs from 'fs';
import { generateComponentFiles } from '../parse';

const SOURCE_PATH = path.resolve(__dirname, '../../../../jest/mock/svg');
const OUTPUT_PATH = os.tmpdir();

function getTmpDir(prefix: string = 'jest-') {
    return fs.mkdtempSync(path.resolve(OUTPUT_PATH, prefix));
}

describe('generateComponentFiles', () => {
    test('default', async () => {
        const outputPath = getTmpDir();
        await generateComponentFiles({
            sourcePath: SOURCE_PATH,
            outputPath,
        });
        expect(fs.existsSync(path.resolve(outputPath, './DetailOutlined/index.tsx'))).toBe(true);
        expect(fs.existsSync(path.resolve(outputPath, './utils/helper.ts'))).toBe(true);
    });
});
