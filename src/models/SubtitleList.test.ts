const SubtitleList = require('./SubtitleList');
const Subtitle = require('./Subtitle');

describe('SubtitleList Class', () => {
  test('Should set a new Subtitle into array', () => {
    const subList = new SubtitleList();
    const subtitle = new Subtitle(
      0,
      'Indonesian',
      'Beyond.S01E01.Pilot.SEMUA.HDTV',
      'https://www.tv-subs.com/subtitle/beyond-season-1-episode-1-indonesian-28620.zip',
    );
    subList.add = subtitle;
    expect(subList.all).toEqual([subtitle]);
  });
  describe('Many subtitles into the list', () => {
    const subList = new SubtitleList();
    const arabic = new Subtitle(
      '0',
      'Arabic',
      'Game.of.Thrones.S07E02.Stormborn.1080p.AMZN.WEBRip.DDP5.1.x264-GoT',
      'https://www.tv-subs.com/subtitle/game-of-thrones-season-7-episode-2-arabic-38054.zip',
    );
    subList.add = arabic;

    const english = new Subtitle(
      '0',
      'English',
      'Game.of.Thrones.S07E02.Stormborn.720p.AMZN.WEB-DL.DD+5.1.H.264-GoT',
      'https://www.tv-subs.com/subtitle/game-of-thrones-season-7-episode-2-english-38051.zip',
    );
    subList.add = english;

    const french = new Subtitle(
      '0',
      'French',
      'Game.of.Thrones.S07E02.720p.HDTV.x264-AVS',
      'https://www.tv-subs.com/subtitle/game-of-thrones-season-7-episode-2-french-38057.zip',
    );
    subList.add = french;

    test('Should return an Object of languages and it subtitles', () => {
      const data = {
        Arabic: [arabic],
        English: [english],
        French: [french],
      };
      expect(subList._listOfSubtitlesByLanguage).toEqual(data);
    });
    subList.languagesAvailable;
    test('Should return the correct list of languages Available', () => {
      const languages = ['Arabic', 'English', 'French'];
      expect(subList.languagesAvailable).toEqual(languages);
    });

    test('Should return all subtitles by a Language', () => {
      const languages = ['Arabic'];
      expect(subList.getByLanguage(languages)).toEqual([arabic]);
    });
  });
});
