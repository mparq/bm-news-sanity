import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { PortableText } from '@portabletext/react';
import { singleNewsStoryQuery } from '~/sanity/queries';
import { PageLayout } from '~/components/PageLayout';
import { SingleNewsStoryQueryResult } from '~/sanity/sanity.types';
import { useEffect, useState } from 'react';

export async function loader({
  params,
  context: { sanity }, /* SANITY: Import loader to query Sanity content lake */
}: LoaderFunctionArgs) {
  // TODO: get content from backend
  return [];
}

export default function Page() {
  const a = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState<'live' | 'context'>('live');

  return (
    <PageLayout>
      <div className='stack'>
        <div className="top-banner">
          <p>Updated 10:25 PM | Jan 25, 2025</p>
          <p className="category">Paramahamsa Vishwananda</p>
          <h1 onLoad={() => console.log('h1 loaded')}>Live: in Brazil</h1>
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
                <LiveCard
                  isEssential={true}
                  postDateTime='2h ago / 10:25 PM EST'
                >
                  <div>
                    <h2 className="h4">Last post of the day</h2>
                    <div>
                      <p>It was an amazing event in Brazil and incredible Darshan.</p>
                      <p>For those watching online it was a special treat to tune in. Join us next time!</p>
                      <blockquote className="twitter-tweet">
                        <p lang="en" dir="ltr">Love from machu pichu <a href="https://t.co/TlfxqIRMBE">pic.twitter.com/TlfxqIRMBE</a>
                        </p>&mdash; Swami Vishwananda (@vishwananda) <a
                          href="https://twitter.com/vishwananda/status/1877754165008503106?ref_src=twsrc%5Etfw">January 10, 2025</a>
                      </blockquote>
                      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                    </div>
                  </div>
                </LiveCard>

                <LiveCard
                  postDateTime='1d ago / 7:32 AM EST'
                >
                  <h2 className="h4">Post from earlier in the morning</h2>
                  <div>
                    <p>We are getting ready for Darshan today.</p>
                    <p>It's going to be an amazing day.</p>
                    <iframe className="yt-embed" src="https://www.youtube.com/embed/i0mrLHt3wRY?si=vGgwEYXFGtwt9VUT"
                      title="YouTube video player" frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                </LiveCard>

                <LiveCard
                  postDateTime='2d ago / 7:32 AM EST'
                >
                  <h2 className="h4">Live blogging starts</h2>
                  <div>
                    <p>Jai Gurudev! Get ready for the live blogging event of the new year.</p>
                    <p>Bookmark this page to get live updates of Guruji's travels in South America.</p>
                  </div>
                </LiveCard>
              </div>

            </div>

            <div className={`column ${activeTab === 'context' ? 'active' : ''}`}>
              <div className="live-blog-context column-container">
                <h2>Context</h2>
                <p>Swami Paramahamsa Vishwananda took his devotees on a pilgrimage across South America this January.</p>
                <p>Follow along as we give live updates of this incredible event.</p>
                <h3>Important Dates</h3>
                <ul>
                  <li><strong>07 January</strong>: Pilgrimate starts in Peru</li>
                  <li><strong>25 January</strong>: Darshan in Brazil</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function LiveCard(props: {
  postDateTime?: string;
  isEssential?: boolean;
  children?: any;
}) {
  return (
    <div className={`live-card live-content-container collapse ${props.isEssential ? 'essential' : ''}`}>
      <div className="header">
        <small className="live-card--date-line">{props.postDateTime}
          {props.isEssential && <span className='text-small'>ESSENTIAL</span>}
        </small>
      </div>
      <div>
        {props.children}
      </div>
    </div>

  );
}

