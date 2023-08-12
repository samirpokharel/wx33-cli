import { log } from "console";
import path from "path";
import util from "util";
import fs from "fs";
import colors from "ansi-colors";
import loger from "../../utils/loger.js";
import { template } from "../../templates/wx33-yml-template.js";

const writeFileAsync = util.promisify(fs.writeFile);
const fileExistsAsync = util.promisify(fs.exists);

export default async function initAction(option: any, comand: any) {
  loger.log("Creating a new project...");
  loger.log("Initializing wx33.yaml ");

  const currentDirectory = process.cwd();
  const configFile = path.join(currentDirectory, "wx33.yml");
  const force = option.force ?? false;
  const skipPrompts = option.yes ?? false;
  const configExist = await fileExistsAsync(configFile);

  if (configExist && !force) {
    loger.warn("wx33.yml already exists in this directory");
    loger.error("Using -f  --force will overwrite existing wx33.yml");
    return;
  }

  if (skipPrompts && !configExist) {
    await writeFileAsync(configFile, template);
    console.log(`Initialize Project Success!`);
    return;
  }

  

  try {
    if ((await fileExistsAsync(configFile)) && !force) {
      loger.warn(
        "wx33.yml already exists in this directory Using " +
          "--force to overwrite existing wx33.yml"
      );
      loger.error("Using --force will overwrite existing wx33.yml");
    } else {
      await writeFileAsync(configFile, template);
      console.log(`Initialize Project Success!`);
    }
  } catch (error) {
    console.error("Error creating configuration file:", error);
  }
}
