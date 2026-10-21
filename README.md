# DSA Notebook

This is a React Native Web app. The interface is built with React Native primitives and rendered in the browser with `react-native-web`.

## Run locally

```sh
npm install
npm run dev
```

## Build for Vercel

The Vercel project should use:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

`npm run build` creates `src/data/notes.json` from the supplied Markdown files, then exports the static website into `dist`. Review progress stays in the visitor’s browser storage.
