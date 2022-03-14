
/**
 * 
 * @param {Number} coordinate 
 * @description Convert Cooardinate to Degrees, Minutes and Seconds
 * @returns 
 */
export const convertCooardinatetoDMS = (coordinate) => {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = (minutesNotTruncated - minutes) * 60;

    return `${degrees}° ${minutes}' ${seconds.toFixed(2)}"`;

}