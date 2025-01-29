import type { EntryContext, AppLoadContext } from '@shopify/remix-oxygen';
import { RemixServer } from '@remix-run/react';
import isbot from 'isbot';
import { renderToReadableStream } from 'react-dom/server';
import { createContentSecurityPolicy } from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  // TODO: before production, remove font awesome/typekit CSP and figure out hosting
  const { nonce, header, NonceProvider } = createContentSecurityPolicy({
    defaultSrc: [
      "'self'",
      'https://ka-f.fontawesome.com',
      'https://cdn.shopify.com',
    ],
    styleSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://p.typekit.net',
      'https://use.typekit.net',
      'https://ka-f.fontawesome.com',
    ],
    scriptSrc: [
      "'unsafe-eval'",
      "'self'",
      'https://kit.fontawesome.com'
    ],
    scriptSrcElem: [
      "'self'",
      'https://kit.fontawesome.com'
    ],
    fontSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://p.typekit.net',
      'https://use.typekit.net',
      'https://ka-f.fontawesome.com',
    ],
    connectSrc: [
      "'self'",
      'https://ka-f.fontawesome.com',
      'https://monorail-edge.shopifysvc.com',
      'https://bm-news.myshopify.com',
      'http://localhost:*',
      'ws://localhost:*',
      'ws://127.0.0.1:*',
      'ws://*.tryhydrogen.dev:*”'

    ],
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
