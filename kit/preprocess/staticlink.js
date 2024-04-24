// TODO: consider just doing this inside of relevant components instead of globally
// maybe the appender thing is just a shared function (src in, src with appended thing out)

const fileExtensions = [
  'jpg', 
  'jpeg', 
  'png', 
  'svg', 
  'webp',
  'js',
  'css',
  'json',
  'xml',
  'csv',
  'pdf',
  'pages',
  'docx',
  'doc',
  'xlsx',
  'xls',
  'ppt',
  'pptx',
  'txt',
  'md',
]

export function staticlink(str) {
  for (const ext of fileExtensions) {
    const regex = new RegExp(`.${ext}`, 'g');
    const match = str.match(regex);
    let matches = new Set(match ? [...match] : []);
    for (const m in matches) {
      if (!m.includes('?')) {
        str.replaceAll(m, `.${ext}?$staticlink$`);
      } else {
        const urlQuery = str.split('?')[1];
        str.replaceAll(m, `.${ext}?$staticlink$?${urlQuery}`);
      }
    }
  }
}