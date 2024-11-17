const { TimeUnit, convertToMs } = require('../lib/helpers/convert_helper');

describe("convertToMs", () => {
    test("should correctly convert to Milliseconds", () => {
        expect(convertToMs(1.5, TimeUnit.HOUR)).toBe(1.5 * 3600 * 1000);
        expect(convertToMs(12.5, TimeUnit.MINUTE)).toBe(12.5 * 60 * 1000);
        expect(convertToMs(1, TimeUnit.DAY)).toBe(24 * 3600 * 1000);
    });
});
