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
      <div className="top-banner">
        <p>Updated 10:25 PM | Jan 25, 2025</p>
        <p className="category">Paramahamsa Vishwananda</p>
        <h1>Live: in Brazil</h1>
      </div>

      <div className="live-blog-container">

        <div className="card">
          <div className="collapse">
            <small>Jan 25, 10:25 PM | Subhuja Das</small>
          </div>
          <h2>Last post of the day</h2>
          <div>
            <p>It was an amazing event in Brazil and incredible Darshan.</p>
            <p>For those watching online it was a special treat to tune in.</p>
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">Love from machu pichu <a href="https://t.co/TlfxqIRMBE">pic.twitter.com/TlfxqIRMBE</a>
              </p>&mdash; Swami Vishwananda (@vishwananda) <a
                href="https://twitter.com/vishwananda/status/1877754165008503106?ref_src=twsrc%5Etfw">January 10, 2025</a>
            </blockquote>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
          </div>
        </div>

        <div className="card">
          <div className="collapse">
            <small>Jan 25, 07:30 AM | Subhuja Das</small>
          </div>
          <h2>Post from earlier in the morning</h2>
          <div>
            <p>We are getting ready for Darshan today.</p>
            <p>It's going to be an amazing day.</p>
            <iframe className="yt-embed" src="https://www.youtube.com/embed/i0mrLHt3wRY?si=vGgwEYXFGtwt9VUT"
              title="YouTube video player" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}


