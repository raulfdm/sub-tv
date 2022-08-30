import inquirerAutoComplete from '@sub-tv/inquirer-autocomplete-prompt';
import inquirerLocal from 'inquirer';

inquirerLocal.registerPrompt('autocomplete', inquirerAutoComplete);

export const inquirer = inquirerLocal;

export function createPromptModule() {
  const prompt = inquirer.createPromptModule();
  prompt.registerPrompt('autocomplete', inquirerAutoComplete);

  return prompt;
}
