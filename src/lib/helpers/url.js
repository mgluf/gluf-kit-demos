/**
 * Generates a SFCC Content Link Function string
 * 
 * For reference, Content Link Function signature: 
 *    $url(pipeline, key, value)$
 * 
 * @param {string} type – the type of link function to generate
 * @param {string} id – the unique id for a page, product, or category
 * @returns the content link function string
 */

// TODO: Add formal support for html fragments as an optional arg? (e.g., path/to/some#fragment)
// TODO: is this where we'd add filter URL functionality?
export default function url(type, id) {
  // Pipeline tuples that include 
  // - the name of the pipeline 
  // - the respective key for the id (value)
  let pipelines = {
    page: ['Page-Show', 'cid'],
    product: ['Product-Show', 'pid'],
    category: ['Search-Show', 'cgid'],
  }

  // Check type
  let types = Object.keys(pipelines);
  if (!types.some(t => t === type)) {
    throw new Error(`URL type '${type}' is not a supported pipeline. Supported types: ${types.join(', ')}`);
  }

  // Get the pipeline info
  let pipeline = pipelines[type];
  // Build the link function string
  return `$url('${pipeline[0]}', '${pipeline[1]}', '${id}')$`;
}
