import prompts from 'prompts';

import { apiClient } from '../config/apiClient';
import { db } from '../config/db';

export async function languagesPrompt() {
  const allLanguages = await apiClient.fetchLanguages();

  const { languages } = await prompts([
    {
      type: 'autocompleteMultiselect',
      name: 'languages',
      message: 'Select the languages you want to search subtitles for:',
      choices: allLanguages.map((lang) => ({
        value: lang.language_code,
        title: lang.language_name,
        selected: db.preferredLanguages.includes(lang.language_code),
      })),
    },
  ]);

  // TODO: move this to an action
  db.setLangs(languages as string[]);
}
