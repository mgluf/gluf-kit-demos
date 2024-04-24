/**
 * Recursively filter a data object by a specified key
 * 
 * Note: nested keys don't work, but that's OKAY
 * 
 * @param {*} key – key to filter on (inclusively)
 * @param {*} data – object source to filter
 * @returns the filtered data object
 */
export default function filterByKey(key, data) {
  // Check if the data is an array
  if (Array.isArray(data)) {
    // If it's an array, apply the filterByKey function recursively
    // to each item in the array and return the mapped array
    return data.map(item => filterByKey(key, item));
  }

  // Check if the data is an object and not null
  if (typeof data === 'object' && data !== null) {
    // Create an empty object to store the filtered result
    const result = {};

    // Iterate through each key in the object
    for (const _key in data) {
      // Recursively merge values from data into the result object
      const value = filterByKey(key, data[_key]);

      // Check if the current key matches the specified key and the value is not an object or is an array
      if (_key === key && (typeof value !== 'object' || Array.isArray(value))) {
        // If the conditions are met, return the unmodified value to merge it into the result object (recursively)
        return value;
      } else {
        // If the conditions are not met, add the key-value pair to the result object
        result[_key] = value;
      }
    }

    // Return the filtered object
    return result;
  }

  // If the data is neither an array nor an object, return it unchanged
  return data;
}


