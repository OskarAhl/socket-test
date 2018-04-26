const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('Should reject non-string values', () => {
        const res = isRealString(532);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        const res = isRealString('   ');
        expect(res).toBe(false);
    });

    it('should allow string with non-space chars', () => {
        const res = isRealString('  oskar ');
        expect(res).toBe(true);
    });
});