import util from "util";
import fs from "fs";

export const writeFileAsync = util.promisify(fs.writeFile);
export const fileExistsAsync = util.promisify(fs.exists);
export const readFileAsync = util.promisify(fs.readFile);
