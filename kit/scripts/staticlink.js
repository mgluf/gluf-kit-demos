const fileExtensions = [
  'jpg', 
  'jpeg', 
  'png', 
  'svg', 
  'webp',
  'avif',
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


// TODO: how to avoid this conflicting with external resources, like wistia embeds?
//       I think the functionality would need to be reworked so that it's explicitly
//       targeting the elements we want. 
//       
//       Might need to add cayo enhancement that adds data attributes to those elements
// 
export function staticlink(str) {
  const linkRegex = /\<link href\=\"(.+)\"\>/g;
  const scriptRegex = /\<script src\=\"(.+)\"\>/g;

  for (const ext of fileExtensions) {
    const links = str.match(linkRegex);
    const scripts = str.match(scriptRegex);
    let matches = [
      links ? [...links] : [], 
      scripts ? [...scripts] : [],
    ];

    for (const m in matches) {
      if (!m.includes('?')) {
        str.replaceAll(m, `.${ext}?$staticlink$`);
      } else {
        if (!m.includes('?$staticlink$')) {
          const urlQuery = str.split('?')[1];
          str.replaceAll(m, `.${ext}?$staticlink$?${urlQuery}`);  
        }
      }
    }
  }
}