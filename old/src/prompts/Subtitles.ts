import { state } from '../state';
import { PromptFactory } from '../model/PromptFactory';
import { SubtitleApiObject, PromptCheckboxQuestion } from '../types';

export async function SubtitlesPrompt(): Promise<unknown> {
  const choices = state.getSubtitlesByLanguage(state.selectedLanguage!).map(sub => ({
    name: sub.fileName,
    value: sub,
  }));

  function filter(subtitles: SubtitleApiObject[]): SubtitleApiObject[] {
    state.saveSelectSubtitltes(subtitles);
    return subtitles;
  }

  function validate(userInput: string[]): string | boolean {
    if (!userInput || userInput.length < 1) {
      return 'You must select at least one subtitle (use your space bar to do it)';
    }
    return true;
  }

  return new PromptFactory<PromptCheckboxQuestion>({
    choices,
    name: 'subtitle',
    message: 'Choose all subtitles you want to download',
    filter,
    type: 'checkbox',
    validate,
  }).ask();
}
