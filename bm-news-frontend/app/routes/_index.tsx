import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { SanityDocument } from 'hydrogen-sanity';
import { groq } from 'hydrogen-sanity/groq';

export async function loader({
  _params,
  context: { sanity },
}: LoaderFunctionArgs) {
  /**
   * NOTE: run query in [Sanity Studio > Vision](http://localhost:3333/vision) then paste here
   * [groq query docs](https://www.sanity.io/docs/how-queries-work)
   */
  const query = groq`
//*[_type == "frontPageLayout"]
//*[_type == "newsStory"]
*[_type == "frontPageLayout" && name == "main"]
{
    sideStoriesPrimary[]-> {
      _updatedAt,
      authors[]->{name, profilePhoto{asset->{url}}},
      title,
      category,
      excerpt,
      slug,
      featuredImage{asset->{url}}
    },
    sideStoriesSecondary[]-> {
      _updatedAt,
      authors[]->{name, profilePhoto{asset->{url}}},
      title,
      category,
      excerpt,
      slug,
      featuredImage{asset->{url}}
    },
    topStory->{
      _updatedAt,
      authors[]->{name, profilePhoto{asset->{url}}},
      title,
      category,
      excerpt,
      slug,
      featuredImage{asset->{url}}
    }
}[0]
`
  const frontPageLayout = await sanity.loadQuery<SanityDocument>(query, {});
  return json({ frontPageLayout });
}


export default function IndexPage() {
  const { frontPageLayout } = useLoaderData<typeof loader>();
  const layout = frontPageLayout.data;

  return (
    <div>
      <pre>{JSON.stringify(layout, null, 2)}</pre>
    </div>
  );
}
