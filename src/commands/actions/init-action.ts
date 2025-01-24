import { log } from "console";
import path from "path";

import colors from "ansi-colors";
import loger from "../../utils/loger.js";
import { template } from "../../templates/wx33-yml-template.js";
import inquirer, { Answers, QuestionCollection } from "inquirer";
import { fileExistsAsync, writeFileAsync } from "../../utils/file-operation.js";

export default async function initAction(option: any, comand: any) {
  const currentDirectory = process.cwd();
  const configFile = path.join(currentDirectory, "wx33.yml");
  const isForce = option.force ?? false;
  const isSkipPrompts = option.yes ?? false;
  const isConfigExist = await fileExistsAsync(configFile);

  loger.log("Initializing wx33.yaml ");

  /**
   * 1. wx33.yml already exists in this directory
   * 2. Using -f  --force will overwrite existing wx33.yml
   * 3. Using -y  --yes will skip prompts
   */

  if (isConfigExist && !isForce) {
    loger.warn("wx33.yml already exists in this directory");
    loger.error("Using -f  --force will overwrite existing wx33.yml");
    return;
  }

  if (isSkipPrompts && (!isConfigExist || (isConfigExist && isForce))) {
    await writeFileAsync(configFile, template);
    console.log(`Initialize Project Success!`);
    return;
  }

  const questions: QuestionCollection[] = [
    {
      type: "confirm",
      name: "overwrite",
      message: "wx33.yml already exists in this directory, overwrite it?",
      default: false,
      when: () => isConfigExist && isForce,
    },
    {
      type: "input",
      name: "project_name",
      message: "Enter project name:",
    },
    {
      type: "input",
      name: "deployment_env",
      message: "Enter deployment environment:",
      default: "production",
    },
    {
      type: "input",
      name: "domain",
      message: "Enter domain:",
      validate: (value: string) => {
        if (isValidURL(value)) {
          return true;
        }
        return "Please enter a valid URL eg. https://your-domain.com";
      },
    },
    {
      type: "confirm",
      name: "ssl_certificate",
      message: "Generate SSL certificate?",
      default: true,
    },
    {
      type: "input",
      name: "server_ip",
      message: "Enter server IP:",
    },
    {
      type: "input",
      name: "ssh_username",
      message: "Enter SSH username:",
      default: "root",
    },
    {
      type: "input",
      name: "ssh_private_key_path",
      message: "Enter SSH private key path:",
      default: "~/.ssh/id_rsa",
    },
    {
      type: "input",
      name: "deployment_directory",
      message: "Enter deployment directory:",
      default: "/var/www",
    },
  ];

  const answers = await inquirer.prompt(questions);
  loger.log("Generating wx33.yml...");
  const yaml = generateYAML(answers);
  await writeFileAsync(configFile, yaml);
  loger.log("Initialize Project Success!");
}

function isValidURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
// TODO: move this logic seprate
function generateYAML(config: any) {
  return `
# Wx33 Configuration

project_name: ${config.project_name}
deployment_env: ${config.deployment_env}
domain: ${config.domain}
ssl_certificate: ${config.ssl_certificate}


# services:
# - name: backend #required
#   repo: username/backend-repo 
#   docker_file: Dockerfile
#   access_token: your-access-token
#   command: "docker run -d --name backend -p 5000:80 backend" # required
#   domain:  https://website.com/api # proxy pass /api - # required
#   environments:
#     DB_HOST: database
#     DB_PORT: "5432"
#     API_KEY: my-secret-key

# - name: frontend
#   docker_file: Dockerfile.prod
#   repo: username/frontend-repo
#   access_token: your-access-token 
#   docker_file: Dockerfile
#   command: "docker run -d --name backend -p 5000:80 frontend"
#   domain:  https://website.com # proxy pass /api - #required
#   environments:
#     API_URL: https://website.com/api

# - name: database
#   image: postgres:latest
#   command: "docker run -d --name database -p 5432:80 -v db:/lib/data postgress:latest"

# Server Settings
server_settings:
  server_ip: ${config.server_ip}
  ssh_username: ${config.ssh_username}
  ssh_private_key_path: ${config.ssh_private_key_path}
  deployment_directory: ${config.deployment_directory}
`;
}
