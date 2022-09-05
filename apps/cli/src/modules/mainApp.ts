import prompts from 'prompts';

export const enum AppOptions {
  SelectLanguage = 'select_language',
  SearchMovies = 'search_movies',
  Logout = 'logout',
  Exit = 'exit',
}

export async function mainAppPrompt(): Promise<AppOptions> {
  const { option } = await prompts({
    type: 'select',
    name: 'option',
    message: 'Main Menu. Select an option:',
    choices: [
      { title: 'Select Preferred Languages', value: AppOptions.SelectLanguage },
      {
        title: 'Search for movies, tv shows and episodes',
        value: AppOptions.SearchMovies,
      },
      { title: 'Logout', value: AppOptions.Logout },
      {
        title: 'Exit',
        value: AppOptions.Exit,
      },
    ],
  });

  return option;
}
