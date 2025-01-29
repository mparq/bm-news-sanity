import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { PageLayout } from '~/components/PageLayout';
import { frontPageQuery } from '~/sanity/queries';
import { FrontPageQueryResult } from '~/sanity/sanity.types';

export async function loader({
  _params,
  context: { sanity },
}: LoaderFunctionArgs) {
  /**
   * NOTE: run query in [Sanity Studio > Vision](http://localhost:3333/vision) then paste here
   * [groq query docs](https://www.sanity.io/docs/how-queries-work)
   */
  const frontPageLayout = await sanity.loadQuery<FrontPageQueryResult>(frontPageQuery, {});
  return json({ frontPageLayout });
}


export default function IndexPage() {
  const { frontPageLayout } = useLoaderData<typeof loader>();
  const layout = frontPageLayout.data;

  return (
    <PageLayout>
      <pre>{JSON.stringify(layout, null, 2)}</pre>
    </PageLayout>
  );
}
