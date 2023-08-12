import { Command } from "commander";

class CommandAttachmentManager {
  /**
   * Construct The ComandRegistry
   * @param program - instance of  Command
   */
  constructor(private program: Command) {}

  /**
   * Attach Command to command registry callback `fn` for the command.
   *
   * @example
   * ```
   * registryInstance
   *   .attachCommand(function(command) {
   *     // do work here
   *   });
   * ```
   *
   * @returns `this` command for chaining
   */
  attachCommand(fn: (program: Command) => void) {
    fn(this.program);
    return this;
  }
}

export default CommandAttachmentManager;
