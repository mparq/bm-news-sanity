import { groq } from "hydrogen-sanity/groq"

/**
 * NOTE: read below when creating new queries to keep queries.types.ts in sync.
 *
 * Process for adding sanity queries to the frontend with types
 *
 * 1. run queries in [Sanity Studio > Vision](http://localhost:3333/vision)
 * 2. when you have the output you need, copy the query here. use $queryVar syntax if you need variables in the query
 * 3. In the sanity studio project (bm-news-sanity-studio), run `npm run gen-types-for-frontend`
 * 4. New types should be available in app/sanity/queries.types.ts
 * [groq query docs](https://www.sanity.io/docs/how-queries-work)
 *
 * Whenever you need to update the queries, follow the same workflow and just run `npm run gen-types-for-frontend` again in the sanity studio project.
 */


export const frontPageQuery = groq`
*[_type == "frontPageLayout" && name == "main"]
{
    sideStoriesPrimary[]-> {
      _id,
      _updatedAt,
      authors[]->{name, profilePhoto{asset->{url}}},
      title,
      "categoryName": category->.name,
      excerpt,
      "slugCurrent": slug.current,
      featuredImage{..., asset->},
      "contentWordCount": count(
              string::split(
                // pt::text extracts plain text for a portable text block
                pt::text(content),
                " "
              )),
    },
    sideStoriesSecondary[]-> {
      _id,
      _updatedAt,
      authors[]->{name, profilePhoto{asset->{url}}},
      title,
      "categoryName": category->.name,
      excerpt,
      "slugCurrent": slug.current,
      featuredImage{..., asset->},
      "contentWordCount": count(
              string::split(
                // pt::text extracts plain text for a portable text block
                pt::text(content),
                " "
              )),
    },
    topStory->{
      _id,
      _updatedAt,
      authors[]->{name, profilePhoto{asset->{url}}},
      title,
      "categoryName": category->.name,
      excerpt,
      "slugCurrent": slug.current,
      featuredImage{..., asset->},
      "contentWordCount": count(
          string::split(
            // pt::text extracts plain text for a portable text block
            pt::text(content),
            " "
          )),
    }
}[0]
`

export const singleNewsStoryQuery = groq`
*[_type == "newsStory" && slug.current == $slug]{
  _updatedAt,
  content[]{
    ...,
    _type == "contentImage" => {
      ...,
      asset->
    },
    _type == "tweetEmbed" => {
      url
    }
  },
  featuredImage{..., asset->},
  title,
  subtitle,
  category->{name, slug},
  slug,
  authors[]->{name, profilePhoto{asset->}, slug},
  excerpt,
  "contentWordCount": count(
      string::split(
        // pt::text extracts plain text for a portable text block
        pt::text(content),
        " "
      )),
}[0]
`

export const liveBlogContentQuery = groq`
*[_type == "liveBlog" && slug.current == $slug] {
  ...,
  category->,
  "posts": *[_type == "liveBlogContent" && references(^._id) && defined(postDateTime)] {
    _id,
    headline,
    postDateTime,
    _updatedAt,
    isEssential,
    authors[]->{
      ...,
      profilePhoto{
        ...,
        asset->
      }
    },
    content
  } | order(postDateTime desc)
}[0]
`;

