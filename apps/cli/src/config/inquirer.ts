import inquirerAutoComplete from '@sub-tv/inquirer-autocomplete-prompt';
import inquirerLocal from 'inquirer';

inquirerLocal.registerPrompt('autocomplete', inquirerAutoComplete);

const inquirer = inquirerLocal;

export const inquirerUi = new inquirer.ui.BottomBar();

export function createPromptModule() {
  const prompt = inquirer.createPromptModule();
  prompt.registerPrompt('autocomplete', inquirerAutoComplete);

  return prompt;
}
