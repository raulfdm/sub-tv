import { apiClient } from '../config/apiClient';
import { db } from '../config/db';
import { createPromptModule } from '../config/inquirer';

export async function languagesPrompt() {
  const prompt = createPromptModule();

  const allLanguages = await apiClient.fetchLanguages();

  const { languages } = await prompt([
    {
      type: 'checkbox',
      name: 'languages',
      message: 'Select the languages you want to search subtitles for:',
      default: db.preferredLanguages,
      choices: allLanguages.map((lang) => ({ value: lang.language_code, name: lang.language_name })),
    },
  ]);

  db.setLangs(languages as string[]);
}
