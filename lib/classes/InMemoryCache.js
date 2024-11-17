const { TimeUnit, convertToMs } = require("../helpers/convert_helper");

class InMemoryCache {
    // PRIVATE VARIABLES 
    #cache; #defaultTtl_ms;

    /**
     * @param {Number} defaultTtl - The default time-to-live (TTL) duration(in ttlTimeUnit) for cached items. Defaults to 10.
     * @param {TimeUnit} ttlTimeUnit - The unit of time for the TTL. Defaults to TimeUnit.MINUTE.
     * 
     * Only one instance of InMemoryCache will exist. If the constructor is called 
     * again with different TTL configurations, it will apply the new settings 
     * only to the items added after that point, while the TTL of existing items will remain unchanged.
     */
    constructor(defaultTtl = 10, ttlTimeUnit = TimeUnit.MINUTE) {
        if (defaultTtl === 0) {
            throw new Error("TTL value can not be zero.")
        }
        if (InMemoryCache.instance) {
            InMemoryCache.instance.#defaultTtl_ms = convertToMs(defaultTtl, ttlTimeUnit);
            return InMemoryCache.instance;
        }

        this.#cache = new Map();
        this.#defaultTtl_ms = convertToMs(defaultTtl, ttlTimeUnit);
        InMemoryCache.instance = this;
    }

    /**
     * Adds an item to the cache.
     * @param {String} key - The key to store the item.
     * @param {any} value - The value to be cached.
     */
    set(key, value) {
        const expirationTime = Date.now() + this.#defaultTtl_ms;
        this.#cache.set(key, { value, expirationTime });
    }

    /**
     * Retrieves an item from the cache.
     * @param {String} key - The key of the item to retrieve.
     * @returns {any} - The cached value or undefined if the item has expired or doesn't exist.
     */
    get(key) {
        const cacheItem = this.#cache.get(key);

        if (cacheItem) {
            if (Date.now() > cacheItem.expirationTime) {
                this.#cache.delete(key);
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
        this.#cache.clear();
    }

    /**
     * Get the number of items in the cache.
     * @returns {Number} - The number of items in the cache.
     */
    size() {
        return this.#cache.size;
    }
}

module.exports = { InMemoryCache }
