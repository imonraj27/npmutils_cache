const { TimeUnit, InMemoryCache } = require("../lib")


describe("InMemoryCache", () => {
    let cache = new InMemoryCache();

    test("should create a single instance", () => {
        const cache1 = new InMemoryCache();
        const cache2 = new InMemoryCache();
        expect(cache1).toBe(cache2);
    });

    test("should set and get items correctly", () => {
        cache.set("user1", { name: "John Doe" });
        const cachedUser = cache.get("user1");
        expect(cachedUser).toEqual({ name: "John Doe" });
    });

    test("should return undefined for non-existent cache items", () => {
        const nonExistent = cache.get("nonExistentKey");
        expect(nonExistent).toBeUndefined();
    });

    test("should delete expired items", () => {
        jest.useFakeTimers();

        cache.set("user2", { name: "Jane Doe" });
        const userBeforeExpiry = cache.get("user2");
        expect(userBeforeExpiry).toEqual({ name: "Jane Doe" });

        jest.setSystemTime(Date.now() + 11 * 60 * 1000);

        const userAfterExpiry = cache.get("user2");
        expect(userAfterExpiry).toBeUndefined();

        jest.useRealTimers();
    });


    test("should clear the cache", () => {
        cache.clear();
        expect(cache.size()).toBe(0);
    });

    test("should return correct cache size", () => {
        cache.clear()

        cache.set("item1", "value1");
        cache.set("item2", "value2");

        expect(cache.size()).toBe(2);
    });

    test("should use the default TTL if no TTL is provided", () => {
        jest.useFakeTimers();

        cache.set("item3", "value3");
        const item = cache.get("item3");
        expect(item).toBe("value3");

        jest.setSystemTime(Date.now() + 11 * 60 * 1000);

        const itemAfterTTL = cache.get("item3");
        expect(itemAfterTTL).toBeUndefined();

        jest.useRealTimers();
    });

    test("should allow custom TTL for cached items", () => {
        jest.useFakeTimers();
        const customCache = new InMemoryCache(5, TimeUnit.MINUTE);

        customCache.set("item4", "value4");
        const item = customCache.get("item4");
        expect(item).toBe("value4");

        jest.setSystemTime(Date.now() + 6 * 60 * 1000);

        const itemAfterTTL = customCache.get("item4");
        expect(itemAfterTTL).toBeUndefined();

        jest.useRealTimers();
    });

    ///////////////////////////////////////////////


    test("should use the default TTL if no TTL is provided", () => {
        jest.useFakeTimers();

        cache.set("item3", "value3");
        const item = cache.get("item3");
        expect(item).toBe("value3");

        jest.setSystemTime(Date.now() + 11 * 60 * 1000);  // 11 minutes later (TTL = 10 minutes)

        const itemAfterTTL = cache.get("item3");
        expect(itemAfterTTL).toBeUndefined();

        jest.useRealTimers();
    });

    test("should allow custom TTL duration and time unit", () => {
        jest.useFakeTimers();

        // Custom TTL: 5 minutes
        const customCache = new InMemoryCache();
        customCache.set("item4", "value4", 5, TimeUnit.MINUTE);  // Custom TTL of 5 minutes

        const item = customCache.get("item4");
        expect(item).toBe("value4");

        // Set system time 6 minutes later, item should expire
        jest.setSystemTime(Date.now() + 6 * 60 * 1000);  // 6 minutes later (TTL = 5 minutes)

        const itemAfterTTL = customCache.get("item4");
        expect(itemAfterTTL).toBeUndefined();

        jest.useRealTimers();
    });

    test("should use custom TTL when provided even if default TTL is set", () => {
        jest.useFakeTimers();

        const customCache = new InMemoryCache(10, TimeUnit.MINUTE);  // Default TTL of 10 minutes

        // Custom TTL: 3 minutes
        customCache.set("item5", "value5", 3, TimeUnit.MINUTE);  // Custom TTL of 3 minutes

        const item = customCache.get("item5");
        expect(item).toBe("value5");

        // Set system time 4 minutes later, item should expire
        jest.setSystemTime(Date.now() + 4 * 60 * 1000);  // 4 minutes later (TTL = 3 minutes)

        const itemAfterTTL = customCache.get("item5");
        expect(itemAfterTTL).toBeUndefined();

        jest.useRealTimers();
    });

    test("should throw an error if custom TTL is invalid", () => {
        expect(() => {
            cache.set("item6", "value6", 0, TimeUnit.MINUTE);  // Invalid TTL of 0 minutes
        }).toThrowError(/.+/);
    });

    test("should allow custom TTL with different time units", () => {
        jest.useFakeTimers();

        const customCache = new InMemoryCache();
        // Custom TTL: 1 hour
        customCache.set("item7", "value7", 1, TimeUnit.HOUR);  // Custom TTL of 1 hour

        const item = customCache.get("item7");
        expect(item).toBe("value7");

        // Set system time 61 minutes later, item should expire after 1 hour
        jest.setSystemTime(Date.now() + 61 * 60 * 1000);  // 61 minutes later (TTL = 1 hour)

        const itemAfterTTL = customCache.get("item7");
        expect(itemAfterTTL).toBeUndefined();

        jest.useRealTimers();
    });

    test("should not allow defaultTtl value = 0", () => {
        expect(() => new InMemoryCache(0)).toThrowError(/.+/);
    });
});
