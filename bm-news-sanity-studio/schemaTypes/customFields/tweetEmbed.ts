import { defineType } from "sanity";
import TweetEmbedPreview from "../../components/TweetEmbed";

/**
 * Type representing a twitter embed. Allows editors to add a tweet link
 * to a post's content and have it render as an embedded tweet.
 */
export const tweetEmbedType = defineType({
  name: 'tweetEmbed',
  title: 'Embed Tweet',
  type: 'object',
  // customize the preview renderer prepartion
  preview: {
    // select the 'url' field from tweetEmbed
    // and pass it as the 'tweetUrl' prop to the preview component
    select: {
      tweetUrl: 'url'
    },
  },
  components: {
    // use cutom preview component which can consume tweetUrl
    preview: TweetEmbedPreview,
  },
  fields: [{
    // for now, all tweets are rendered as full width blocks. If we want to customize any options in the future,
    // we can add more fields to this object based on: https://developer.x.com/en/docs/x-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference
    name: 'url',
    title: 'Tweet URL',
    type: 'url',
    validation: rule => [
      rule.required().regex(/https:\/\/x.com\/[^/]+\/status\/\d+/).error('Valid tweet urls look like https://x.com/<author>/status/<tweet-id>.'),
    ]
  }]
})


