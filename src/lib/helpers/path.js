
/**
 * Parse a string as a file path
 * 
 * Browser-friendly replacement for Node's path module: path.parse
 * 
 * @param {string} path the path string to parse
 * @returns pieces of the parsed path: { dir, base, name, ext, rest }
 */

export function parse(path) {
  const dirRegex = /(?<dir>(?:[^\/]*\/)*)(?<base>.*)/;
  const baseRegex = /(?<name>[\w\d\D]+)(?<ext>\.[\w\d]+)(?<rest>.+)/;
  
  const dirStrings = path.match(dirRegex)?.groups;

  let dir = dirStrings?.dir ? dirStrings.dir : '';
  let base = dirStrings?.base ? dirStrings.base : '';

  const baseStrings = base.match(baseRegex)?.groups;
  
  let name = baseStrings?.name ? baseStrings.name : '';
  let ext = baseStrings?.ext ? baseStrings.ext : '';
  let rest = baseStrings?.rest ? baseStrings.rest : '';

  if (name === '') {
    console.warn(`The path '${path}' cannot be parsed to get the 'name'\n`, 'Parsed:', {dir, base, name, ext});
  }
  if (ext === '') {
    console.warn(`The path '${path}' cannot be parsed to get the 'ext'\n`, 'Parsed:', {dir, base, name, ext});
  }

  return { 
    dir,
    base,
    name,
    ext,
    rest,
  }
}