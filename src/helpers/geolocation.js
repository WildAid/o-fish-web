
/**
 * 
 * @param {Number} coordinate 
 * @description Convert Cooardinate to Degrees, Minutes and Seconds
 * @returns 
 */
export const convertCooardinatetoDMS = (coordinate) => {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return `${degrees}/${minutes}/${seconds}`;

}