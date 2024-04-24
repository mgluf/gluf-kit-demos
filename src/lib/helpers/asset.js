/**
 * Append the static link string pattern to a static asset URL
 * and prepend the base path (typically only for production)
 * 
 * @param {string} src – the source URL to an asset
 * @returns SFCC-friendly static asset URL
 */

export default function asset(src) {
  let url = src;
  // Check if the staticlink string is already included (if it is, don't run do anything)
  if (!src.includes('?$staticlink')) {
    // Append the staticlink string, 
    // but handle normal query strings with care
    const hasQueryString = ((src.match(/\?/g) || []).length === 1);
    if (!hasQueryString) {
      url = `${src}?$staticlink$`;
    } else {
      // Note: Second ? required for SFCC, because of how it handles the string replacement
      // Trying to access the URL Params in dev will probably fail, since this will
      // technically result in a malformed URL Query String. 
      // (Or rather, the second ? will be treated as a part of a param key/value pair)
      let str = src.split('?');
      url = `${str[0]}?$staticlink$?${str[1]}`;
    }
  }

  return `__ASSETS__${url}`;
}