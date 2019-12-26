# Sub - TV

> Download your subtitles via terminal

<p align="center">
  <img src="http://i.imgur.com/66TO4jx.png" height="100" width="100" alt="Logo">
  <p align="center">
    <img src="https://travis-ci.org/raulfdm/sub-tv.svg?branch=master" alt="Build bagde">
    <a href="https://david-dm.org/raulfdm/sub-tv" title="dependencies status"><img src="https://david-dm.org/raulfdm/sub-tv/status.svg"/></a>
  </p>
</p>

## Motivation

Search subtitles may be a easy task, but it can be better. We are used to access our favorite subtitles website, fill fields, click on links, buttons, etc... But wait! Look below how easy it can be:

<p align="center">
  <img src="https://media.giphy.com/media/3o6vXKXVYC1kx6pWO4/giphy.gif" alt="Animated Gif">
</p>

## Subtitles Provider

Actually it have just one provider: [tv-subs.com](http://www.tv-subs.com/) and consequently we can only download **tv series** subtitles.

## How use

Firs of all, install it globally

```bash
yarn global add sub-tv

# Of if you're npm person
npm i -g sub-tv
```

Then, open your favorite terminal and call the CLI:

> If you already have a tab opened, be sure to run `source` or open another tab the get a refreshed global package list

```bash
subtv
```

Then a prompt will ask you which series you want to look for, which episode, language and subtitle release.

After all questions, the subtitle will download in the same folder you're running the CLI.

## Known Issues

- Many subtitles and series not found. That's because the provider I use does not have. Hopefully I'm gonna implement with `opensubtitle`;
- [Do not found subtitle breaks the app](https://github.com/raulfdm/subtv/issues/1)
- [Cannot read property name from undefined](https://github.com/raulfdm/subtv/issues/1)

## License

[MIT License](https://github.com/afonsopacifer/open-source-boilerplate/blob/master/LICENSE.md) © [Raul Melo](https://rauldemelo.com.br)
