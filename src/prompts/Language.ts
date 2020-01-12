import { state } from '../state';
import { PromptFactory } from '../model/PromptFactory';
import { PromptAutocompleteQuestion } from '../types';

export function LanguagePrompt(): Promise<unknown> {
  function filter(chosenLanguage: string): string {
    state.saveSelectedLanguage(chosenLanguage);
    return chosenLanguage;
  }

  function source(_: string, userInput = ''): Promise<string[]> {
    function filterUserChoice(lang: string): boolean {
      return lang.toLowerCase().includes(userInput.toLocaleLowerCase());
    }

    return Promise.resolve(state.getAvailableLanguages().filter(filterUserChoice));
  }

  return new PromptFactory<PromptAutocompleteQuestion>({
    type: 'autocomplete',
    message: 'For what language?',
    filter,
    source,
    name: 'language',
  }).ask();
}
