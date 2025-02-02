import { authorType } from "./documents/authorType";
import { categoryType } from "./documents/categoryType";
import { blockContentType } from "./customFields/blockContent";
import { tweetEmbedType } from "./customFields/tweetEmbed";
import { frontPageLayoutType } from "./documents/frontPageLayoutType";
import { liveBlogContentType } from "./documents/liveBlogContentType";
import { liveBlogType } from "./documents/liveBlogType";
import { newsStoryType } from "./documents/newsStoryType";
import { contentImageType } from "./customFields/contentImage";

export const schemaTypes = [
  frontPageLayoutType,
  authorType,
  newsStoryType,
  categoryType,
  liveBlogType,
  liveBlogContentType,
  blockContentType,
  tweetEmbedType,
  contentImageType
]
