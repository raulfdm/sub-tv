import type { Feature, OpenSubtitleFeatureApiResponse } from '@sub-tv/open-subtitle';
import debouncePromise from 'debounce-promise';
import prompts from 'prompts';

import { apiClient } from '../config/apiClient';

export async function featuresPrompt(): Promise<Feature> {
  const { feature } = await prompts({
    name: 'feature',
    type: 'autocomplete',
    message: `Type the TvShow, Movie or Episode's name you're looking for:`,
    choices: [],
    onRender() {
      /**
       * This is the only possible way to update the choices based on a suggestion.
       *
       * Because the interface is not correct, we have to ignore the type error.
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.choices = this.suggestions;
    },
    suggest: debouncePromise(async (input) => {
      return input.length > 3 ? fetchFeature(input) : [];
    }, 400),
  } as prompts.PromptObject);

  return feature;
}

async function fetchFeature(input: string) {
  const features = await apiClient.searchFeature({
    query: input,
  });

  return serializeFeatureList(features);
}

function serializeFeatureList(features: OpenSubtitleFeatureApiResponse['data'] = []) {
  return features.map((feature) => ({
    title: `(${feature.attributes.feature_type}) ${feature.attributes.title}`,
    value: feature,
  }));
}
