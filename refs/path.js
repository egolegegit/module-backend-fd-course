const path = require("path");
const chalk = require("chalk");

console.log(chalk.green(path.dirname(__filename)));
console.log(chalk.yellow(path.basename(__filename)));
console.log(chalk.blue(path.extname(__filename)));
console.log(chalk.yellow(path.extname(__filename).slice(1)));
console.log(chalk.green(path.parse(__filename)));
console.log(chalk.red(path.resolve(__dirname, "..", "./modules", "./app.js")));
console.log(chalk.red(path.resolve(__dirname, "..", "./modules", "./app.js")));
