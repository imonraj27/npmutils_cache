/**
 * @enum TimeUnit
 * @description Possible TimeUnit:
 * - TimeUnit.MINUTE
 * - TimeUnit.SECOND
 * - TimeUnit.HOUR
 * - TimeUnit.DAY
 */
class TimeUnit {
    static MINUTE = new TimeUnit("minute", 60000);
    static SECOND = new TimeUnit("second", 1000);
    static HOUR = new TimeUnit("hour", 3600000);
    static DAY = new TimeUnit("day", 86400000);

    #name;
    #ms;

    /**
     * @constructor
     * @private
     * @param {string} name - The name of the time unit.
     * @param {number} ms - The number of milliseconds in this time unit.
     */
    constructor(name, ms) {
        if (new.target !== TimeUnit) {
            throw new Error("Cannot instantiate TimeUnit directly. Use static properties.");
        }
        this.#name = name;
        this.#ms = ms;
    }

    getMs() {
        return this.#ms;
    }
}

/**
 * Converts a time duration from a sourceTimeUnit to a destinationTimeUnit.
 * @param {number} duration - The time duration to be converted.
 * @param {TimeUnit} sourceTimeUnit - The source time unit (e.g., TimeUnit.HOUR).
 * @param {TimeUnit} destinationTimeUnit - The destination time unit (e.g., TimeUnit.DAY).
 * @returns {number} - The converted duration in the destination time unit.
 */
function convertTime(duration, sourceTimeUnit, destinationTimeUnit) {
    const durationInMs = duration * sourceTimeUnit.getMs();
    return Math.floor(durationInMs / destinationTimeUnit.getMs());
}

module.exports = { TimeUnit, convertTime }

