import ora from "ora";

export const spinner = ora();

export const config = {
  distPath: process.cwd(),
  /* Will be replaced by the correct URL via @rollup/plugin-replaced */
  serverUrl: "__SERVER_URL__"
};
