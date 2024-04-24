#!/usr/bin/env node

import { staticlink } from './staticlink.js';

// Run staticlink
function run() {
  // 1. read file(s)
  // 2. transform code
  transform(/* code */);
  // 3. write file
}

function transform(code) {
  // Append ?$staticlink$ to resource URLs
  code = staticlink(code);
  return code;
}

run();