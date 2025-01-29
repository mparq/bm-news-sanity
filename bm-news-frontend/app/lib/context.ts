import { createHydrogenContext } from '@shopify/hydrogen';
import { AppSession } from '~/lib/session';
import { createSanityContext } from 'hydrogen-sanity';

/**
 * The context implementation is separate from server.ts
 * so that type can be extracted for AppLoadContext
 * */
export async function createAppLoadContext(
  request: Request,
  env: Env,
  executionContext: ExecutionContext,
) {
  /**
   * Open a cache instance in the worker and a custom session instance.
   */
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);


  // 1. Configure the Sanity Loader and preview mode
  const sanity = createSanityContext({
    request,

    cache,
    waitUntil,

    // Required:
    // Pass configuration options for Sanity client or an instantialized client
    client: {
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      apiVersion: env.SANITY_API_VERSION || '2023-03-30',
      useCdn: process.env.NODE_ENV === 'production',
    },
  })


  const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache,
    waitUntil,
    session,
    i18n: { language: 'EN', country: 'US' },
  });

  return {
    ...hydrogenContext,
    // declare additional Remix loader context
    sanity,
  };
}
