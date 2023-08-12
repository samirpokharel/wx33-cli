import figlet from "figlet";
import { appConfig } from "../config/config.js";
import { log } from "console";

function figletAsync(text: string) {
  return new Promise((resolve, reject) => {
    figlet(text, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

export async function logFiglet() {
  try {
    const asciiArt = await figletAsync(appConfig.APP_NAME);
    console.log(asciiArt);
    log("---------------------------------------");
    // log("A CLI tool for Continous Intregartion and Deployment");
    // log("---------------------------------------");
  } catch (error) {
    console.log(error);
  }
}
