# Sub-TV

> Download Movies and Series subtitles via a intuitive node CLI.

<p align="center">
  <img src="media/logo.png" height="100" width="100" alt="Logo">
  <p align="center">
    <img src="https://github.com/raulfdm/subtv/workflows/Node%20CI/badge.svg" alt="Build bagde">
    <a href="https://david-dm.org/raulfdm/sub-tv" title="dependencies status">
    <img src="https://david-dm.org/raulfdm/sub-tv/status.svg"/></a>
  </p>
</p>

## Motivation

Search subtitles might be an easy task but also a boring one. So what if we can do that just using our favorite tool?

<p align="center">
  <img src="media/demo.gif" alt="CLI Demo">
</p>

> GIF recorded using [terminalizer](https://terminalizer.com/)!

## Subtitles Provider

This CLI uses [`open-subtitles`](https://www.opensubtitles.org/) as provider. They have [an API](https://trac.opensubtitles.org/projects/opensubtitles/wiki/XMLRPC) to help us (devs) to create apps on top of they resource.

It means whatever subtitle you can find in the website, you'll be able to find using this CLI!

## Server API

Because their API is protected by user Token they provide you via requirement, I had to create a server (to hold my personal key) and to be a middleware for this CLI, which unfortunately is not open-source but hopefully soon I'll merge it into this repo.

Behind the scenes my server uses [`opensubtitles-api`](https://www.npmjs.com/package/opensubtitles-api) package which provides a very good abstraction for this XMLRPC API.

## How use

Since it's a NodeJS CLI, you **do** need to have it installed.

> For more info: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Also, I'd suggest you install it globally since the idea is to reuse more than once:

```bash
npm i -g sub-tv
```

Refresh your terminal section (or open another tab) and call the CLI:

```bash
subtv
```

A prompt will appears and ask you a bunch of questions (as you can see in the initial gif). When all questions got answered and the subtitles desired selected, they will be download in the same folder you call `sub-tv` CLI.

## Issues

Having some problem? Please report via GH Issue :)

## License

[MIT License](https://github.com/afonsopacifer/open-source-boilerplate/blob/master/LICENSE.md) © [Raul Melo](https://rauldemelo.com.br)
