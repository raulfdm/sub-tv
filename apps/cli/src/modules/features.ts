import type { Feature, OpenSubtitleFeatureApiResponse } from '@sub-tv/open-subtitle';
import { FeatureType } from '@sub-tv/open-subtitle';
import debouncePromise from 'debounce-promise';
import inquirer from 'inquirer';
import groupBy from 'lodash.groupby';

import { apiClient } from '../config/apiClient';
import { createPromptModule } from '../config/inquirer';

export async function featuresPrompt(): Promise<Feature> {
  const prompt = createPromptModule();

  const { feature } = await prompt<{ feature: Feature }>([
    {
      source: debouncePromise(fetchFeature, 400),
      name: 'feature',
      type: 'autocomplete',
      message: `What's the tv-series or movie name you're looking for? (The result can take a while, be patient)`,
      loop: false,
      pageSize: 30,
    },
  ]);

  return feature;
}

async function fetchFeature(_: any, input: string) {
  if (!input) {
    return [];
  }

  const features = await apiClient.searchFeature({
    query: input,
  });
  const group = groupBy(features, 'attributes.feature_type');

  const result = [];

  const tvShows = serializeFeatureList(group[FeatureType.Tvshow]);
  if (tvShows.length > 0) {
    result.push(new inquirer.Separator('________________TV Shows________________'));
    result.push(...tvShows);
  }

  const movies = serializeFeatureList(group[FeatureType.Movie]);
  if (movies.length > 0) {
    result.push(new inquirer.Separator('________________Movies________________'));
    result.push(...movies);
  }

  const episodes = serializeFeatureList(group[FeatureType.Episode]);
  if (episodes.length > 0) {
    result.push(new inquirer.Separator('________________Episodes________________'));
    result.push(...episodes);
  }

  return result;
}

function serializeFeatureList(features: OpenSubtitleFeatureApiResponse['data'] = []) {
  return features.map((feature) => ({
    name: feature.attributes.title,
    value: feature,
  }));
}
