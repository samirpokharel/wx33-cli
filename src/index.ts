import { Command } from "commander";
import { logFiglet } from "./utils/figlet.js";
import { appConfig } from "./config/config.js";
import CommandAttachmentManager from "./commands/service/command-manager.js";
import { setupInit } from "./commands/index.js";

const program = new Command();

(async () => {
  await logFiglet();
  await setup().catch(handleError);
})();

/**
 * Setup the program
 */
async function setup() {
  new CommandAttachmentManager(program).attachCommand(setupInit);

  program
    .name(appConfig.APP_NAME)
    .version(appConfig.APP_VERSION)
    .description(appConfig.APP_DESCRIPTION)
    .parse(process.argv);
}

/**
 * Error handling function
 * @param {Error} error - The error object
 */
function handleError(error: Error): void {
  console.error(error);
}
