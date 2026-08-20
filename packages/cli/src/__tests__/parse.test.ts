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

    test('nested dir', async () => {
        const sourcePath = getTmpDir('jest-source-');
        const nestedDir = path.resolve(sourcePath, './filled/outline');
        fs.mkdirSync(nestedDir, { recursive: true });
        fs.copyFileSync(path.resolve(SOURCE_PATH, 'detail-outlined.svg'), path.resolve(nestedDir, 'detail-outlined.svg'));

        const outputPath = getTmpDir();
        await generateComponentFiles({
            sourcePath,
            outputPath,
        });

        const component = fs.readFileSync(
            path.resolve(outputPath, './filled/outline/DetailOutlined/index.tsx'),
            'utf-8',
        );
        expect(component).toContain("from '../../../utils/helper'");
        expect(component).toContain("from '../../../utils/types'");
    });
});
