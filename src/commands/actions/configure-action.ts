import yaml from "js-yaml";
import { fileExistsAsync, readFileAsync } from "../../utils/file-operation.js";

export default async function configureAction() {
  const configPath = process.cwd() + "/wx33.yml";
  if (!(await fileExistsAsync(configPath))) {
    console.log("wx33.yml not found");
    return;
  }
  try {
    const configString = await readFileAsync(configPath, "utf8");
    const config = yaml.load(configString);
    console.log(config);

    //TODO: Make a ssh connection to the server
    //TODO: Copy the required files to the server
    //TODO: Run the commands/scripts on the server
    //TODO: generate the nginx config file on the server
  } catch (e) {
    console.log(e);
  }
}
