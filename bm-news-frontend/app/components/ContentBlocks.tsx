import { PortableText } from "@portabletext/react";
import TweetEmbedPreview from "./TweetEmbed";
import ContentImage from "./ContentImage";

export function buildPortableTextComponents(sanityProjectId: string, sanityDataset: string) {
  return ({
    types: {
      contentImage: ({ value }) => (value?.asset && (
        <ContentImage image={value} sanityDataset={sanityDataset} sanityProjectId={sanityProjectId} />
      )),
      tweetEmbed: ({ value }) => {
        return (
          <TweetEmbedPreview tweetUrl={value.url} />
        );
      }
    },
  });
}

/**
 * Thin wrapper over PortableText. Maybe we don't need it
 * The important part is building the components structure foro customizing how to display blocks.
 */
export const ContentBlocks = (props) => {
  return <PortableText value={props.value} components={props.components} />
}
