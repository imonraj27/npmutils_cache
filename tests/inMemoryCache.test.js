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
});
