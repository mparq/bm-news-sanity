import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { PortableText } from '@portabletext/react';
import { singleNewsStoryQuery } from '~/sanity/queries';
import { PageLayout } from '~/components/PageLayout';
import { SingleNewsStoryQueryResult } from '~/sanity/sanity.types';

export async function loader({
  params,
  context: { sanity }, /* SANITY: Import loader to query Sanity content lake */
}: LoaderFunctionArgs) {
  const article = await sanity.loadQuery<SingleNewsStoryQueryResult>(singleNewsStoryQuery, {
    slug: params.slug
  });
  return json({ article });
}

export default function Page() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <PageLayout>
      <div>
        <h1>{article?.data?.title}</h1>
        <div>Example of rendering content:</div>
        <div>------- CONTENT BLOCK START -----------</div>
        {/* TODO: need to render other block types properly */}
        {/* https://hdoro.dev/performant-sanity-io-images */}
        {article?.data?.content?.length > 0 ? <PortableText value={article.data.content} /> : null}
        <div>------- CONTENT BLOCK END -----------</div>
        <pre>{JSON.stringify(article.data, null, 2)}</pre>
      </div>
    </PageLayout>
  );
}

