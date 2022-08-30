import { createPromptModule } from '../config/inquirer';

export const enum AppOptions {
  SelectLanguage = 'select_language',
}

export async function mainAppPrompt(): Promise<AppOptions> {
  const prompt = createPromptModule();

  const { option } = await prompt([
    {
      type: 'list',
      name: 'option',
      choices: [{ name: '1. Select preferred languages', value: AppOptions.SelectLanguage }],
    },
  ]);

  return option as AppOptions;
}
