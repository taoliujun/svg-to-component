import { objToSvg, svgToObj } from '../convert';

describe('svgToObj', () => {
    test('default', () => {
        const ret = svgToObj(`
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="2" fill="currentColor" />
                <circle cx="4" cy="4" r="4" fill="currentColor" fill-opacity="0.4" />
            </svg>
        `);
        expect(ret[0]?.[':@']).not.toBeUndefined();
    });
});

describe('objToSvg', () => {
    test('default', () => {
        const ret = objToSvg([
            {
                svg: [],
                ':@': {
                    xmlns: 'http://www.w3.org/2000/svg',
                    width: '8',
                    height: '8',
                    viewBox: '0 0 8 8',
                    fill: 'none',
                },
            },
        ]);
        expect(ret).toBe(
            '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none"/>',
        );
    });
});
