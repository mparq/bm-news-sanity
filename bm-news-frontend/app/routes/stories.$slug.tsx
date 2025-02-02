import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { singleNewsStoryQuery } from '~/sanity/queries';
import { PageLayout } from '~/components/PageLayout';
import { SingleNewsStoryQueryResult } from '~/sanity/sanity.types';
import { buildPortableTextComponents, ContentBlocks } from '~/components/ContentBlocks';
import { format, parseISO } from 'date-fns';
import ContentImage from '~/components/ContentImage';
import { SanityImage } from 'sanity-image';
import SanityImageWrapper from '~/components/SanityImageWrapper';

export async function loader({
  params,
  context: { sanity, env }, /* SANITY: Import loader to query Sanity content lake */
}: LoaderFunctionArgs) {
  const article = await sanity.loadQuery<SingleNewsStoryQueryResult>(singleNewsStoryQuery, {
    slug: params.slug
  });
  return json({ article, sanityProjectId: env.SANITY_PROJECT_ID, sanityDataset: env.SANITY_DATASET });
}

export default function Page() {
  const { article, sanityProjectId, sanityDataset } = useLoaderData<typeof loader>();
  const portableTextComponents = buildPortableTextComponents(sanityProjectId, sanityDataset);

  const publishedDateStr = format(parseISO(article.data?._updatedAt), 'MMM dd, yyyy h:mmaaa')

  return (
    <PageLayout>
      <div className='wrapper article-section'>
        <span className="category category--big">{article.data?.category.name}</span>
        <h1>{article.data?.title}</h1>

        <h3 className="article-subtitle">{article.data?.subtitle}</h3>

        <div className="article-info">
          <figure className="article-author">
            <SanityImageWrapper className="author-img" image={article.data?.authors[0].profilePhoto} sanityProjectId={sanityProjectId} sanityDataset={sanityDataset} />
            <figcaption><span>By {article.data.authors[0].name}: SPN</span></figcaption>
          </figure>
          <small>Published {publishedDateStr}</small>
        </div>
        <ContentImage image={article.data?.featuredImage} sanityDataset={sanityDataset} sanityProjectId={sanityProjectId} />
      </div>

      <div className='wrapper article-section'>
        {article?.data?.content?.length > 0 ? <ContentBlocks value={article.data.content} components={portableTextComponents} /> : null}
      </div>
    </PageLayout>
  );
}

