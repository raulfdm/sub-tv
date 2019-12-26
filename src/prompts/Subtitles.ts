import { inquirer } from '../instances';

import { EpisodeModel } from '../models/';
import { SubtitleService } from '../service/Subtitle';
import { LanguagePrompt } from './LanguagePrompt';

export async function SubtitlesPrompt({ episode }: { episode: EpisodeModel }) {
  const subtitleList = await SubtitleService.fetch(episode.link);
  const { language } = await LanguagePrompt(subtitleList.availableLanguages);

  const filteredSubtitle = subtitleList.getSubtitlesByLanguage(language);

  const question = {
    choices: filteredSubtitle.map((subtitle, index) => ({
      name: `Rating: ${subtitle.rating} | Release: ${subtitle.releaseName}`,
      value: index,
    })),
    message: 'Choose the subtitle',
    name: 'subtitle',
    type: 'list',
    filter: indexSelected => filteredSubtitle[indexSelected],
  };

  // @ts-ignore
  return inquirer.prompt(question);
}
