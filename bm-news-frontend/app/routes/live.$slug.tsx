import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { PortableText } from '@portabletext/react';
import { liveBlogContentQuery, singleNewsStoryQuery } from '~/sanity/queries';
import { PageLayout } from '~/components/PageLayout';
import { LiveBlogContentQueryResult, SingleNewsStoryQueryResult } from '~/sanity/sanity.types';
import React, { useEffect, useState } from 'react';
import { CacheShort } from '@shopify/hydrogen';
import { differenceInDays, differenceInMinutes, differenceInSeconds, format, parse, parseISO } from 'date-fns';
import { buildPortableTextComponents, ContentBlocks } from '~/components/ContentBlocks';

export async function loader({
  params,
  context: { sanity, env }, /* SANITY: Import loader to query Sanity content lake */
}: LoaderFunctionArgs) {
  // TODO: get content from backend
  const liveBlogContent = await sanity.loadQuery<LiveBlogContentQueryResult>(liveBlogContentQuery, { slug: params.slug }, {
    hydrogen: {
      cache: CacheShort()
    }
  });
  return { liveBlogContent, sanityProjectId: env.SANITY_PROJECT_ID, sanityDataset: env.SANITY_DATASET };
}

export default function Page() {
  const { liveBlogContent, sanityDataset, sanityProjectId } = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState<'live' | 'context'>('live');
  const portableTextComponents = React.useMemo(() => buildPortableTextComponents(sanityProjectId, sanityDataset), [sanityDataset, sanityProjectId])
  const hasContent = liveBlogContent.data?.posts && liveBlogContent.data.posts.length > 0;
  const latestPost = hasContent && liveBlogContent.data!.posts[0];
  const lastUpdatedStr = latestPost && format(parseISO(latestPost.postDateTime!), 'h:mm aaa | MMM dd, yyyy');

  return (
    <PageLayout>
      <div className='stack margin-bottom'>
        <div className="top-banner">
          <p>Updated {lastUpdatedStr || 'n/a'}</p>
          <p className="category">{liveBlogContent.data?.category?.name}</p>
          <h1>Live: {liveBlogContent.data?.title}</h1>
        </div>

        <div className='collapse'>
          <div className="tabs">
            <button
              onClick={() => {
                setActiveTab('live')
              }}
              className={`button button--tab button--tab-live ${activeTab === 'live' ? 'active' : ''}`}>
              <span className="live-span">
                <span className="live-circle-red"></span>LIVE
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab('context')
              }}
              className={`button button--tab ${activeTab === 'context' ? 'active' : ''}`}>CONTEXT</button>
          </div>

          <div className="two-column">
            <div className={`column ${activeTab === 'live' ? 'active' : ''}`}>
              <div className='live-blog-container column-container'>

                {liveBlogContent.data.posts.map(post => (
                  <LiveCard
                    key={post._id}
                    headline={post.headline}
                    isEssential={post.isEssential}
                    postDateTime={post.postDateTime}
                  >
                    <ContentBlocks value={post.content} components={portableTextComponents} />
                  </LiveCard>
                ))}
              </div>

            </div>

            <div className={`column ${activeTab === 'context' ? 'active' : ''}`}>
              <div className="live-blog-context column-container">
                <ContentBlocks value={liveBlogContent.data.context} components={portableTextComponents} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function LiveCard(props: {
  headline?: string;
  content?: any;
  postDateTime?: string;
  isEssential?: boolean;
  children?: any;
}) {
  const now = new Date();
  const postDate = parseISO(props.postDateTime!);
  const postTimeStr = format(postDate, 'h:mm aaa')
  const secsAgo = differenceInSeconds(now, postDate);

  let agoStr = ''
  if (secsAgo < 60) {
    agoStr = `${secsAgo}s ago`;
  } if (secsAgo < 60 * 60) {
    agoStr = `${Math.floor(secsAgo / 60)}m ago`;
  } else if (secsAgo < 60 * 60 * 24) {
    agoStr = `${Math.floor(secsAgo / 3600)}h ago`
  } else {
    agoStr = `${Math.floor(secsAgo / 86400)}d ago`
  }


  return (
    <div className={`live-post-card live-content-container collapse ${props.isEssential ? 'essential' : ''}`}>
      <div className="header">
        <small className="live-post-card--date-line">{agoStr} / {postTimeStr}
          {props.isEssential && <span className='text-small'>ESSENTIAL</span>}
        </small>
      </div>
      <div>
        {props.headline && <h2 className="h4">{props.headline}</h2>}
        {props.children}
      </div>
    </div>

  );
}

