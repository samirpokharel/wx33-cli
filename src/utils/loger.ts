import colors from "ansi-colors";

export default {
  log: (message: string) => console.log(message),
  error: (message: string) => console.log(colors.red(message)),
  warn: (message: string) => console.log(colors.yellow(message)),
  debug: (message: string) => console.log(colors.gray(message)),
};
