export type PromptType = 'autocomplete' | 'list' | 'checkbox';

export type PromptFilterFn = (userSelection: any) => any;

export type PromptBaseQuestion = {
  name: string;
  type: PromptType;
  message: string;
  filter: PromptFilterFn;
  validate?: (userSelection: any) => boolean | string;
};

export type ChoiceType = {
  name: string;
  value: any;
};

export type Choices = { choices: ChoiceType[] | string[] };

export type PromptListQuestion = PromptBaseQuestion &
  Choices & { type: 'list' };

export type PromptCheckboxQuestion = PromptBaseQuestion &
  Choices & {
    type: 'checkbox';
  };

export type PromptAutocompleteQuestion = PromptBaseQuestion & {
  source: (answer: string, input: string) => Promise<string[]>;
  type: 'autocomplete';
};
