import { Command } from "commander";
import initAction from "./actions/init-action.js";
import configureAction from "./actions/configure-action.js";

/**
 * Setup the init command
 * @param {Command} program - The program instance
 * @returns {void}
 * @example
 * setupInit(program);
 */

export function setupInit(program: Command): void {
  program
    .command("init")
    .description("Initialize a new project for WX33")
    .option("-f, --force", "Overwrite existing wx33.yml")
    .option("-y, --yes", "Skip prompts and use default values")
    .action(initAction);
}

/**
 * Configure project
 * @param {Command} program - The program instance
 * @returns {void}
 */

export function setupConfigure(program: Command): void {
  program
    .command("configure")
    .description("Configure an existing project")
    .action(configureAction);
}
