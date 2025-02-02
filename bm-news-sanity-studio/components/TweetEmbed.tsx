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


/**
 * TweetEmbedPreview is used in the Block editor to display content
 * for objects of type "tweetEmbed". It injects the twitter widgets.js
 * script to hydrate a div using the tweetId of the associated tweet url
 */
export default function TweetEmbedPreview(props: TweetEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);

  const title = props.tweetUrl;
  const tweetIdMatch = props.tweetUrl && props.tweetUrl.match(/^https:\/\/x.com\/[^/]+\/status\/(\d+)/)
  const tweetId = tweetIdMatch && tweetIdMatch[1];
  useEffect(() => {
    if (tweetId && ref.current) {
      let canceled = false;
      loadTwitterJs(() => {
        if (!canceled) {
          console.debug('twttr loaded. calling createTweet')
          window.twttr.widgets.createTweet(
            tweetId,
            ref.current,
            {}
          )
        } else {
          console.debug('twttr.widgets.createTweet called after render cycle refresh')
        }
      });
      return () => {
        canceled = true;
      }
    }
  }, [tweetId, ref.current])


  return (

    <div ref={ref} id="tweet-container">
      {props.renderDefault({
        ...props,
        title: title
      })}
    </div>
  );
}

let listeners: Array<() => void> = [];
let twttrLoaded = false;
// load the twitter widgets script https://developer.x.com/en/docs/x-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference
// NOTE: it would be nicer to just include this script somewhere, but I can't figure out where to add in sanity studio atm
// calling the oEmbed API would be nice too but because of CORS issues, it must be called from a backend and sanity studio works as a SPA in browser
function loadTwitterJs(callback: () => void) {
  const existing = document.getElementById('twitter-wjs');
  if (existing) {
    if (!twttrLoaded) {
      console.debug('load twttr called before twttrLoaded')
      listeners.push(callback);
    } else {
      console.debug('load twttr called after twttrLoaded')
      callback();
    }
    return;
  }
  console.debug('loading twitter script');
  const s = document.createElement('script');
  s.src = 'https://platform.twitter.com/widgets.js';
  s.id = 'twitter-wjs';
  document.body.appendChild(s);
  listeners.push(callback);
  s.onload = () => {
    console.debug('twttr loaded onload');
    window.twttr.ready(() => {
      console.debug('twttr.ready. firing listeners');
      twttrLoaded = true;
      listeners.forEach((cb) => {
        cb();
      });
      listeners = [];
    })
  }
}

