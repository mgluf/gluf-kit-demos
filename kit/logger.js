import chalk from 'chalk';

let prefix = chalk.blue.bold('[kit]');
export default {
  info: (str) => console.log(prefix, str),
  warn: (str) => console.log(prefix, chalk.yellow(str)),
  error: (str) => console.log(prefix, chalk.red(str)),
}