import { inquirer } from '../instances';

export function LanguagePrompt(languagesAvailable) {
  const question = {
    choices: languagesAvailable,
    message: 'Choose the language',
    name: 'language',
    type: 'list',
  };
  // @ts-ignore
  return inquirer.prompt(question);
}
