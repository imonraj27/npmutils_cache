# Documentation

---

## Getting Started

```bash
npm install @npmutils/cache
```

and then,

```javascript
const { InMemoryCache, TimeUnit } = require("@npmutils/cache");
```

---

<div class="box">

### TimeUnit

A simple enum to represent common time units for TTL:

- `TimeUnit.MINUTE`
- `TimeUnit.SECOND`
- `TimeUnit.HOUR`
- `TimeUnit.DAY`

These units can be used with `InMemoryCache` TTL values.

</div>

---

<div class="box">

### InMemoryCache

The main class for caching items. It exposes methods to set, get and clear the cache.

##### Constructor

```javascript
new InMemoryCache((globalTtl = 10), (ttlTimeUnit = TimeUnit.MINUTE));
```

- `globalTtl` (optional): The global time-to-live (TTL) for cache items, in numeric form. Default is `10`.
- `ttlTimeUnit` (optional): The unit of time for the TTL. Default is `TimeUnit.MINUTE`.

Only one instance of `InMemoryCache` exists (Singleton pattern). If the constructor is called multiple times, error will be thrown.

##### Example 1 (default global ttl)

```javascript
// constructor should be called only once
let cache = new InMemoryCache(); // global ttl config = 10 minutes
let cache2 = InMemoryCache.getInstance(); // refers to same cache object
```

##### Example 2 (custom global ttl)

```javascript
// constructor should be called only once
let cache = new InMemoryCache(1, TimeUnit.HOUR); // global ttl config = 1 Hour
let cache2 = InMemoryCache.getInstance(); // refers to same cache object
```

</div>

---

### Methods

<div class="box">

#### `set(key, value, ttlDuration[optional], ttlTimeUnit[optional])`

Sets or Updates a cache item.

- `key`(String): The unique identifier for the cache item.
- `value`(any): The value to store in the cache.
- `ttlDuration` (optional|Number): The TTL duration for this specific item (overrides the global TTL).
- `ttlTimeUnit` (optional|TimeUnit): The time unit for the `ttlDuration`. Use `TimeUnit` enum.

If no `ttlDuration` or `ttlTimeUnit` is provided, the global TTL value for the cache will be used.

##### Example

```javascript
const obj = {
  name: "Imon Raj",
  phone: "919900889977",
};
const obj2 = {
  name: "John Doe",
};
cache.set("user", obj); // Will use global TTL value
cache.set("user2", obj2, 2, TimeUnit.HOUR); // custom TTL of 2 hours
```

</div>
<div class="box">

#### `get(key)`

Retrieves a cached item.

- `key`: The key of the cached item to retrieve.
- Returns: The cached value if the item exists and hasn't expired; `undefined` otherwise.

##### Example

```javascript
const cachedItem = cache.get("user");
console.log(cachedItem.name); // prints "Imon Raj"
```

</div>
<div class="box">

#### `clear()`

Clears all items from the cache.

```javascript
cache.clear();
```

</div>

## Example

```javascript
const { InMemoryCache, TimeUnit } = require("@npmutils/cache");

// Create an instance with default TTL of 10 minutes
const cache = new InMemoryCache();

// Add an item to the cache
cache.set("user1", { name: "John Doe" });

// Get the cached item
console.log(cache.get("user1")); // Output: { name: 'John Doe' }

// Add an item with a custom TTL of 5 minutes
cache.set("user2", { name: "Jane Doe" }, 5, TimeUnit.MINUTE);

// Clear the cache
cache.clear();

// Get the current cache size
console.log(cache.size()); // Output: 0
```

## License

This project is licensed under the MIT License.
