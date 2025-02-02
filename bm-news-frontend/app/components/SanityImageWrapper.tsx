import { SanityImage } from "sanity-image";

/**
 * Wrapper around the SanityImage component.
 * Pulls from `image` field to fields expected by SanityImage. All queries for images
 * should look like: { imageField->{asset->{_id, metadata}, hotsport, crop, alt } }
 * (alt is a custom field on images)
 */
export default function SanityImageWrapper({ image, sanityProjectId, sanityDataset, ...rest }) {
  return (
    <SanityImage
      id={image.asset._id}
      projectId={sanityProjectId}
      dataset={sanityDataset}
      mode="cover"
      hotspot={image.hotspot}
      crop={image.crop}
      preview={image.asset?.metadata.lqip}
      queryParams={{ q: 90 }}
      alt={image.alt}
      {...rest}
    />
  )
}
