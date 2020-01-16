import { inquirer } from '../instances';
import { PromptListQuestion, PromptCheckboxQuestion, PromptAutocompleteQuestion } from '../types';

type PromptFactoryType = PromptListQuestion | PromptCheckboxQuestion | PromptAutocompleteQuestion;

export class PromptFactory<T extends PromptFactoryType> {
  private question: PromptFactoryType | null;

  constructor(question: T) {
    this.question = question;
  }

  ask = () => {
    if (!this.question) {
      throw new Error('Question cannot be null');
    }

    return inquirer.prompt([this.question]);
  };
}
