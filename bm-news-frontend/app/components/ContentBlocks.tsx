import { PortableText } from "@portabletext/react";
import TweetEmbedPreview from "./TweetEmbed";

/**
 * This object configures how we render custom Portable Text content blocks in our app.
 * We can either modify/override existing blocks or add new content types here (such as
 * "events" as a top-level citizen)
 */
const myPortableTextComponents = {
  types: {
    // TODO: actually handle images well, with alttext etc and different sizings
    image: ({ value }) => (value?.asset && <img src={`${value.asset.url}?fit=clip&w=700&q=90`} />),
    tweetEmbed: ({ value }) => {
      return (
        <TweetEmbedPreview tweetUrl={value.url} />
      );
    }
  },
}

export const ContentBlocks = (props) => {
  return <PortableText value={props.value} components={myPortableTextComponents} />
}
