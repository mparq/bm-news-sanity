import React, { useEffect, useRef } from "react";
import { PreviewProps } from "sanity";

declare global {
  interface Window {
    twttr: any;
  }
}

// HACK: loading twitter widgets script via a bit of a hack. I guess it's okay for now.
// https://developer.x.com/en/docs/x-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference
window.twttr = window.twttr || {};

interface TweetEmbedProps extends PreviewProps {
  tweetUrl?: string;
}

export default function TweetEmbedPreview(props: TweetEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);

  const title = props.tweetUrl;
  const tweetIdMatch = props.tweetUrl && props.tweetUrl.match(/^https:\/\/x.com\/[^/]+\/status\/(\d+)/)
  const tweetId = tweetIdMatch && tweetIdMatch[1];
  useEffect(() => {
    if (tweetId && ref.current) {
      loadTwitterJs(() => {
        window.twttr.widgets.createTweet(
          tweetId,
          ref.current,
          {}
        )
      });
    }
  }, [tweetId, ref])


  return (

    <div ref={ref} id="tweet-container">
      {props.renderDefault({
        ...props,
        title: title
      })}
    </div>
  );
}

// load the twitter widgets script https://developer.x.com/en/docs/x-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference
// NOTE: it would be nicer to just include this script somewhere, but I can't figure out where to add in sanity studio atm
// calling the oEmbed API would be nice too but because of CORS issues, it must be called from a backend and sanity studio works as a SPA in browser
function loadTwitterJs(callback?: () => void) {
  const existing = document.getElementById('twitter-wjs');
  if (existing) {
    window.twttr.ready(callback);
  }
  console.log('creating twitter');
  const s = document.createElement('script');
  s.src = 'https://platform.twitter.com/widgets.js';
  s.id = 'twitter-wjs';
  window.twttr._e = [];
  window.twttr.ready = function(f: () => void) {
    window.twttr._e.push(f);
  }
  window.twttr.ready(callback);
  document.body.appendChild(s);
  s.onload = () => {
    console.log('twttr loaded onload');
    console.log(window.twttr);
  }
}

