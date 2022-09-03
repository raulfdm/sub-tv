import { createPromptModule } from '../config/inquirer';

export const enum AppOptions {
  SelectLanguage = 'select_language',
  SearchMovies = 'search_movies',
  TestDownload = 'test_download',
  Exit = 'exit',
}

export async function mainAppPrompt(): Promise<AppOptions> {
  const prompt = createPromptModule();

  const { option } = await prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Main Menu. Select an option:',
      choices: [
        { name: '1. Select preferred languages', value: AppOptions.SelectLanguage },
        {
          name: '2. Search for movies',
          value: AppOptions.SearchMovies,
        },
        {
          name: '0. Exit',
          value: AppOptions.Exit,
        },
      ],
    },
  ]);

  return option as AppOptions;
}
