import { outputMain, outputSecond, outputSuccess } from '../log';

describe('log', () => {
    test('outputMain', () => {
        expect(outputMain('hello')).toMatchSnapshot('outputMain');
        expect(outputSecond('hello')).toMatchSnapshot('outputSecond');
        expect(outputSuccess('hello')).toMatchSnapshot('outputSuccess');
    });
});
