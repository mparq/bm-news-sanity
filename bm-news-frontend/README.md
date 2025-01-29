# Hydrogen template: Skeleton

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)


## Getting started

**Requirements:**

- Node.js version 18.0.0 or higher

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```

## Setup for using Sanity CMS backend

Include the following in your `.env` file
```bash
SANITY_PROJECT_ID="hly7cmhd"
SANITY_DATASET="production"
SANITY_API_VERSION="v2025-01-25"
```

## Quick start

1. Complete steps in Getting started.
2. Run sanity studio and frontend server locally
```bash
# run the local Sanity Studio (alternatively use https://bm-news.sanity.studio/)
# PWD: ./bm-news-sanity-studio
npm install && npm run dev
# > listening on http://localhost:3333

# run the frontend hydrogen server in another terminal, 
# PWD: ./bm-news-frontend
npm install && npm run dev
# > listening on http://localhost:3000

# # deploy: to the shopify preview environment (prod deployed on ci/cd)
# npm run deploy
```

### Integrating queries with the frontend

See notes in [./app/sanity/queries.ts](./app/sanity/queries.ts).

### Notes

- You can go to http://localhost:3333 to view the CMS backend and create/edit entities.
- Go to http://localhost:3000 to view the News website Hydrogen/Remix frontend server which we will serve to end users.
- To iterate on queries, it's most convenient to use the Vision tool in Sanity Studio either at https://bm-news.sanity.studio/vision or http://localhost:3000/vision. See [groq query docs](https://www.sanity.io/docs/how-queries-work) - once you get the hang of it, it's quite nice. For now, we can go with the simplest approach of just doing the query or two which gives us everything we need to render a page, that way all the code needed to render the page is right in the same place.
- [remix uses a "conventional" routing approach](https://remix.run/docs/en/main/discussion/routes). See [./app/routes/_index.tsx](./aoo/routes/_index.tsx) is rendered for requests matching `/`. [./app/routes/stories.$slug.tsx](./app/routes/stories.$slug.tsx) is rendered for requests matching `/stories/<slug>` and `slug` will be passed as a field on `req.params`.
- To modify Sanity schema, see [../bm-news-sanity-studio/README.md](../bm-news-sanity-studio/README.md).

