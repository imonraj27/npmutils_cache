/**
 * @enum TimeUnit
 * Represents a unit of time.
 * @description Possible TimeUnit:
 * - TimeUnit.SECOND
 * - TimeUnit.MINUTE
 * - TimeUnit.HOUR
 * - TimeUnit.DAY
 */
class TimeUnit {
    static MINUTE = new TimeUnit("minute");
    static SECOND = new TimeUnit("second");
    static HOUR = new TimeUnit("hour");
    static DAY = new TimeUnit("day");

    #name;

    /**
     * @constructor
     * @private
     * @param {string} name - The name of the time unit.
     */
    constructor(name) {
        this.#name = name;
    }
}

/**
 * Internal function to get the milliseconds for a given TimeUnit.
 * @param {TimeUnit} unit - The TimeUnit to convert.
 * @returns {number} - The milliseconds in the given TimeUnit.
 */
function getMsForTimeUnit(unit) {
    const timeUnitToMsMap = new Map([
        [TimeUnit.MINUTE, 60000],
        [TimeUnit.SECOND, 1000],
        [TimeUnit.HOUR, 3600000],
        [TimeUnit.DAY, 86400000],
    ]);
    if (!timeUnitToMsMap.has(unit)) {
        throw new Error(`Unknown time unit: ${unit}`);
    }
    return timeUnitToMsMap.get(unit);
}

/**
 * Converts a time duration from a sourceTimeUnit to milliseconds.
 * @param {number} duration - The time duration to be converted.
 * @param {TimeUnit} sourceTimeUnit - The source time unit (e.g., TimeUnit.HOUR).
 * @returns {number} - The converted duration in milliseconds.
 */
function convertToMs(duration, sourceTimeUnit) {
    return duration * getMsForTimeUnit(sourceTimeUnit);
}

module.exports = { TimeUnit, convertToMs };
