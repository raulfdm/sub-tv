import debouncePromise from 'debounce-promise';

import { apiClient } from '../config/apiClient';
import { createPromptModule } from '../config/inquirer';

export async function featuresPrompt() {
  const prompt = createPromptModule();

  const { option } = await prompt([
    {
      source: debouncePromise(fetchFeature, 400),
      name: 'movie_name',
      type: 'autocomplete',
      defaultValue: '',
      message: `What's the tv-series or movie name you're looking for? (The result can take a while, be patient)`,
    },
  ]);
}

async function fetchFeature(_: any, input: string) {
  if (!input) {
    return [];
  }

  const a = await apiClient.searchFeature(input);
  console.log(a);
}
