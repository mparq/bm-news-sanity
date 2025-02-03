import { PortableText, PortableTextBlock } from '@portabletext/react';
import { useLoaderData } from '@remix-run/react';
import { CacheShort } from '@shopify/hydrogen';
import { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { PageLayout } from '~/components/PageLayout';
import SanityImageWrapper from '~/components/SanityImageWrapper';
import { readTime } from '~/lib/utils';
import { frontPageQuery } from '~/sanity/queries';
import { FrontPageQueryResult } from '~/sanity/sanity.types';

export async function loader({
  _params,
  context: { sanity, env },
}: LoaderFunctionArgs) {
  /**
   * NOTE: run query in [Sanity Studio > Vision](http://localhost:3333/vision) then paste here
   * [groq query docs](https://www.sanity.io/docs/how-queries-work)
   */
  const frontPageLayout = await sanity.loadQuery<FrontPageQueryResult>(frontPageQuery, {}, {
    hydrogen: {
      cache: CacheShort()
    }
  });

  return { frontPageLayout, sanityProjectId: env.SANITY_PROJECT_ID, sanityDataset: env.SANITY_DATASET };
}

export default function IndexPage() {
  const { frontPageLayout, sanityDataset, sanityProjectId } = useLoaderData<typeof loader>();
  const layout = frontPageLayout.data;
  const topStory = layout?.topStory;
  const sideStoriesPrimary = layout?.sideStoriesPrimary;
  const sideStoriesSecondary = layout?.sideStoriesSecondary;


  return (
    <PageLayout>
      <section>
        <div id="latest-news" className="container">
          {topStory && <TopStoryCard
            slug={topStory.slugCurrent!}
            title={topStory.title!}
            excerpt={topStory.excerpt}
            wordCount={topStory.contentWordCount}
            category={topStory.categoryName!}
            image={topStory.featuredImage}
            sanityProjectId={sanityProjectId}
            sanityDataset={sanityDataset}
            preview={null}
          />}
          <a href="/live/now-in-brazil" className="news-card news-card--horizontal live-card-mobile">
            <div className="live-button">
              <div className="circle"></div>
              Live
            </div>
            <div>
              <p className="category category--big">Paramahamsa Vishwananda</p>
              <h4 className="no-margin">Now in Brazil</h4>
            </div>
          </a>
          <div className="news-list">
            {
              sideStoriesSecondary?.map((story, i) => {
                if (i < sideStoriesSecondary.length - 1) {
                  return (
                    <StoryCard
                      key={story._id}
                      slug={story.slugCurrent}
                      category={story.categoryName}
                      title={story.title}
                      wordCount={story.contentWordCount}
                      image={story.featuredImage}
                      sanityProjectId={sanityProjectId}
                      sanityDataset={sanityDataset}
                      loading={"eager"}
                    />
                  );
                } else {
                  return (
                    <StoryCardExtra
                      key={story._id}
                      slug={story.slugCurrent}
                      category={story.categoryName}
                      title={story.title}
                      wordCount={story.contentWordCount}
                      image={story.featuredImage}
                      sanityProjectId={sanityProjectId}
                      sanityDataset={sanityDataset}
                      loading={"eager"}
                    />
                  );
                }
              })
            }

          </div>
          <div className="news-list">
            {
              sideStoriesPrimary?.map(story => (
                <StoryCardHorizontal
                  key={story._id}
                  slug={story.slugCurrent}
                  category={story.categoryName}
                  title={story.title}
                  excerpt={story.excerpt}
                  wordCount={story.contentWordCount}
                  image={story.featuredImage}
                  sanityProjectId={sanityProjectId}
                  sanityDataset={sanityDataset}
                  loading={"eager"}
                />
              ))
            }
            <a href="/live/now-in-brazil" className="news-card news-card--horizontal live-card">
              <div className="live-button">
                <div className="circle"></div>
                Live
              </div>
              <div>
                <p className="category category--big">Paramahamsa Vishwananda</p>
                <h4 className="no-margin">Now in Brazil</h4>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="secondary-news">
        <div>
          <div className="container">
            <ul className="secondary-categories" aria-label="Secondary categories">
              <li><a className="button button--primary">BM Worldwide</a></li>
              <li><a className="button button--outline">Paramahamsa Vishwananda</a></li>
              <li><a className="button button--outline">Initiatives</a></li>
              <li><a className="button button--outline">Volunteering</a></li>
              <li><a className="button button--outline">Community</a></li>
            </ul>
          </div>
          <div className="container">
            <div className="news-grid">
              <a href="/article.html">
                <figure className="news-card">
                  <div className="news-card__image">
                    <img width="300" loading="lazy" src="/assets/news-02.jpg" alt="Meeting of friends in Italy" />
                  </div>
                  <figcaption>
                    <h4>Meeting of Friends in Italy</h4>
                    <small>10 min read</small>
                  </figcaption>
                </figure>
              </a>
              <a href="/article.html">
                <figure className="news-card">
                  <div className="news-card__image">
                    <img width="300" loading="lazy" src="/assets/news-03.jpg" alt="Meeting of friends in Italy" />
                  </div>
                  <figcaption>
                    <h4>Meeting of Friends in Italy</h4>
                    <small>10 min read</small>
                  </figcaption>
                </figure>
              </a>
              <a href="/article.html">
                <figure className="news-card">
                  <div className="news-card__image">
                    <img width="300" loading="lazy" src="/assets/news-04.jpg" alt="Meeting of friends in Italy" />
                  </div>
                  <figcaption>
                    <h4>Meeting of Friends in Italy</h4>
                    <small>10 min read</small>
                  </figcaption>
                </figure>
              </a>
              <a href="/article.html">
                <figure className="news-card">
                  <div className="news-card__image">
                    <img width="300" loading="lazy" src="/assets/news-02.jpg" alt="Meeting of friends in Italy" />
                  </div>
                  <figcaption>
                    <h4>Meeting of Friends in Italy</h4>
                    <small>10 min read</small>
                  </figcaption>
                </figure>
              </a>
              <a href="/article.html">
                <figure className="news-card">
                  <div className="news-card__image">
                    <img width="300" loading="lazy" src="/assets/news-03.jpg" alt="Meeting of friends in Italy" />
                  </div>
                  <figcaption>
                    <h4>Meeting of Friends in Italy</h4>
                    <small>10 min read</small>
                  </figcaption>
                </figure>
              </a>
              <a href="/article.html">
                <figure className="news-card">
                  <div className="news-card__image">
                    <img width="300" loading="lazy" src="/assets/news-04.jpg" alt="Meeting of friends in Italy" />
                  </div>
                  <figcaption>
                    <h4>Meeting of Friends in Italy</h4>
                    <small>10 min read</small>
                  </figcaption>
                </figure>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="secondary-news">
        <div className="container">
          <div className="articles-list-text">
            <article className="articles-list__item">
              <div>
                <strong>A Sacrifice for others</strong>
                <small>⌛ 5 min read</small>
              </div>
              <p>The serene surroundings of the ashram provided the perfect setting for...</p>
            </article>
            <article className="articles-list__item">
              <div>
                <strong>Unity in Diversity</strong>
                <small>⌛ 8 min read</small>
              </div>
              <p>The serene surroundings of the ashram provided the perfect setting for...</p>
            </article>

            <article className="articles-list__item">
              <div>
                <strong>Help beyond borders</strong>
                <small>⌛ 3 min read</small>
              </div>
              <p>The serene surroundings of the ashram provided the perfect setting for...</p>
            </article>

            <article className="articles-list__item">
              <div>
                <strong>What happened in Ayodhya 1 year ago?</strong>
                <small>⌛ 3 min read</small>
              </div>
              <p>The serene surroundings of the ashram provided the perfect setting for...</p>
            </article>
          </div>

          <figure className="news-card">
            <img loading="lazy" src="/assets/news-04.jpg" alt="News Image" />
            <figcaption>
              <h4>Paramahamsa Vishwananda met the founder of the xyz tradition in Italy</h4>
              <p>In a historic and spiritually enriching moment, Swami Vishwananda met with a famous Shaivite
                teacher at...</p>
              <small>10 min read</small>
            </figcaption>
          </figure>
        </div>
      </section>
      <section id="secondary-news">
        <div className="container">
          <div className="articles-list">
            <article>
              <div>
                <p>A Sacrifice for others</p>
                <small>⌛ 5 min read</small>
              </div>
            </article>

            <article>
              <p>Unity in Diversity</p>
              <small>⌛ 8 min read</small>
            </article>

            <article>
              <p>Help beyond borders</p>
              <small>⌛ 3 min read</small>
            </article>

            <article>
              <p>What happened in Ayodhya 1 year ago?</p>
              <small>⌛ 3 min read</small>
            </article>

            <article>
              <p>What happened in Ayodhya 1 year<br />ago?</p>
              <small>⌛ 3 min read</small>
            </article>
          </div>

          <figure className="news-card">
            <img loading="lazy" src="/assets/news-04.jpg" alt="News Image" />
            <figcaption>
              <h4>Paramahamsa Vishwananda met the founder of the xyz tradition in Italy</h4>
              <p>In a historic and spiritually enriching moment, Swami Vishwananda met with a famous Shaivite
                teacher at...</p>
              <small>10 min read</small>
            </figcaption>
          </figure>
        </div>
      </section>

    </PageLayout>
  );
}

function TopStoryCard(props: {
  slug: string | null;
  title: string | null;
  category: string | null;
  excerpt: PortableTextBlock[] | null;
  wordCount: number | null;
  image: any;
  sanityDataset: string;
  sanityProjectId: string;
}) {
  const articleLink = `/stories/${props.slug}`;
  const minsToRead = readTime(props.wordCount || 0);
  return (
    <a href={articleLink} className="card--featured">
      <figure className="news-card card--paramahamsa-vishwananda">
        <div>
          <SanityImageWrapper
            loading="eager"
            image={props.image}
            sanityProjectId={props.sanityProjectId}
            sanityDataset={props.sanityDataset}
            sizes="600px"
            width="600"
            preview={null} />
        </div>
        <figcaption>
          <p className="category">{props.category}</p>
          <h3>{props.title}</h3>
          {props.excerpt && <PortableText value={props.excerpt} />}
          <small>{minsToRead} min read</small>
        </figcaption>
      </figure>
    </a>
  )
}

function StoryCard(props: {
  slug: string | null;
  category: string | null;
  title: string | null;
  wordCount: number | null;
  image: any;
  sanityDataset: string;
  sanityProjectId: string;
  loading: "lazy" | "eager" | null;
}) {
  const articleLink = `/stories/${props.slug}`;
  const minsToRead = readTime(props.wordCount || 0);
  return (
    <a href={articleLink}>
      <figure className="news-card news-card--horizontal">
        <figcaption>
          <p className="category">{props.category}</p>
          <h5>{props.title}</h5>
          <small>{minsToRead} min read</small>
        </figcaption>
        <div className="news-card--horizontal__image-container">
          <SanityImageWrapper
            image={props.image}
            sanityProjectId={props.sanityProjectId}
            sanityDataset={props.sanityDataset}
            sizes="(min-width: 680px) 320w, 100vw"
            loading={props.loading}
          />
        </div>
      </figure>
    </a>
  )
}

function StoryCardExtra(props: {
  slug: string | null;
  category: string | null;
  title: string | null;
  wordCount: number | null;
  image: any;
  sanityDataset: string;
  sanityProjectId: string;
  loading: "lazy" | "eager" | null;
}) {
  const articleLink = `/stories/${props.slug}`;
  const minsToRead = readTime(props.wordCount || 0);
  return (
    <a href={articleLink}>
      <figure id="extraCard" className="news-card card--paramahamsa-vishwananda">
        <div className="news-card__image-container">
          <SanityImageWrapper
            image={props.image}
            sanityProjectId={props.sanityProjectId}
            sanityDataset={props.sanityDataset}
            loading={props.loading}
          />
        </div>
        <figcaption>
          <p className="category">{props.category}</p>
          <h5>{props.title}</h5>
          <small>{minsToRead} min read</small>
        </figcaption>
      </figure>
    </a>
  )

}

function StoryCardHorizontal(props: {
  slug: string | null;
  category: string | null;
  title: string | null;
  wordCount: number | null;
  excerpt: PortableTextBlock[] | null;
  image: any;
  sanityDataset: string;
  sanityProjectId: string;
}) {
  const articleLink = `/stories/${props.slug}`;
  const minsToRead = readTime(props.wordCount || 0);
  return (
    <a href={articleLink}>
      <figure className="news-card news-card--horizontal">
        <figcaption>
          <p className="category">{props.category}</p>
          <h5>{props.title}</h5>
          {props.excerpt && <PortableText value={props.excerpt} />}
          <small>{minsToRead} min read</small>
        </figcaption>
        <div className="news-card--horizontal__image-container">
          <SanityImageWrapper image={props.image} sanityProjectId={props.sanityProjectId} sanityDataset={props.sanityDataset} />
        </div>
      </figure>
    </a>
  )
}

