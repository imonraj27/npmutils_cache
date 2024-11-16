const { TimeUnit, convertTime } = require('../lib/helpers/convert_helper');

let c = new TimeUnit()

describe("TimeUnit", () => {
    test("should instantiate TimeUnit static properties correctly", () => {
        expect(TimeUnit.MINUTE.getMs()).toBe(60000);
        expect(TimeUnit.SECOND.getMs()).toBe(1000);
        expect(TimeUnit.HOUR.getMs()).toBe(3600000);
        expect(TimeUnit.DAY.getMs()).toBe(86400000);
    });
});

describe("convertTime", () => {
    test("should correctly convert between TimeUnits", () => {
        expect(convertTime(1, TimeUnit.HOUR, TimeUnit.MINUTE)).toBe(60); // 1 hour = 60 minutes
        expect(convertTime(1, TimeUnit.MINUTE, TimeUnit.SECOND)).toBe(60); // 1 minute = 60 seconds
        expect(convertTime(1, TimeUnit.DAY, TimeUnit.HOUR)).toBe(24); // 1 day = 24 hours
        expect(convertTime(3600, TimeUnit.SECOND, TimeUnit.HOUR)).toBe(1); // 3600 seconds = 1 hour
    });

    test("should handle zero duration", () => {
        expect(convertTime(0, TimeUnit.HOUR, TimeUnit.MINUTE)).toBe(0); // 0 hours = 0 minutes
        expect(convertTime(0, TimeUnit.MINUTE, TimeUnit.SECOND)).toBe(0); // 0 minutes = 0 seconds
    });

    test("should handle fractional conversions correctly", () => {
        expect(convertTime(0.5, TimeUnit.HOUR, TimeUnit.MINUTE)).toBe(30); // 0.5 hours = 30 minutes
        expect(convertTime(1.5, TimeUnit.HOUR, TimeUnit.MINUTE)).toBe(90); // 1.5 hours = 90 minutes
    });
});
