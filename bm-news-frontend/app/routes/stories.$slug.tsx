import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { PortableText } from '@portabletext/react';
import { groq } from 'hydrogen-sanity/groq';
import { SanityDocument } from 'hydrogen-sanity';
import { PageLayout } from '~/components/PageLayout';

export async function loader({
  params,
  context: { sanity }, /* SANITY: Import loader to query Sanity content lake */
}: LoaderFunctionArgs) {
  /**
   * NOTE: run query in [Sanity Studio > Vision](http://localhost:3333/vision)
   * [groq query docs](https://www.sanity.io/docs/how-queries-work)
   */
  const query = groq`
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
  excerpt
}[0]
`;

  const article = await sanity.loadQuery<SanityDocument>(query, {
    slug: params.slug
  });
  return json({ article });
}

export default function Page() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <PageLayout>
      <div>
        <h1>{article.data.title}</h1>
        <div>Example of rendering content:</div>
        <div>------- CONTENT BLOCK START -----------</div>
        {/* TODO: need to render other block types properly */}
        {/* https://hdoro.dev/performant-sanity-io-images */}
        {article.data.content?.length > 0 ? <PortableText value={article.data.content} /> : null}
        <div>------- CONTENT BLOCK END -----------</div>
        <pre>{JSON.stringify(article.data, null, 2)}</pre>
      </div>
    </PageLayout>
  );
}

