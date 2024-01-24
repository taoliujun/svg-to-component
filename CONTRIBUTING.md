# How to contribute

**It is a pnpm monorepo repo.**

## develop

First of all, run `pnpm install`.

Then comply with ESLINT and TS specifications, and nothing else matters.

## push

Before you can create a pull request, you first need to run the `npm run test` command locally.

## release

**Only the administrators can run**

-   Run `npm run changelog` when you take some changes for per package.

-   Run `npm run version` to ensure the version of package is correct, and make the changelog.

-   Before publish, you should **build** the package which you want to publish.

-   Run `npm run release` to publish the package. Or run the release github action.
