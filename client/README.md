# New Project

> ✨ Bootstrapped with Create Snowpack App (CSA).

NOTE:
- couldn't get snowpack [proxying](https://www.snowpack.dev/guides/routing#scenario-2-proxy-api-paths) to work w/ `http2-proxy`, so just [made custom hook](./src/api.js).

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.mjs` config file.

### npm test

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.
