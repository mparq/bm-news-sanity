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
//*[_type == "frontPageLayout"]
//*[_type == "newsStory"]
*[_type == "frontPageLayout" && name == "main"]
{
    sideStoriesPrimary[]-> {
      _updatedAt,
      authors[]->{name, profilePhoto{asset->{url}}},
      title,
      category->{name, slug},
      excerpt,
      slug,
      featuredImage{asset->{url}},
      "contentWordCount": count(
              string::split(
                // pt::text extracts plain text for a portable text block
                pt::text(content),
                " "
              )),
    },
    sideStoriesSecondary[]-> {
      _updatedAt,
      authors[]->{name, profilePhoto{asset->{url}}},
      title,
      category->{name, slug},
      excerpt,
      slug,
      featuredImage{asset->{url}},
      "contentWordCount": count(
              string::split(
                // pt::text extracts plain text for a portable text block
                pt::text(content),
                " "
              )),
    },
    topStory->{
      _updatedAt,
      authors[]->{name, profilePhoto{asset->{url}}},
      title,
      category->{name, slug},
      excerpt,
      slug,
      featuredImage{asset->{url}},
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
    _type == "image" => {
      ...,
      asset->
    }
  },
  featuredImage{asset->{url}},
  title,
  category->{name, slug},
  slug,
  authors[]->{name, profilePhoto{asset->{url}, slug}},
  excerpt,
  "contentWordCount": count(
      string::split(
        // pt::text extracts plain text for a portable text block
        pt::text(content),
        " "
      )),
}[0]
`

