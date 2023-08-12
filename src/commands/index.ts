import { Command } from "commander";
import initAction from "./actions/init-action.js";

export function setupInit(program: Command): void {
  program
    .command("init")
    .description("Initialize a new project for WX33")
    .option("-f, --force", "Overwrite existing wx33.yml")
    .option("-y, --yes", "Skip prompts and use default values")
    .action(initAction);
}
