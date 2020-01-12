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

  return new PromptFactory<PromptCheckboxQuestion>({
    choices,
    name: 'subtitle',
    message: 'Choose subtitles to download',
    filter,
    type: 'checkbox',
  }).ask();
}
