# Contributing

> [!CAUTION]
> Issues and PRs created without following the guidelines listed below **will be closed** until they match the expected template.

## Bug report
Open a [bug report issue](https://github.com/juliangarnier/anime/issues/new?template=bug_report.md) by following the bug report template and attaching the "bug" label.

## New features proposal
Open a [feature proposal issue](https://github.com/juliangarnier/anime/issues/new?template=feature_request.md) by following the feature proposal template and attaching the "feature proposal" label.

## Question
If you have a question not related to a bug or a new feature, do not create an issue, but start a [Q&A discussion](https://github.com/juliangarnier/anime/discussions/new?category=q-a) instead.

## Documentation update
Open a [documentation update issue](https://github.com/juliangarnier/anime/issues/new?template=documentation-update.md) by following the documentation update template and attaching the "documentation" label.

## Development
Anime.js is written in JavaScript and the type definitions are generated from [JSDoc](https://jsdoc.app/) annotations.

JSDoc types used globally in the project are defined in the `src/types.js` file. Otherwise, JSDoc types should be defined directly in their corresponding file.

Before opening a PR, follow these steps to properly build and test the project:

1. Make sure your PR has a bug report or new feature proposal issue associated with it. If not, create one.
2. Clone your fork to your computer.
3. Install the NPM dependencies with `npm i`.
4. Modify or add `.js` files in `/src`, with valid JSDoc annotations.
5. Run `npm run dev-types` to build the `anime.esm.js` and `index.d.ts` files by watching changes in `/src`.
6. Add the necessary tests to the relevant file in `/test/suites/`.
7. Run `npm run test-browser` to make sure you haven't broken anything and all tests are passing.
8. Create a pull request on the **[`dev`](https://github.com/juliangarnier/anime/tree/dev)** branch.

## Consider supporting this project via GitHub Sponsors

I couldn't respond to issues and fix bugs without the support of my sponsors. If you find Anime.js valuable in your work, please consider becoming a sponsor via [GitHub Sponsors](https://github.com/sponsors/juliangarnier)! ❤️
