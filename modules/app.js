import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.black.bgCyan("test module import"));
console.log(chalk.black.bgGreen(__dirname));
console.log(chalk.black.bold.bgBlue(__filename));
