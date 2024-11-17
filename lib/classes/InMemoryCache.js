const { TimeUnit, convertToMs } = require("../helpers/convert_helper");

class InMemoryCache {
    // PRIVATE VARIABLES 
    static #cache = new Map();
    static #defaultTtl_ms;
    static #singletonInstance;

    /**
     * @param {Number} defaultTtl - The default time-to-live (TTL) duration (in ttlTimeUnit) for cached items. Defaults to 10.
     * @param {TimeUnit} ttlTimeUnit - The unit of time for the TTL. Defaults to TimeUnit.MINUTE.
     * 
     * Only one instance of InMemoryCache will exist. If the constructor is called 
     * again with different TTL configurations, it will apply the new settings 
     * only to the items added after that point, while the TTL of existing items will remain unchanged.
     */
    constructor(defaultTtl = 10, ttlTimeUnit = TimeUnit.MINUTE) {
        this.#validateTtlValue(defaultTtl)
        // update the defaultTtl_ms config value for upcoming entries of the cache
        InMemoryCache.#defaultTtl_ms = convertToMs(defaultTtl, ttlTimeUnit);
        if (InMemoryCache.#singletonInstance) {
            return InMemoryCache.#singletonInstance;
        }
        InMemoryCache.#singletonInstance = this;
    }

    #validateTtlValue(ttl) {
        if (ttl === 0) throw new Error("TTL value cannot be zero.");
    }

    /**
     * Adds a new item to the cache with ttl config
     * if no ttl config is passed, InMemoryCache's defaultTtl config is used
     * @param {String} key 
     * @param {any} value 
     * @param {Number} ttlDuration 
     * @param {TimeUnit} ttlTimeUnit 
     */
    set(key, value, ttlDuration, ttlTimeUnit) {
        let expirationTime;

        if (ttlDuration != null && ttlTimeUnit != null) {
            const customTtl_ms = convertToMs(ttlDuration, ttlTimeUnit);
            this.#validateTtlValue(customTtl_ms)
            expirationTime = Date.now() + customTtl_ms;
        } else {
            expirationTime = Date.now() + InMemoryCache.#defaultTtl_ms;
        }
        InMemoryCache.#cache.set(key, { value, expirationTime });
    }


    /**
     * Retrieves an item from the cache.
     * @param {String} key - The key of the item to retrieve.
     * @returns {any} - The cached value or undefined if the item has expired or doesn't exist.
     */
    get(key) {
        const cacheItem = InMemoryCache.#cache.get(key);

        if (cacheItem) {
            if (Date.now() > cacheItem.expirationTime) {
                InMemoryCache.#cache.delete(key);
                return undefined;
            }
            return cacheItem.value;
        }
        return undefined;
    }

    /**
     * Clears all items from the cache.
     */
    clear() {
        InMemoryCache.#cache.clear();
    }

    /**
     * Get the number of items in the cache.
     * @returns {Number} - The number of items in the cache.
     */
    size() {
        return InMemoryCache.#cache.size;  // Return the size of the cache
    }
}

module.exports = { InMemoryCache }
