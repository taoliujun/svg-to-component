import { generateComponentUtils, generateReact } from '..';

describe('generateReact', () => {
    test('default', async () => {
        const ret1 = await generateReact(
            'Test1',
            `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="2" fill="currentColor" />
                <circle cx="4" cy="4" r="4" fill="currentColor" fill-opacity="0.4" />
            </svg>`,
        );
        expect(ret1).toMatchSnapshot('normal');

        const ret2 = await generateReact(
            'Test1',
            `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="2" fill="currentColor" />
                <circle cx="4" cy="4" r="4" fill="currentColor" fill-opacity="0.4" />
            </svg>`,
            {
                isPreview: true,
            },
        );
        expect(ret2).toMatchSnapshot('isPreview');
    });
});

describe('generateComponentUtils', () => {
    test('default', () => {
        const ret = generateComponentUtils();
        expect(ret.length).toBe(2);
        expect(ret[0].targetFilePath).toContain('helper');
        expect(ret[1].targetFilePath).toContain('types');
    });
});
