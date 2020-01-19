import { API } from '../../service/Api';
import { EpisodeApiObject } from '../../types';
import { EpisodesPrompt, createChoices, filter } from '../Episodes';
import { PromptFactory } from '../../model/PromptFactory';
import { state } from '../../state';

jest.mock('../../state', () => {
  return {
    state: {
      isSeries: false,
      getMovieDetails: jest.fn(),
    },
  };
});

jest.mock('../../model/PromptFactory', () => {
  return {
    PromptFactory: jest.fn().mockImplementation(() => ({
      ask: jest.fn(),
    })),
  };
});

jest.mock('../../instances', () => {
  return {
    spinner: {
      start: jest.fn(),
      stop: jest.fn(),
    },
  };
});

jest.mock('../../service/Api', () => {
  return {
    API: {
      fetchEpisodes: jest.fn().mockImplementation(() => [
        {
          epNumber: '1',
          title: 'dummy title',
        },
      ]),
    },
  };
});

describe('EpisodesPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns if is not a series', async () => {
    expect.assertions(1);

    const result = await EpisodesPrompt();
    expect(result).toBeUndefined();
  });

  describe('Prompt', () => {
    const movieDetails = {
      id: '123',
    };
    const selectedSeason = '33';

    beforeEach(async () => {
      jest.clearAllMocks();

      (state.getMovieDetails as jest.Mock).mockImplementation(
        () => movieDetails,
      );
      state.selectedSeason = selectedSeason;
      state.isSeries = true;
    });

    it('fetchEpisodes was called with movieDetails id and selected season', async () => {
      await EpisodesPrompt();
      expect(API.fetchEpisodes).toHaveBeenCalledTimes(1);
      expect(API.fetchEpisodes).toHaveBeenCalledWith(
        movieDetails.id,
        selectedSeason,
      );
    });

    it('throws an error if getMovieDatails returns undefined', async () => {
      (state.getMovieDetails as jest.Mock).mockImplementation(() => undefined);

      await expect(EpisodesPrompt()).rejects.toThrowError(
        'No season details found',
      );
    });

    describe('Calls PromptFactory', () => {
      it('with expected params', async () => {
        await EpisodesPrompt();
        expect(PromptFactory).toHaveBeenCalledTimes(1);

        expect(PromptFactory).toHaveBeenLastCalledWith(
          expect.objectContaining({
            choices: [
              {
                name: 'Episode 1: dummy title',
                value: {
                  epNumber: '1',
                  title: 'dummy title',
                },
              },
            ],
            filter: expect.any(Function),
            message: 'Which episode?',
            name: 'episode',
            type: 'list',
          }),
        );
      });

      it('calls "ask" function', async () => {
        const ask = jest.fn();

        (PromptFactory as jest.Mock).mockImplementation(() => {
          return {
            ask,
          };
        });

        await EpisodesPrompt();
        expect(ask).toHaveBeenCalled();
      });
    });
  });
});

describe('fn: createChoices', () => {
  const epObj: EpisodeApiObject = {
    epNumber: 1,
    title: 'Some EP',
    link: 'http://google.com',
  };

  const eps = [epObj];

  const result = createChoices(eps);

  it('returns an array', () => {
    expect(result).toBeInstanceOf(Array);
  });

  it('result array has the same length as the received', () => {
    expect(result).toHaveLength(eps.length);
  });

  it('object returned has a created name', () => {
    expect(result[0].name).toBe('Episode 1: Some EP');
  });
  it('object returned has value of the original object ', () => {
    expect(result[0].value).toEqual(epObj);
  });
});

describe('fn: filter', () => {
  state.saveSelectedEpisode = jest.fn();
  const epObj: EpisodeApiObject = {
    epNumber: 1,
    title: 'Some EP',
    link: 'http://google.com',
  };

  let result: EpisodeApiObject;
  beforeEach(() => {
    result = filter(epObj);
  });

  it('saves on state the episode selected', () => {
    expect(state.saveSelectedEpisode).toHaveBeenCalledWith(epObj);
  });

  it('returns the selected episode', () => {
    expect(result).toEqual(epObj);
  });
});
