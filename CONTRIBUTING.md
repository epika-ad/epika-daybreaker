# Contributing to daybreaker

Thanks for helping. Bug reports, ideas and pull requests are all welcome.

## Found a bug or have an idea?

[Open an issue](https://github.com/epika-ad/epika-daybreaker/issues/new/choose). For a bug, the most useful things are the component, what you expected, what happened, and a few lines of code that show it.

## Run it locally

You need Node.js 24 or newer.

```sh
git clone https://github.com/epika-ad/epika-daybreaker.git
cd epika-daybreaker
npm install
npm run dev        # docs site at http://localhost:5173
```

The docs site in [site/](site/) imports the library straight from [src/](src/), so your changes show up as you save.

## Make a change

1. Branch from `main`.
2. Make the change. Components live in [src/components/](src/components/). Each component's preview and the code shown in the docs is one file in [site/examples/](site/examples/); list a new component in [site/registry.ts](site/registry.ts).
3. Check it:
   ```sh
   npm run lint
   npm run typecheck
   npm test
   ```
4. Describe it for the changelog: `npm run changeset`, then pick patch (fix), minor (new component or prop) or major (breaking change).
5. Open a pull request against `main`.

## What a good pull request looks like

- **One thing per pull request.** A fix and an unrelated refactor are two pull requests.
- **Accessible.** Keyboard, focus and screen readers keep working. Base UI does most of this; don't work around it.
- **Tokens, not colours.** Style with the theme tokens (`bg-primary`, `text-foreground-dimmed`) so rebranding and dark mode keep working.
- **Tested.** A fix comes with a test that fails without it.
- **Plain words.** Docs and examples say what a thing does, in British English, without hype.

## Releases

Maintainers release with [Changesets](https://github.com/changesets/changesets). Merging to `main` opens a "Version Packages" pull request, and merging that publishes to npm.

## License

By contributing, you agree that your contribution is licensed under the [MIT License](LICENSE).
